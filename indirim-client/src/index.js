import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {I18nextProvider} from "react-i18next";
import {ThemeProvider} from "@material-ui/styles";
import {BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./components/common/error-boundary";

import App from "./components/app";

import store from "./store";
import theme from "./theme";
import history from "./history";
import i18n from "./services/translate-service";
import {AuthService} from "./services/auth-service";
import {AccountService} from "./services/account-service";
import {
  AccountServiceProvider,
  AuthServiceProvider,
  UniversalServiceProvider } from "./components/contexts";

import * as serviceWorker from './serviceWorker';
import {UniversalService} from "./services/universal-service";

const authService = new AuthService();
const accountService = new AccountService();
const universalService = new UniversalService();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
          <ThemeProvider theme={ theme }>
            <I18nextProvider i18n={i18n}>
              <Router history={history}>
                <AuthServiceProvider value={authService}>
                  <AccountServiceProvider value={accountService}>
                    <UniversalServiceProvider value={universalService}>
                      <App/>
                    </UniversalServiceProvider>
                  </AccountServiceProvider>
                </AuthServiceProvider>
              </Router>
            </I18nextProvider>
          </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
