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
          <Route exact path="/" component={AsyncSignIn} />
          <Route path="/hr" component={AsyncMain} />
          <Route path="/staff" component={AsyncMain} />
          <Route component={AsyncNoMatch} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(MainRouter);