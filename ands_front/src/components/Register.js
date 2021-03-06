import {
    colors,
    CssBaseline,
    ThemeProvider,
    Typography,
    Container,
    makeStyles,
    createMuiTheme,
    Box,
    SvgIcon,
    Link,
    Icon,
    TextField,
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    Paper
} from '@material-ui/core';

import Authcontrol from '../Authcontrol';
import be_conf from '../be_config';
import axios from 'axios';
import $ from 'jquery';

$(document).ready(function () {
    $('#regForm').on('submit', function (e) {
        e.preventDefault();


    });
});

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: colors.red.A400,
        },
        background: {
            default: '#fff',
        },
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    MuiTypography: {

        variantMapping: {
            h1: 'h2',
            h2: 'h2',
            h3: 'h2',
            h4: 'h2',
            h5: 'h2',
            h6: 'h2',
            subtitle1: 'h2',
            subtitle2: 'h2',
            body1: 'span',
            body2: 'span',
        },
    }
});

function LightBulbIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
        </SvgIcon>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(6, 0, 3),
    },
    lightBulb: {
        verticalAlign: 'middle',
        marginRight: theme.spacing(1),
    },
}));

function Login() {
    const classes = useStyles();
    return (
        <Typography className={classes.root} color="textPrimary" align="center" variant="h5">
            Регистрация
        </Typography>
    );
}
function Import() {
    const classes = useStyles();
    return (
        <Typography className={classes.root} color="textPrimary" align="center" variant="h5">
            Загрузка статусов оплат из Excel
        </Typography>
    );
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



function getPayments() {
    var parcel = {};
    parcel.ds = document.getElementById("date_start").value;
    parcel.de = document.getElementById("date_end").value;
    parcel.oo = document.getElementById("onlyOpen").checked;


    alert(JSON.stringify(parcel));
}

function loadFile(e) {
    var filename = e.target.files[0].name;
    alert(filename);
}
function SignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var repassword = document.getElementById('repassword').value;
    var name = document.getElementById('name').value;

    if (email == '' || password == '' || repassword == '' || name == '') {
        alert("Укажите все поля!");

    }
    else if (password !== repassword) {
        alert("Пароли не совпадают!");
    }
    else {

        axios.post(be_conf.server + '/signup', {
            name: name,
            email: email,
            password: password,

        }, { headers: {} })
            .then(function (response) {

                alert("Пользователь успешно зарегистрирован!");
                window.location = '/login';

            })
            .catch(function (error) {
                // handle error
                if (error.message.indexOf('400') > 0) {
                    alert("Пользователь с таким email уже существует");

                }
                else {
                    alert(error);
                }
                // alert(typeof error.message);
            })
    }
}
export default function Register() {
    const classes = useStyles();
    return (
        <Container maxWidth="sm"

        >
            <Grid

                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}

            >
                <Paper style={{ backgroundColor: "#F8F8F8", paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }} >
                    <Login />
                    <form className={classes.container} noValidate id='regForm' onSubmit={SignUp}>
                        <TextField
                            required
                            size="small"
                            fullWidth
                            id="name"
                            label="Имя"
                            type="textField"
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
                            id="email"
                            label="E-mail"
                            type="textField"
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
                            required
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
                        <Grid container justify="space-around">
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Отправить
                                    </Button>
                        </Grid>


                    </form>



                </Paper>
                <p>Сделка будет  @DatamixStudio</p>
            </Grid>
        </Container>
    );
}