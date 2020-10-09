var express = require('express');
var bcrypt = require('bcrypt');
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
        // console.log(token)
    }
    let promise = new Promise((resolve, reject) => {
        jwt_sign.verify(token, 'secret', function (err, decoded) {

            resolve(decoded);


        });

    });

    return await promise;

}

function check(req, res, next) {
    if (req.url === '/signin') {
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

app.all('*', function (req, res, next) {
    // console.log(req.url);
    check(req, res, next);
})

app.post('/departments', function (req, res) {
    var clientid = req.body.clientid;


    var sqlStr = "select department from users where clientid = '"+clientid+"' group by department" 
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
                res.end("fail");
            }
            else {

                const data = {
                    id: result[0].id,
                    
                    name: result[0].name,
                    email: result[0].email



                };
                const signature = 'secret';
                const expiration = '6h';

                res.send(jwt_sign.sign({ data, }, signature, { expiresIn: expiration }));




            }

        });

    }
    else{
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




app.post('/userinfo', function (req, res) {

    getTokenFromHeader(req).then(function (response) {

        res.end(JSON.stringify(response));
    });




});

app.post('/checkauth', function (req, res) {

    res.end("checked");


});