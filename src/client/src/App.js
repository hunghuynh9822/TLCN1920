import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import MainRouter from './MainRouter';

import store from './store';

const hist = createBrowserHistory();

class App extends Component {
  render() {
    // Create a theme instance.
    const theme = createMuiTheme({
      color: {
        background: {
          blue: '#1f5c87',
        }
      }
    })
    return (
      <Router history={hist}>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <MainRouter />
          </MuiThemeProvider>
        </Provider>
      </Router>
    );
  };
}

export default App;