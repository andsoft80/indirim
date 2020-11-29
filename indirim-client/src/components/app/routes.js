import React from 'react';
import { Navigate } from 'react-router-dom';
import { MinimalLayout } from "../layouts";
import { CompanyAccount, PersonalAccount } from "../accounts";
import {RecoveryPasswordPage, ResetPasswordPage, SignInPage, SignUpPage} from "../authentification";
import ErrorNotFound from "../common/error-not-found";
import UnderConstruction from "../common/under-construction";
import OrderList from "../orders";


const routes = (config) => {
  const {isAuthenticated, isSeller} = config;
  console.log('routes isSeller', isSeller);
  
  return [
	{
	  path: '/',
	  element: !isAuthenticated
		? <MinimalLayout/>
		: !isSeller ? <Navigate to='/account'/> : <Navigate to='/seller'/>,
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
	  element: isAuthenticated && !isSeller ? <PersonalAccount/> : <Navigate to='/signIn'/>,
	  children: [
		{ path: '/', element: <Navigate to='/account/welcome'/>},
		{ path: 'orders', element: <OrderList/>},
		{ path: 'offers', element: <Navigate to='/account/welcome'/>},
		{ path: 'profile', element: <Navigate to='/account/welcome'/>},
		{ path: 'welcome', element: <UnderConstruction/>},
		{ path: 'settings', element: <Navigate to='/account/welcome'/>},
		{ path: 'dashboard', element: <Navigate to='/account/welcome'/>},
		{ path: 'subscription', element: <Navigate to='/account/welcome'/>},
		{ path: 'seller', element: <Navigate to='/account/welcome'/>},
		{ path: '*', element: <Navigate to="/404" /> }
	  ]
	},
	{
	  path: '/seller',
	  element: isAuthenticated && isSeller ? <CompanyAccount/> : <Navigate to='/signIn'/>,
	  children: [
		{ path: '/', element: <Navigate to='/seller/welcome'/>},
		{ path: 'offers', element: <Navigate to='/seller/welcome'/>},
		{ path: 'profile', element: <Navigate to='/seller/welcome'/>},
		{ path: 'welcome', element: <UnderConstruction/>},
		{ path: 'settings', element: <Navigate to='/seller/welcome'/>},
		{ path: 'dashboard', element: <Navigate to='/seller/welcome'/>},
		{ path: 'subscription', element: <Navigate to='/seller/welcome'/>},
		{ path: '*', element: <Navigate to="/404" /> }
	  ]
	},
  ];
}

export default routes;
