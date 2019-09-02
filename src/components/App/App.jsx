import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import {
  HomePage,
  NewsPage,
  LoginPage,
  ProfilePage
} from '../pages/index.js';


class App extends React.Component {

  render() {
    return (
        <main role="main" className="container">
          <Header />
          <Switch >
            <Route path="/" component={HomePage} exact/>
            <Route path="/cart" component={CartPage}/>
          </Switch>
        </main>
    )
  }
}

export default withBookstoreService(App);