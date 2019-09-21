import React, { Component } from 'react';
import {withRouter, Switch, Route, Redirect } from "react-router-dom";
import importedComponent from 'react-imported-component';

import {Loading} from './components';

class MainRouter extends Component {
  render() {
    const AsyncMain = importedComponent(
      () => import(/* webpackChunkName:'main' */ './layouts/Main.jsx'),
      {
        LoadingComponent: Loading
      }
    );
    const AsyncNoMatch = importedComponent(
      () => import(/* webpackChunkName:'nomatch' */ './layouts/NoMatch.jsx'),
      {
        LoadingComponent: Loading
      }
    );
    const AsyncSignIn = importedComponent(
      () => import(/* webpackChunkName:'signin' */ './layouts/Signin.jsx'),
      {
        LoadingComponent: Loading
      }
    );
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/abc" component={AsyncMain} />
          <Route exact path="/task" component={AsyncMain} />
          <Route exact path="/human" component={AsyncMain} />
          <Route exact path="/" render={() => <Redirect to="/task" />} />
          <Route exact path="/signin" component={AsyncSignIn} />
          <Route component={AsyncNoMatch} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(MainRouter);