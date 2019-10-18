import React, { Component } from 'react';
import {withRouter, Switch, Route, Redirect } from "react-router-dom";
import importedComponent from 'react-imported-component';

import {Loading} from './components';

import {PrivateRoute,OAuth2RedirectHandler} from './components'

class MainRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false
    }
  }
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
          <Route exact path="/(login|)" component={AsyncSignIn} />
          <PrivateRoute path="/admin" authenticated={this.state.authenticated} component={AsyncMain}/>
          <PrivateRoute path="/hr" authenticated={this.state.authenticated} component={AsyncMain}/>
          <PrivateRoute path="/staff" authenticated={this.state.authenticated} component={AsyncMain}/>
          <PrivateRoute path="/lead" authenticated={this.state.authenticated} component={AsyncMain}/>
          <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
          <Route path="/notfound" component={AsyncNoMatch} />
          <Route component={AsyncNoMatch} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(MainRouter);