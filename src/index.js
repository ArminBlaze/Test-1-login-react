import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App/App';
import ErrorBoundry from 'components/ErrorBoundry/ErrorBoundry'
import { ServicesProvider } from 'components/ServicesContext/ServicesContext';
import LoginService from "services/LoginService";
import UserService from "services/UserService";
import store from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const loginService = new LoginService();
const userService = new UserService();

ReactDOM.render(
  <Provider store={ store }>
    <ErrorBoundry>
      <ServicesProvider  value={ {loginService, userService} }>
        <Router>
          <App />
        </Router>
      </ServicesProvider>
    </ErrorBoundry>
  </Provider>
, document.getElementById('root'));