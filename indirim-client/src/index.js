import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router";
import {Provider} from "react-redux";
import {I18nextProvider} from "react-i18next";
import {ThemeProvider} from "@material-ui/styles";
import {AuthService} from "./services/auth-service";
import ErrorBoundary from "./components/common/error-boundary";
import {AuthServiceProvider} from "./components/common/service-context";
import App from "./components/app";

import store from "./redux";
import theme from "./theme";
import { history } from "./utils";
import i18n from "./services/translate-service";
import * as serviceWorker from './serviceWorker';

const authService = new AuthService();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <AuthServiceProvider value={authService}>
          <ThemeProvider theme={ theme }>
            <I18nextProvider i18n={i18n}>
              <Router history={history}>
                <App/>
              </Router>
            </I18nextProvider>
          </ThemeProvider>
        </AuthServiceProvider>
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
