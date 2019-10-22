import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import importedComponent from 'react-imported-component';

import { Loading } from './components';

import { PrivateRoute, OAuth2RedirectHandler } from './components';

import { getCurrentUser } from './util/APIUtils';

class MainRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false
    }
    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
      .then(response => {
        console.log("Get current user success");
        console.log(response);
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false
        });
      }).catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
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
    console.log("Render");
    
    console.log(this.state);
    if(this.state.loading) {
      console.log("Render Loading");
      return <Loading />
    }
    console.log("Render Component");
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/(login|)" render={(props) => <AsyncSignIn authenticated={this.state.authenticated} roles={this.state.currentUser?this.state.currentUser.roles:[]} {...props} />} />
          <PrivateRoute path="/admin" authenticated={this.state.authenticated} component={AsyncMain} />
          <PrivateRoute path="/hr" authenticated={this.state.authenticated} component={AsyncMain} />
          <PrivateRoute path="/staff" authenticated={this.state.authenticated} component={AsyncMain} />
          <PrivateRoute path="/lead" authenticated={this.state.authenticated} component={AsyncMain} />
          <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
          <Route path="/notfound" component={AsyncNoMatch} />
          <Route component={AsyncNoMatch} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(MainRouter);