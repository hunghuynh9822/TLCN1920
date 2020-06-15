import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import importedComponent from 'react-imported-component';

import { Loading } from './components';

import { PrivateRoute, OAuth2RedirectHandler } from './components';

import { authenticate, getCurrentUser } from './action/auth'

class MainRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.props.authenticate(true, response);
        this.setState({
          loading: false
        });
      }).catch(error => {
        console.log(error);
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

  componentWillMount() {
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
    const AsyncSignUp = importedComponent(
      () => import(/* webpackChunkName:'signup' */ './layouts/Signup.jsx'),
      {
        LoadingComponent: Loading
      }
    );

    const AsyncHome = importedComponent(
      () => import(/* webpackChunkName:'home' */ './layouts/Home.jsx'),
      {
        LoadingComponent: Loading
      }
    );
    console.log("Render");
    console.log("Current MainRouter state : "+JSON.stringify(this.state));
    if (this.state.loading) {
      console.log("Render Loading");
      return <Loading />
    }
    console.log("Render Component");
    return (
      <React.Fragment>
        <Switch>
          <PrivateRoute path="/home" component={AsyncHome} />
          <PrivateRoute path="/admin" component={AsyncMain} />
          <PrivateRoute path="/hr" component={AsyncMain} />
          <PrivateRoute path="/staff" component={AsyncMain} />
          <PrivateRoute path="/lead" component={AsyncMain} />
          <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
          <Route path="/notfound" component={AsyncNoMatch} />
          <Route exact path="/(login|)" render={(props) => <AsyncSignIn {...props} />} />
          <Route exact path="/new" render={(props) => <AsyncSignUp {...props} />} />
          <Route component={AsyncNoMatch} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.auth.authenticated,
    currentUser: state.auth.currentUser,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticate: (authenticated, currentUser) => dispatch(authenticate(authenticated, currentUser)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainRouter));