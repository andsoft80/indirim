function Account() {
    const [userData, setUserData] = useState({ name: '' });
    const [companyData, setCompanyData] = React.useState({ name: '' });
    React.useEffect(() => {
        getUserData();

    }, []);
    React.useEffect(() => {

    }, [Tab]);
    function getUserData() {

        axios.post('/userdbinfo', {




        }, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {

                setUserData(response.data);

                getCompanyById(response.data.companyid);



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

                if (response.data[0])
                    setCompanyData(response.data[0]);


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

    const formSub = (e) => {
        e.preventDefault();

        var name = document.getElementById('companyName').value;
        var inn = document.getElementById('companyINN').value;
        var kpp = document.getElementById('companyKPP').value;


        axios.post('/table/companies/action/put', {
            id: companyData.id,
            name: name,
            inn: inn,
            kpp: kpp


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
                                <div hidden={companyEdit}>
                                    <Button variant="contained" color="primary" type="submit" >
                                        Сохранить
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
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
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