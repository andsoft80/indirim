import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {useContext, useEffect} from "react";
import routes from "./routes";
import {useRoutes} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchAccountInfo} from "../../store/actions";
import {AccountServiceContext} from "../contexts";

const App = () => {
  const dispatch = useDispatch();
  const accountService = useContext(AccountServiceContext);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const companyId = useSelector(state => state.account.data.companyid);
  
  useEffect(() => {
    console.log("useEffect App")
    dispatch(fetchAccountInfo(accountService));
  }, []);
  
  const config = {
    isAuthenticated,
    isSeller: !!companyId,
  }
  
  return useRoutes(routes(config));
};

export default App;
