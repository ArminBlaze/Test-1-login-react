import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App/App';
import ErrorBoundry from 'components/ErrorBoundry/ErrorBoundry'
import { LoginServiceProvider } from 'components/LoginServiceContext/LoginServiceContext';
import LoginService from "services/LoginService";
import store from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const loginService = new LoginService();

ReactDOM.render(
  <Provider store={ store }>
    <ErrorBoundry>
      <LoginServiceProvider  value={ loginService }>
        <Router>
          <App />
        </Router>
      </LoginServiceProvider>
    </ErrorBoundry>
  </Provider>
, document.getElementById('root'));