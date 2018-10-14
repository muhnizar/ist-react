import React, { Component } from 'react';
const ReactDOM = require('react-dom');
import Nav from './components/Navigation.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Nav/>                
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('istapp')
)
