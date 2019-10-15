import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import withLoginService from 'hocs/withLoginService';
import Header from 'components/Header/Header';
import {
  HomePage,
  NewsPage,
  LoginPage,
  ProfilePage
} from 'components/pages/';



class App extends React.Component {

  render() {
    return (
        <main role="main" className="container">
          <ReactNotification />
          <Header />
          <Switch >
            <Route path="/" exact component={HomePage}/>
            <Route path="/news" component={NewsPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/login" component={LoginPage}/>
            <Route render={() => <h2>Page not found.</h2>}/>
          </Switch>
        </main>
    )
  }
}

export default withLoginService(App);