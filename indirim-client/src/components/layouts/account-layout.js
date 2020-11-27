import React, {useState} from "react";
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import {SidebarItemProvider} from "../contexts";
import Sidebar from "../sidebar";
import Header from "../header";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const AccountLayout = ({context}) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  
  return(
    <div className={classes.root}>
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SidebarItemProvider value={context}>
        <Sidebar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
      </SidebarItemProvider>
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
