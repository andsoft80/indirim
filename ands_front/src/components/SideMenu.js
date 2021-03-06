import {

    makeStyles,

    Icon,

    List, ListItem, ListItemIcon, ListItemText, Divider


} from '@material-ui/core';



import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GavelIcon from '@material-ui/icons/Gavel';
import FaceIcon from '@material-ui/icons/Face';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Router, Route, Switch, Redirect, useHistory, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import History from '../historyImp';
import Authcontrol from '../Authcontrol';
import { red } from '@material-ui/core/colors';
import '../index.css';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        marginLeft: 10
    },




}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function SideMenu() {

    const classes = useStyles();
    // const history = useHistory();
    // const hist = createBrowserHistory({forceRefresh:true});
    const viewOrderList = function () {
        //props.history.push("/orderlist");
        History.push("/orderlist");


    };

    const viewProfile = function () {
        //props.history.push("/orderlist");
        History.push("/profile");


    };

    const viewAccount = function () {
        //props.history.push("/orderlist");
        History.push("/account");


    };
    const Logout = () => {


        Authcontrol.deauthenticateUser();
        window.location = '/login';
    };
    return (
        <div id="content_wrap">

            <div style={{ height: '100%', width: '100%' }}>
                {/* <Paper style={{ height: '100%' }}> */}
                <List component="nav" aria-label="main mailbox folders" >

                    <ListItem button id="menu_orderlist" onClick={viewOrderList}  >
                        <ListItemIcon id="menu_orderlist" >
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Заказы" id="menu_orderlist" />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <GavelIcon />
                        </ListItemIcon>
                        <ListItemText primary="Предложения" />
                    </ListItem>
                </List>
                <Divider />
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button id="menu_profile" onClick={viewProfile}>
                        <ListItemIcon id="menu_profile">
                            <FaceIcon />
                        </ListItemIcon>
                        <ListItemText primary="Профиль" id="menu_profile" />
                    </ListItem>
                    <ListItem button id="menu_account" onClick={viewAccount}>
                        <ListItemIcon id="menu_account">
                            <AccountBalanceWalletIcon />
                        </ListItemIcon>
                        <ListItemText primary="Мой счет" id="menu_account" />
                    </ListItem>
                    <ListItem button id="menu_exit" onClick={Logout}>
                        <ListItemIcon id="menu_exit">
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Выйти" id="menu_exit" />
                    </ListItem>
                </List>
                {/* </Paper> */}
            </div>
        </div>

    );

}

