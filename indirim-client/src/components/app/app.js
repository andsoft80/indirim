import React from "react";
import {Redirect, Switch} from "react-router-dom";
import {MinimalLayout} from "../layouts";
import RouteWithLayout from "../common/route-with-layout";
import {SignInPage} from "../sign-in";
import {SignUpPage} from '../sign-up';
import Welcome from "../welcome";
import requireAuthentication from "../common/require-authentication";


const App = () => {
  return (
    <Switch>
	  <RouteWithLayout component={SignInPage} layout={MinimalLayout} path="/signIn" exact/>
	  <RouteWithLayout component={SignUpPage} layout={MinimalLayout} path="/signUp" exact/>
	  <RouteWithLayout component={requireAuthentication(Welcome)} layout={MinimalLayout} path="/" exact/>
	  <Redirect from="*" to="/" />
	</Switch>
  );
}

export default App;
