import React, { useState} from "react";
import { Link as RouterLink } from "react-router-dom";
import HeaderLogo from "./header-logo";
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import {AppBar, Badge, Box, IconButton, Hidden, Toolbar} from "@material-ui/core";
import {fetchSignOut} from "../../store/actions";
import {useDispatch} from "react-redux";
import {withAuthService} from "../hoc";

const Header = ({ authService, onMobileNavOpen }) => {
  const [notifications] = useState([]);
  const dispatch = useDispatch();
  
  const handleSignOut = (e) => {
	e.preventDefault();
	dispatch(fetchSignOut(authService));
  };
  
  return(
    <AppBar>
	  <Toolbar>
		<RouterLink to="/">
		  <HeaderLogo/>
		</RouterLink>
		<Box flexGrow={1} />
		<Hidden mdDown>
		  <IconButton color="inherit">
			<Badge badgeContent={notifications.length} color="primary" variant="dot">
			  <NotificationsIcon />
			</Badge>
		  </IconButton>
		</Hidden>
		<IconButton color="inherit" onClick={handleSignOut}>
		  <ExitToAppOutlinedIcon />
		</IconButton>
		<Hidden lgUp>
		  <IconButton color="inherit" onClick={onMobileNavOpen}>
			<MenuIcon />
		  </IconButton>
		</Hidden>
	  </Toolbar>
	</AppBar>
  );
};

export default withAuthService()(Header);
