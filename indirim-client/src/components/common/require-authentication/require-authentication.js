import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router";

const requireAuthentication = (Component) => {
  
  const AuthenticatedComponent = ({isAuthenticated, location, ...rest}) => {
    
    return(
      <React.Fragment>
		{
		  isAuthenticated === true
		  ? <Component {...rest} />
		  : <Redirect to={{ pathname: '/signIn', state: { from: location } }} />
		}
	  </React.Fragment>
	);
  }
  const mapStateToProps = ({auth: {token, userName, isAuthenticated}}) => ({
	token: token,
	userName: userName,
	isAuthenticated: isAuthenticated
  });
  
  return connect(mapStateToProps)(AuthenticatedComponent);
};

export default requireAuthentication;
