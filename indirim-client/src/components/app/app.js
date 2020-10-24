import React from "react";
import {Redirect, Switch} from "react-router-dom";
import {MinimalLayout} from "../layouts";
import ProtectedRoute from "../common/protected-route";
import RouteWithLayout from "../common/route-with-layout";
import SignIn from "../sign-in";
import Welcome from "../welcome";


const App = () => {
  return (
    <Switch>
	  <RouteWithLayout component={SignIn} layout={MinimalLayout} path="/signIn" exact/>
	  <ProtectedRoute component={<RouteWithLayout component={Welcome} layout={MinimalLayout} path="/" exact/>} />
	  <Redirect from="*" to="/" />
	</Switch>
  );
}

export default App;
