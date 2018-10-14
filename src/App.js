import React, { Component } from 'react';
const ReactDOM = require('react-dom');
import Nav from './components/Navigation.jsx'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  
  // palette: {
  //   primary: green, // Purple and green play nicely together.    
  //   error: red,
  // }
  
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <Nav/>
       </MuiThemeProvider>      
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('istapp')
)
