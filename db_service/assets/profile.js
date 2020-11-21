
const useStyles = makeStyles({
    rootForm: {
        maxWidth: 500

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

            }, { headers: {"Authorization": 'Bearer ' + getToken() } })
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
                        <br/><br/>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Сменить пароль
                        </Button>
                    </form>

                </CardContent>
                <CardActions>

                </CardActions>
            </Card>

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