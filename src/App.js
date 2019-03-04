import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Routers from './Router'
import { Provider } from 'react-redux'
import store from './Store/store'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {<Routers />}
      </Provider>
    );
  }
}

export default App;
