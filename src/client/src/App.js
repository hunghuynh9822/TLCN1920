import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

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