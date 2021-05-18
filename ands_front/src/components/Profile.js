import {

    Typography,

    makeStyles,

    TextField,

    Button,

    Card,
    CardActions,
    CardContent


} from '@material-ui/core';
import {

    useState, useEffect
  } from 'react';

import Authcontrol from '../Authcontrol';
import be_conf from '../be_config';
import axios from 'axios';
import $ from 'jquery';
import History from '../historyImp';
export default function Profile() {
    const viewAccount = function () {
        //props.history.push("/orderlist");
        History.push("/account");


    };

    const useStyles = makeStyles({
        rootForm: {
            maxWidth: 300

        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });
    const classes = useStyles();

    const [userData, setUserData] = useState({ name: '' });
    useEffect(() => {

        getUserData();
    }, []);
    function getUserData() {

        axios.get(be_conf.server + '/userdbinfo', { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
            .then(function (response) {
                // if(response.data==='need_auth'){
                //     window.location = '/login.html';
                //     return;
                // }
                setUserData(response.data);
                setHaveCompany(response.data.companyid !== null);
                getCompanyById(response.data.companyid);



            })
            .catch(function (error) {
                // handle error

                if (error.message.indexOf('401') > 0) {

                    window.location = '/login';
                }
                else {
                    alert(error);


                }
                // alert(typeof error.message);
            })
    }

    function ChPass() {

        var password = document.getElementById('password').value;
        var repassword = document.getElementById('repassword').value;


        if (password == '' || repassword == '') {
            alert("Укажите все поля!");

        }
        else if (password !== repassword) {
            alert("Пароли не совпадают!");
        }
        else {

            axios.post(be_conf.server + '/reset', {
                userid: userData.id,
                password: password

            }, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                .then(function (response) {

                    alert("Пароль изменен!");
                    document.getElementById('password').value = '';
                    document.getElementById('repassword').value = '';


                })
                .catch(function (error) {
                    // handle error
                    if (error.message.indexOf('404') > 0) {
                        alert("Пользователь не найден!");

                    }
                    else {
                        alert(error);
                    }
                    // alert(typeof error.message);
                })
        }
    }

    function newCompany() {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const [open, setOpen] = useState(false);

    const [haveCompany, setHaveCompany] = useState(userData.companyid !== null);
    const [companyData, setCompanyData] = useState({ name: '' });

    const getCompanyById = (id) => {
        axios.post(be_conf.server + '/table/companies/action/get', {
            id: id,


        }, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
            .then(function (response) {

                if (response.data[0])
                    setCompanyData(response.data[0]);


            })
            .catch(function (error) {
                // handle error

                if (error.message.indexOf('401') > 0) {

                    window.location = '/login.html';
                }
                else {
                    alert(error);


                }
                // alert(typeof error.message);
            })
    }



    const handleAddCompany = () => {

        var name = document.getElementById('company').value;
        var inn = document.getElementById('inn').value;
        var kpp = document.getElementById('kpp').value;

        var address = document.getElementById('address').value;
        var site = document.getElementById('site').value;


        if (name == '' || inn == '') {
            alert("Название и ИНН - обязательные поля");

        }

        else {

            axios.post(be_conf.server + '/addcompany', {
                name: name,
                inn: inn,
                kpp: kpp,
                address: address,
                site: site

            }, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                .then(function (response) {

                    alert("Компания добавлена!");
                    setOpen(false);
                    document.getElementById('company').value = '';
                    document.getElementById('inn').value = '';
                    document.getElementById('kpp').value = '';
                    document.getElementById('address').value = '';
                    document.getElementById('site').value = '';
                    // alert(JSON.stringify(response));
                    var companyid = response.data.insertId;


                    axios.post(be_conf.server + '/table/users/action/put', {
                        id: userData.id,
                        companyid: companyid


                    }, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                        .then(function (response) {


                            setHaveCompany(true);
                            getCompanyById(companyid);




                        })
                        .catch(function (error) {
                            // handle error
                            if (error.message.indexOf('400') > 0) {
                                alert("Не удалось обработать запрос");

                            }
                            else {
                                alert(error);
                            }
                            // alert(typeof error.message);
                        })



                })
                .catch(function (error) {
                    // handle error
                    if (error.message.indexOf('400') > 0) {
                        alert("Компания уже существует! Привяжитесь через прорфиль компании...");

                    }
                    else {
                        alert(error);
                    }
                    // alert(typeof error.message);
                })
        }

    }

    return (

        <div>

            <font size="5" >Профиль</font>
            <br /><br />
            <font size="4" >{userData.name}</font>
            <br />
            <font size="2" >{userData.email}</font>
            <br /><br />
            <Card className={classes.rootForm} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Смена пароля
                        </Typography>
                    <form className={classes.container} noValidate id='chForm' onSubmit={ChPass}>
                        <TextField
                            size="small"
                            fullWidth
                            id="password"
                            label="Пароль"
                            type="password"
                            //defaultValue="1980-11-21"
                            className={classes.textField}
                            // InputLabelProps={{
                            //     shrink: true,
                            // }}
                            variant="outlined"
                        />
                        <br /><br />
                        <TextField
                            size="small"
                            fullWidth
                            id="repassword"
                            label="Пароль повторно"
                            type="password"
                            //defaultValue="1980-11-21"
                            className={classes.textField}
                            // InputLabelProps={{
                            //     shrink: true,
                            // }}
                            variant="outlined"
                        />
                        <br /><br />
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Сменить пароль
                        </Button>
                    </form>


                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
            <br /><br />


            <div id='currCompany' hidden={!haveCompany}>
                <font size="4">Вы привязаны к компании : </font>
                <br /><br />
                <b><font size="5">{companyData.name}</font></b>
                <br />
                <Button id="acc_btn" color="primary" variant="outlined" onClick = {viewAccount} >
                    Управлять счетом
                </Button>

            </div>



        </div>


    );

}

