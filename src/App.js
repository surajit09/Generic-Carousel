import React, { Component } from 'react';

import './App.css';
import GenericCarousel from './components/GenericCarousel';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
           <GenericCarousel />
          </header>
          
      </div>
    );
  }
}

export default App;
