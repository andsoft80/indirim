import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import { createBrowserHistory } from "history";
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from "@material-ui/styles";

import store from './redux';
import theme from "./theme";
import {history} from "./utils";
import App from "./components/app";
import {AuthService} from "./services/auth-service";
import ErrorBoundary from "./components/common/error-boundary";
import {AuthServiceProvider} from "./components/common/service-context";

const authService = new AuthService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <AuthServiceProvider value={authService}>
          <ThemeProvider theme={ theme }>
            <Router history={history}>
              <App/>
            </Router>
          </ThemeProvider>
        </AuthServiceProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
