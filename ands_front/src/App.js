import {
  colors,

  Typography,

  makeStyles,
  createMuiTheme,

  Link,

  Icon,
  Button,

  Paper,

  IconButton,
  Menu,
  MenuItem,


} from '@material-ui/core';

import
MenuIcon
  from '@material-ui/icons/Menu';

import FingerprintIcon from '@material-ui/icons/Fingerprint';


import {

  useState, useEffect
} from 'react';

import ReactDom from 'react-dom';

import Authcontrol from './Authcontrol';
import be_conf from './be_config';
import axios from 'axios';
import $ from 'jquery';
import { Router, Route, Switch, Redirect } from "react-router-dom";


import SideMenu from './components/SideMenu';
import Profile from './components/Profile';
import OrderList from './components/OrderList';
import Account from './components/Account';


const Main = () => (
  <main>
    <Switch>
      <Route  path='/profile' component={Profile} />
      <Route  path='/orderlist' component={OrderList} />
      <Route  path='/account' component={Account} />

    </Switch>
  </main>
);



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
  },



});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.datamixstudio.com/">
        Datamix Studio
          </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



// function getPayments() {
//   var parcel = {};
//   parcel.ds = document.getElementById("date_start").value;
//   parcel.de = document.getElementById("date_end").value;
//   parcel.oo = document.getElementById("onlyOpen").checked;


//   alert(JSON.stringify(parcel));
// }

// function loadFile(e) {
//     var filename = e.target.files[0].name;
//     alert(filename);
// }
// function Recovery() {

//     var email = document.getElementById('email').value;


//     if (email == '') {
//         alert("Укажите все поля!");

//     }

//     else {

//         axios.post('/recovery', {

//             email: email,


//         }, { headers: {} })
//             .then(function (response) {

//                 alert("Ваш новый пароль выслан на указанный электронный ящик!");
//                 window.location = '/login.html';

//             })
//             .catch(function (error) {
//                 // handle error
//                 if (error.message.indexOf('400') > 0) {
//                     alert("Ошибка");

//                 }
//                 else {
//                     alert(error);
//                 }
//                 // alert(typeof error.message);
//             })
//     }
// }

export default function App() {
  // alert("App render");
  const useStyles = makeStyles(theme => ({
    root: {
      margin: theme.spacing(6, 0, 3),
    },
    lightBulb: {
      verticalAlign: 'middle',
      marginRight: theme.spacing(1),
    },
    wrap: {
      backgroundColor: '#F8F8F8',
      height: '100%'
    },
    paper: {
      padding: 30,
      width: '100%'
    },
    contentWrap: {
      width: '100%',
      display: 'flex',
      padding: 20,
      flexGrow: 1

    }





  }));
  const classes = useStyles();
  const [userData, setUserData] = useState({ name: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMenu, setShowMenu] = useState(true);
  const handleShowMenu = () => {

    setShowMenu(!showMenu);
  }

  //////////////////////pages////////////////////////
  const [profilePage, setProfilePage] = useState(false);
  const [orderListPage, setListOrderPage] = useState(true);
  const [orderPage, setOrderPage] = useState(false);
  const [accountPage, setAccountPage] = useState(false);
  const [paymentPage, setPaymentPage] = useState(false);
  const [newOrderPage, setNewOrderPage] = useState(false);

  const hideAllPage = () => {
    setProfilePage(false);
    setListOrderPage(false);
    setOrderPage(false);
    setAccountPage(false);
    setPaymentPage(false);
    setNewOrderPage(false);
  }

  ///////////////////////////////////////////////////

  const handleOrderList = () => {

    hideAllPage();
    setListOrderPage(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
    hideAllPage();
    setProfilePage(true);
  };
  const handleCloseAccount = () => {
    setAnchorEl(null);
    hideAllPage();
    setAccountPage(true);
  };
  const handleCloseLogout = () => {

    setAnchorEl(null);
    Authcontrol.deauthenticateUser();
    window.location = '/login';
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getUserData();
    // Bind the event listener
    // document.addEventListener("click", handleClickOutside);
  }, []);
  function getUserData() {

    axios.get(be_conf.server + '/userinfo', { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
      .then(function (response) {

        setUserData(response.data.data);



      })
      .catch(function (error) {


        // handle error
        if (error.message.indexOf('401') > 0) {

          window.location = '/login.html';
        }
        else {
          alert(error);//no


        }
        // alert(typeof error.message);
      })
  }


  //////////////////catch account button click in external component///////////////

  // function handleClickOutside(e) {


  //   if (e.target.parentNode.id === 'acc_btn' || e.target.parentNode.id === 'menu_account') {
  //     handleCloseAccount();

  //   }
  //   if (e.target.parentNode.id === 'menu_profile') {
  //     handleCloseProfile();

  //   }
  //   if (e.target.parentNode.id === 'menu_exit') {
  //     handleCloseLogout();

  //   }

  //   if (e.target.parentNode.id === 'menu_orderlist') {
  //     handleOrderList();

  //   }
  //   if (e.target.parentNode.id === 'createOrder_btn') {
  //     // alert('createOrder_btn');



  //   }

  //   if ($('.MuiTabs-indicator').width() === 0) {
  //     let w = $('.MuiTabs-indicator').prev().children().outerWidth();

  //     $('.MuiTabs-indicator').width(w);
  //   }
  // }



  ////////////////////////////////////////////////////////////



  return (

    <div className={classes.wrap}>
      <div id="vertical_wrap">
        <div id='header'>
          <div id='leftside'>
            <div>
              <IconButton onClick={handleShowMenu}>
                {/* <Icon>menu</Icon> */}
                <MenuIcon />
              </IconButton>
            </div>
            <div>
              <b><font size="5" face="Roboto">Datamix </font></b>
              <font size="5" face="Roboto">Сделка будет</font>
            </div>

          </div>
          <div id='rightside'>

            <FingerprintIcon />
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              {userData.name}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleCloseProfile}>Профиль</MenuItem>
              <MenuItem onClick={handleCloseAccount}>Мой счет</MenuItem>
              <MenuItem onClick={handleCloseLogout}>Выйти</MenuItem>
            </Menu>

          </div>

        </div>
        <div id="horizontal_wrap">
          <div id="sideMenu" hidden={!showMenu}><SideMenu /></div>
          <div className={classes.contentWrap}>
            <Paper className={classes.paper} >

              <Main />



            </Paper>
          </div>
        </div>
        <div id="footer"  ><Copyright /></div>
      </div>






    </div >


  );
}





