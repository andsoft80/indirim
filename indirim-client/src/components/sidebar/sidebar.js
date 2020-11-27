import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import SidebarContent from "./sidebar-content";

const useStyles = makeStyles(() => ({
  mobileDrawer: {
	width: 256
  },
  desktopDrawer: {
	width: 256,
	top: 64,
	height: 'calc(100% - 64px)'
  },
}));

const Sidebar = ({ onMobileClose, openMobile, items }) => {
  const classes = useStyles();
  
  return(
    <Fragment>
	  <Hidden lgUp>
		<Drawer
		  anchor="left"
		  classes={{ paper: classes.mobileDrawer }}
		  onClose={onMobileClose}
		  open={openMobile}
		  variant="temporary"
		>
		  <SidebarContent items={items}/>
		</Drawer>
	  </Hidden>
	  <Hidden mdDown>
		<Drawer
		  anchor="left"
		  classes={{ paper: classes.desktopDrawer }}
		  open
		  variant="persistent"
		>
		  <SidebarContent/>
		</Drawer>
	  </Hidden>
	</Fragment>
  );
}

Sidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

Sidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default Sidebar;
