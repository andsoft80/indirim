import React from "react";
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import {makeStyles} from "@material-ui/styles";
import Header from "../header";

const useStyles = makeStyles(() => ({
  root: {
    // paddingTop: 64,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

const MinimalLayout = (props) => {
  const { children } = props;
  
  const classes = useStyles();
  
  return(
    <div className={classes.root}>
      <main className={classes.content}>
        {/*{children}*/}
        <Outlet />
      </main>
    </div>
  );
};

MinimalLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default MinimalLayout;
