import React from "react";
import {Switch} from "react-router-dom";
import ProtectedRoute from "../common/protected-route";
import Welcome from "../welcome";
import {MainLayout, MinimalLayout} from "../layouts";
import RouteWithLayout from "../common/route-with-layout";
import {RecoveryPasswordPage, ResetPasswordPage, SignInPage, SignUpPage} from "../authentification";


const App = () => {
  return (
    <Switch>
	  <ProtectedRoute component={Welcome} layout={MainLayout} path="/" exact />
	  <RouteWithLayout component={SignInPage} layout={MinimalLayout} path="/signIn" exact/>
	  <RouteWithLayout component={SignUpPage} layout={MinimalLayout} path="/signUp" exact/>
	  <RouteWithLayout component={ResetPasswordPage} layout={MinimalLayout} path="/reset/:resetToken" exact/>
	  <RouteWithLayout component={RecoveryPasswordPage} layout={MinimalLayout} path="/recovery" exact/>
    </Switch>
  );
}

export default App;
