import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import { Navbar } from './components/Navbar'

export class App extends Component {
  state = {}

  render() {
    return (
      <div className='app'>
        <Navbar user={ this.state.user } />
      </div>
    );
  }
}
