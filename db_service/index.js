var express = require('express');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const nodemailer = require("nodemailer");


var app = express();
var cors = require('cors');
app.use(cors());
app.options('*', cors());
var port = process.env.PORT || 8080;
var mysql = require('mysql');
var config = require('./db_config');
var jwt = require('express-jwt');
var jwt_sign = require('jsonwebtoken');
app.use(express.static('assets'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options('*', cors());




//var con = mysql.createConnection(config);
// con.connect(function (err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }

//     console.log('connected as id ' + con.threadId);
// });
con = mysql.createPool(config);

app.listen(port);
console.log('The magic happens on port ' + port);

async function getTokenFromHeader(req) {
    
    var token = '';
    
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
         
    }
    let promise = new Promise((resolve, reject) => {
        jwt_sign.verify(token, 'secret', function (err, decoded) {
            

            resolve(decoded);


        });

    });

    return await promise;

}

function check(req, res, next) {

    if (req.url === '/signin' || req.url === '/signup' || req.url === '/recovery') {
        next();
    }
    else {

        getTokenFromHeader(req).then((value) => {
            var now = Math.floor(Date.now() / 1000);
            // console.log(Math.floor(Date.now() / 1000));
            // console.log(value);
            if (value === undefined || value.exp < now) {
                res.end("need_auth");
            }
            else {
                next();
            }
        });
    }
}

app.post('*', function (req, res, next) {
    // console.log(req.url);
    check(req, res, next);
})

app.get('/', function (req, res) {

    res.sendFile('index.html');
})

app.post('/departments', function (req, res) {
    var clientid = req.body.clientid;


    var sqlStr = "select department from users where clientid = '" + clientid + "' group by department"
    con.query(sqlStr, function (err, result) {
        if (err)
            res.end(JSON.stringify(err));
        res.end(JSON.stringify(result));

    });
});


app.post('/signin', function (req, res) {


    var email = req.body.login;
    var password = req.body.password;
    console.log(JSON.stringify(req.body));
    var sqlStr = '';

    if (email && password) {
        sqlStr = "select * from users where email = '" + email + "'";



        con.query(sqlStr, function (err, result) {

            // console.log(JSON.stringify(result[0]));

            if (err) {
                res.end(JSON.stringify(err));
            }
            else if (result.length === 0 || !bcrypt.compareSync(password, result[0].password)) {
                res.statusCode = 404;
                res.end();
            }
            else {

                const data = {
                    id: result[0].id,

                    name: result[0].name,
                    email: result[0].email,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                    companyid: result[0].companyid,



                };
                const signature = 'secret';
                const expiration = '6h';

                res.send(jwt_sign.sign({ data, }, signature, { expiresIn: expiration }));




            }

        });

    }
    else {
        res.end("Need login and password!");
    }


});




/////////////universal api//////////////////////////////////
function api_impl(req, res) {
    var tableName = req.params.tableName;
    var action = req.params.action;
    // var clientid = req.body.clientid;
    var idName = 'id';
    var sqlStr = '';
    var id = '';

    if (action === 'post') {
        sqlStr = "INSERT INTO " + tableName + " (";
        for (var i = 0; i < Object.keys(req.body).length; i++) {
            sqlStr = sqlStr + Object.keys(req.body)[i] + ",";
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
        sqlStr = sqlStr + ") VALUES (";
        for (i = 0; i < Object.keys(req.body).length; i++) {
            sqlStr = sqlStr + "'" + req.body[Object.keys(req.body)[i]] + "',";
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
        sqlStr = sqlStr + ")";

        con.query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });
    }
    if (action === 'put') {
        id = req.body[idName];
        sqlStr = "update " + tableName + " set ";
        for (i = 0; i < Object.keys(req.body).length; i++) {
            if (Object.keys(req.body)[i] === idName) {
                continue;
            }
            sqlStr = sqlStr + Object.keys(req.body)[i] + "='" + req.body[Object.keys(req.body)[i]] + "',"
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
        sqlStr = sqlStr + " where " + idName + " = " + id;

        con.query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });
    }

    if (action === 'delete') {
        id = req.body[idName];
        sqlStr = "delete from " + tableName + " where " + idName + " = " + id;

        con.query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });


    }
    if (action === 'get') {
        id = req.body[idName];
        var clientid = req.body.clientid;
        // console.log(id);


        if (id) {
            sqlStr = "select * from " + tableName + " where " + idName + " = " + id;
        }

        else {
            sqlStr = "select * from " + tableName;
        }


        con.query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });


    }
}

app.post('/table/:tableName/action/:action', function (req, res) {

    api_impl(req, res);

});





//////////////////////////////////////////////




app.get('/userinfo', function (req, res) {
    


    getTokenFromHeader(req).then(function (response) {
        



        res.end(JSON.stringify(response));
    });




});

app.get('/userdbinfo', function (req, res) {



    getTokenFromHeader(req).then(function (response) {
        
        let id = response.data.id;
        sqlStr = "select * from users where id = '" + id + "'";
        con.query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
                // console.log(result[0]);     
            res.end(JSON.stringify(result[0]));

        });



        // res.end(JSON.stringify(response));
    });




});

app.post('/checkauth', function (req, res) {

    res.end("checked");


});

app.post('/signup', function (req, res) {
    console.log('reg req...');
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;

    var firstName = '';
    if (req.body.firstName)
        firstName = req.body.firstName;

    var lastName = '';
    if (req.body.lastName)
        lastName = req.body.lastName;


    sqlStr = "select * from users where email = '" + email + "'";
    con.query(sqlStr, function (err, result) {
        if (err) {
            res.end(JSON.stringify(err));
        }
        else if (result.length > 0) {
            res.statusCode = 400;
            res.end();


        }
        else {
            sqlStr = "insert into users (email, password, name, firstName, lastName) values('" + email + "','" + bcrypt.hashSync(password, salt) + "','" + name + "','" + firstName + "','" + lastName + "')";
            con.query(sqlStr, function (err, result) {
                if (err)
                    res.end(JSON.stringify(err));
                res.end(JSON.stringify(result));

            });

        }


    });





});

function generate(len) {
    var ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var out = '';
    for (var i = 0; i < len; i++) {
        var ch = Math.random(1, 2);
        if (ch < 0.5) {
            var ch2 = Math.ceil(Math.random(1, ints.length - 1) * 10);
            out += ints[ch2];
        } else {
            var ch2 = Math.ceil(Math.random(1, chars.length - 1) * 10);
            out += chars[ch2];
        }
    }
    return out;
}

app.post('/recovery', function (req, res) {
    console.log('reg req...');
    var email = req.body.email;
    sqlStr = "select * from users where email = '" + email + "'";
    con.query(sqlStr, function (err, result) {
        if (err) {
            res.end(JSON.stringify(err));
        }
        else if (result.length == 0) {
            res.statusCode = 400;
            res.end();


        }
        else {
            var password = generate(8);
            console.log(password);
            var hash_pass = bcrypt.hashSync(password, salt);
            console.log(hash_pass);
            sqlStr = "update users set password = '" + hash_pass + "' where email = '" + email + "'";
            con.query(sqlStr, function (err, result) {
                if (err)
                    res.end(JSON.stringify(err));


                res.end(JSON.stringify(result));
                let transporter = nodemailer.createTransport({
                    host: "smtp.yandex.ru",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: 'realestate-rus',
                        pass: 'mpueakcygkrafefw',
                    },
                });
                let info = transporter.sendMail({
                    from: 'Сделка будет <realestate-rus@yandex.ru>', // sender address
                    to: email, // list of receivers
                    subject: "Восстановление пароля на портале Сделка Будет", // Subject line
                    text: "Ваш новый пароль", // plain text body
                    html: "<b>Ваш новый пароль : " + password + "</b>", // html body
                });



            });

        }


    });
});

app.post('/reset', function (req, res) {
    console.log('req cpass...');
    let userid = req.body.userid;
    let password = req.body.password;
    sqlStr = "select * from users where id = '" + userid + "'";
    con.query(sqlStr, function (err, result) {
        if (err) {
            res.end(JSON.stringify(err));
        }
        else if (result.length == 0) {
            res.statusCode = 404;
            res.end();


        }
        else {

            var hash_pass = bcrypt.hashSync(password, salt);
            console.log(hash_pass);

            sqlStr = "update users set password = '" + hash_pass + "' where id = '" + userid + "'";
            con.query(sqlStr, function (err, result) {
                if (err)
                    res.end(JSON.stringify(err));


                res.end(JSON.stringify(result));
                // let transporter = nodemailer.createTransport({
                //     host: "smtp.yandex.ru",
                //     port: 465,
                //     secure: true, // true for 465, false for other ports
                //     auth: {
                //         user: 'realestate-rus',
                //         pass: 'mpueakcygkrafefw',
                //     },
                // });
                // let info = transporter.sendMail({
                //     from: 'Сделка будет <realestate-rus@yandex.ru>', // sender address
                //     to: email, // list of receivers
                //     subject: "Восстановление пароля на портале Сделка Будет", // Subject line
                //     text: "Ваш новый пароль", // plain text body
                //     html: "<b>Ваш новый пароль : "+password+"</b>", // html body
                // });



            });

        }


    });



});

app.post('/addcompany', function (req, res) {
    console.log('req addcompany...');
    let name = req.body.name;
    let inn = req.body.inn;
    let kpp = req.body.kpp;
    let address = req.body.address;
    let site = req.body.site;

    if(kpp){
        sqlStr = "select * from companies where inn = '" + inn + "' and kpp = '"+kpp+"'"; 

    }
    else{
        sqlStr = "select * from companies where inn = '" + inn + "'";
    }


    con.query(sqlStr, function (err, result) {
        if (err) {
            res.end(JSON.stringify(err));
        }
        else if (result.length > 0) {
            res.statusCode = 400;
            res.end();


        }
        else {


            sqlStr = sqlStr = "insert into companies (name, inn, kpp, address, site) values('" + name + "','" + inn + "','" + kpp + "','" + address + "','" + site + "')";
            con.query(sqlStr, function (err, result) {
                
                if (err)
                    res.end(JSON.stringify(err));


                res.end(JSON.stringify(result));

            });

        }


    });


});