
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


function Profile() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [userData, setUserData] = useState({ name: '' });
    React.useEffect(() => {
        getUserData();
    }, []);
    function getUserData() {
        axios.post('/userinfo', {




        }, { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(function (response) {

                setUserData(response.data.data);


            })
            .catch(function (error) {
                // handle error
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

            axios.post('/reset', {
                userid: userData.id,
                password: password

            }, { headers: { "Authorization": 'Bearer ' + getToken() } })
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
    const [open, setOpen] = React.useState(false);
    return (

        <div>

            <font size="5">Профиль</font>
            <br /><br />
            <font size="4">{userData.name}</font>
            <br />
            <font size="2">{userData.email}</font>
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
            <div id='newCompany' hidden={userData.companyid}>
                <font size="4">Хотите стать продавцом?</font>
                <br /><br />
                <Button variant="contained" color="primary" onClick={newCompany}>
                    Добавитьт счет
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
                        Чтобы стать продавцом, вы должны указать интересы какого юридического лица вы представляете
                    </DialogContentText>
                    <form className={classes.form} noValidate>
                        <br />
                        <TextField
                            required 
                            size="small"
                            fullWidth
                            id="companyName"
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


                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Добавить
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>

        </div>


    );

}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Profile />
    </ThemeProvider>,
    document.querySelector('#content_profile'),
);