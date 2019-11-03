import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'

import MainRouter from './MainRouter';

import store from './store';

const hist = createBrowserHistory();

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
// const AlertTemplate = ({ style, options, message, close }) => (
//   <div style={style}>
//     {options.type === 'info' && '!'}
//     {options.type === 'success' && ':)'}
//     {options.type === 'error' && ':('}
//     {message}
//     <button onClick={close}>X</button>
//   </div>
// )

// optional cofiguration
const options = {
  // you can also just use 'top center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...options}>
              <MuiThemeProvider theme={theme}>
                <MainRouter />
              </MuiThemeProvider>
            </AlertProvider>
          </Provider>
        </MuiPickersUtilsProvider>
      </Router>
    );
  };
}

export default App;