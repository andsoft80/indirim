import React from "react";
import routes from "./routes";
import {useRoutes} from 'react-router-dom';
import {useSelector} from "react-redux";

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return useRoutes(routes(isAuthenticated));
};

export default App;
