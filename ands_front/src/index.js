import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect, BrowserRouter  } from "react-router-dom";
import { createBrowserHistory } from "history";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Authcontrol from './Authcontrol';
import Login from './components/Login';
import Register from './components/Register';
import Recovery from './components/Recovery';

const hist = createBrowserHistory({forceRefresh:true});

ReactDOM.render(
  <Router history={hist}>
    



    {Authcontrol.isUserAuthenticated() ?
      <Switch>
        <Route  path="/" component={App} />
        
      </Switch>
      :


      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/recovery" component={Recovery} />
        <Route  path="*" component={Login} />
        
      </Switch>



    }



    {/* <Redirect from="/" to="/" /> */}





  </Router>,

  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



