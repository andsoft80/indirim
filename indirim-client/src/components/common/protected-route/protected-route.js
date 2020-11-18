import React from "react";
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
// import {bindActionCreators, compose} from "redux";
import RouteWithLayout from "../route-with-layout";
// import {withAuthService} from "../../hoc";
import {connect} from "react-redux";

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  console.log("ProtectedRoute: render: isLoggedIn=",isLoggedIn);
  return (
	<Route
	  {...rest}
	  render={props => (
	    isLoggedIn
		  ? <Component {...props} />
		  : <Redirect to={{ pathname: '/signIn', state: { from: props.location } }} />
		  )
	  } />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

const mapStateToProps = ({ auth: { isLoggedIn }}) => {
  console.log("ProtectedRoute: mapStateToProps: isLoggedIn=",isLoggedIn);
  return { isLoggedIn }
};

// const mapDispatchToProps = (dispatch, { authService }) => {
//   return bindActionCreators({}, dispatch);
// };

export default connect(mapStateToProps)(ProtectedRoute);
