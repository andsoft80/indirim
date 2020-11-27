import React from 'react';
import { Navigate } from 'react-router-dom';
import { MinimalLayout } from "../layouts";
import { PersonalAccount } from "../accounts";
import {RecoveryPasswordPage, ResetPasswordPage, SignInPage, SignUpPage} from "../authentification";
import Welcome from "../welcome";
import ErrorNotFound from "../common/error-not-found";


const routes = (isAuthenticated) => {
  return [
	{
	  path: '/',
	  element: !isAuthenticated ? <MinimalLayout/> : <Navigate to='/account'/>,
	  children: [
		{ path: 'signIn', element: <SignInPage/>},
		{ path: 'signUp', element: <SignUpPage/>},
		{ path: 'recovery', element: <RecoveryPasswordPage/>},
		{
		  path: 'reset/:resetToken',
		  element: (resetToken) => (<ResetPasswordPage resetToken={resetToken}/>)
		},
		{ path: '/', element: <Navigate to='/signIn'/>},
		{ path: '*', element: <ErrorNotFound/> }
	  ]
	},
	{
	  path: '/account',
	  element: isAuthenticated ? <PersonalAccount/> : <Navigate to='/signIn'/>,
	  children: [
		{ path: '/', element: <Navigate to='/account/welcome'/>},
		{ path: 'orders', element: <Navigate to='/account/welcome'/>},
		{ path: 'offers', element: <Navigate to='/account/welcome'/>},
		{ path: 'profile', element: <Navigate to='/account/welcome'/>},
		{ path: 'welcome', element: <Welcome/>},
		{ path: 'settings', element: <Navigate to='/account/welcome'/>},
		{ path: 'dashboard', element: <Navigate to='/account/dashboard'/>},
		{ path: 'subscription', element: <Navigate to='/account/welcome'/>},
		{ path: '*', element: <Navigate to="/404" /> }
	  ]
	},
  ];
}

export default routes;
