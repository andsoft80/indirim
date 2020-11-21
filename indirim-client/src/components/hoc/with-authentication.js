import React, {Fragment, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {routeToPage} from "../../redux/actions/route-actions";

const withAuthentication = () => (Wrapped) => {
  return () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const dispatch = useDispatch();
 
	useEffect(() => {
	  checkAuth(isAuthenticated);
	});

	const checkAuth = (isAuthenticated) => {
	  if (!isAuthenticated) {
		const route = {
		  method: 'push',
		  nextUrl: '/signIn',
		};
		dispatch(routeToPage(route));
	  }
	};
 
	return (
	  <Fragment>
		{
		  isAuthenticated === true
			? <Wrapped />
			// : <Redirect to={"/signIn"} />
			: null
		}
	  </Fragment>
	);
  };
};

export default withAuthentication;
