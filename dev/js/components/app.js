import React, {Component} from 'react';
import Game from '../containers/game';
require('../../scss/style.scss');

const App = props => {
  return (
    <div id="app" className="container">
      <div className="row text-center">
        <h2>Welcome to Redux-tac-toe!</h2>
      </div>
      <div className="row text-center">
        <Game />
      </div>

    </div>
  )
};

export default App;
