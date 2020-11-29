



function Account() {

    // var observer = new MutationObserver(function (mutations) {
    //     console.log(mutations);
    // });
    // var target = document.querySelector('#content_account');
    // observer.observe(target, {
    //     attributes: true

    // });




    function newCompany() {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);

    const [haveCompany, setHaveCompany] = React.useState(false);

    const [userData, setUserData] = useState({ name: '' });
    const [companyData, setCompanyData] = React.useState({ name: '' });
    const [companyUsers, setCompanyUsers] = React.useState([]);


    const getCompanyUsers = (id) => {




        axios.get('/companyusers', { headers: { "Authorization": 'Bearer ' + getToken() }, params: { companyid: id } })
            .then(function (response) {

                setCompanyUsers(response.data);
                // alert(JSON.stringify(response));



            })
            .catch(function (error) {
                // handle error

                if (error.message.indexOf('500') > 0) {
                    alert(error.message);
                }

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

            axios.post('/company', {
                name: name,
                inn: inn,
                kpp: kpp,
                address: address,
                site: site

            }, { headers: { "Authorization": 'Bearer ' + getToken() } })
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


                    axios.post('/table/users/action/put', {
                        id: userData.id,
                        companyid: companyid


                    }, { headers: { "Authorization": 'Bearer ' + getToken() } })
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


    React.useEffect(() => {
        getUserData();


    }, []);

    function getUserData() {

        axios.get('/userdbinfo', { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {

                if (response.data.companyid) {
                    setHaveCompany(true);

                    setUserData(response.data);


                    getCompanyById(response.data.companyid);
                    getCompanyUsers(response.data.companyid);
                }




            })
            .catch(function (error) {
                // handle error
                alert(error);
                if (error.message.indexOf('400') > 0) {
                    window.location = '/login.html';
                }
                else {
                    // alert(error);
                    window.location = '/login.html';
                }
                // alert(typeof error.message);
            })
    }
    const getCompanyById = (id) => {
        axios.post('/table/companies/action/get', {
            id: id,


        }, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {

                if (response.data[0]) {
                    setCompanyData(response.data[0]);

                }


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


    ///////////////////////////////////tabs

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    // TabPanel.propTypes = {
    //     children: PropTypes.node,
    //     index: PropTypes.any.isRequired,
    //     value: PropTypes.any.isRequired,
    // };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        }
    }));
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    ///////////////////////////////////////
    const [companyEdit, setCompanyEdit] = React.useState(true);
    const handleCompanyEdit = () => {
        setCompanyEdit(false);

    }

    const handleCompanyCancelEdit = () => {
        setCompanyEdit(true);

    }

    const formSub = (e) => {
        e.preventDefault();

        var name = document.getElementById('companyName').value;
        var inn = document.getElementById('companyINN').value;
        var kpp = document.getElementById('companyKPP').value;
        var address = document.getElementById('companyAddress').value;
        var site = document.getElementById('companySite').value;


        axios.post('/table/companies/action/put', {
            id: companyData.id,
            name: name,
            inn: inn,
            kpp: kpp,
            address: address,
            site: site


        }, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {


                alert('Данные сохранены!');
                setCompanyEdit(true);
                getCompanyById(companyData.id);




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
    }
    return (




        <div>
            <div id='newCompany' hidden={haveCompany}>
                <font size="4">Хотите стать продавцом?</font>
                <br /><br />
                <Button variant="contained" color="primary" onClick={newCompany}>
                    Добавить счет
                </Button>

            </div>

            <Dialog
                fullWidth={false}
                maxWidth={"sm"}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Добавить счет</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Чтобы стать продавцом и получить счет, вы должны указать интересы какого юридического лица вы представляете
                    </DialogContentText>
                    <form className={classes.form} noValidate>
                        <br />
                        <TextField
                            required
                            size="small"
                            fullWidth
                            id="company"
                            label="Название компании или ИП"

                            //defaultValue="1980-11-21"
                            className={classes.textField}
                            // InputLabelProps={{
                            //     shrink: true,
                            // }}
                            variant="outlined"
                        />
                        <br /><br />
                        <TextField
                            required
                            size="small"
                            fullWidth
                            id="inn"
                            label="ИНН"

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
                            id="kpp"
                            label="КПП"

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
                            id="address"
                            label="Адрес"

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
                            id="site"
                            label="Веб сайт"

                            //defaultValue="1980-11-21"
                            className={classes.textField}
                            // InputLabelProps={{
                            //     shrink: true,
                            // }}
                            variant="outlined"
                        />


                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddCompany} color="primary">
                        Добавить
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>

            <div hidden={!haveCompany}>
                <font size="5">Состояние счета</font>
                <br />
                {companyData.name}
                <br /><br />
                <div className={classes.root}>
                    <Paper position="static" square>

                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary"
                            textColor="primary" >
                            <Tab label="Данные продавца" {...a11yProps(0)} />
                            <Tab label="Менеджеры" {...a11yProps(1)} />
                            <Tab label="Операции по счету" {...a11yProps(2)} />
                        </Tabs>

                    </Paper>
                    <TabPanel value={value} index={0}>
                        <div id="companyWrap" >
                            <div>
                                <form id="companyForm" onSubmit={formSub}>
                                    <TextField
                                        autoFocus
                                        id="companyName"
                                        label="Название компании "
                                        InputProps={{
                                            readOnly: companyEdit,
                                        }}
                                        defaultValue={companyData.name}
                                    />
                                    <br /><br />
                                    <TextField
                                        id="companyINN"
                                        label="ИНН компании "
                                        InputProps={{
                                            readOnly: companyEdit,
                                        }}
                                        defaultValue={companyData.inn}
                                    />
                                    <br /><br />
                                    <TextField
                                        id="companyKPP"
                                        label="КПП компании "
                                        InputProps={{
                                            readOnly: companyEdit,
                                        }}
                                        defaultValue={companyData.kpp}
                                    />

                                    <br /><br />
                                    <TextField
                                        id="companyAddress"
                                        label="Адрес компании"
                                        InputProps={{
                                            readOnly: companyEdit,
                                        }}
                                        defaultValue={companyData.address}
                                        multiline
                                        rows={4}
                                    />

                                    <br /><br />
                                    <TextField
                                        id="companySite"
                                        label="Сайт компании "
                                        InputProps={{
                                            readOnly: companyEdit,
                                        }}
                                        defaultValue={companyData.site}
                                    />

                                    <br /><br />
                                    <div hidden={companyEdit} >
                                        <Button variant="contained" color="primary" type="submit" >
                                            Сохранить
                                        </Button>

                                        <Button color="primary" onClick={handleCompanyCancelEdit} style={{ marginLeft: 20 }}>
                                            Отмена
                                        </Button>
                                    </div>

                                </form>
                            </div>
                            <div>

                                <Fab color="secondary" onClick={handleCompanyEdit}>
                                    <Icon>edit</Icon>
                                </Fab>
                            </div>




                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>

                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                </TabPanel>
                </div>
            </div>
        </div>


    );

}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Account />
    </ThemeProvider>,
    document.querySelector('#content_account'),

);