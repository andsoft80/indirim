import React from "react";
import routes from "./routes";
import { useRoutes } from 'react-router-dom';
import {useSelector} from "react-redux";

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const routing = useRoutes(routes(isAuthenticated));
  
  return routing;
};

export default App;
