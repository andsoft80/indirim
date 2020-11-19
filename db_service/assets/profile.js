
const useStyles = makeStyles({
    rootForm: {


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
    return (

        <div>
            <Container maxWidth="sm">
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


                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Container>
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