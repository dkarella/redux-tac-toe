import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Board from '../components/board';
import {StartGame, Click} from '../actions';

const Game = props => {
  const {game, startGame, click} = props;
  if(game.playing) {
    return (
      <div>
        <Board board={game.board} dimensions={game.dimensions} click={click} gameOver={game.gameOver} />
        {game.gameOver ? <div>
          <h2>
            {game.winner === 1 ? 'YOU WON!' : 'YOU LOST!'}
          </h2>
          <button onClick={startGame} className="btn btn-default">Play Again?</button>
        </div> : null}
      </div>

    )
  } else {
    return (
      <div>
        <button onClick={startGame} className="btn btn-default">Play!</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    game: state.game
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    startGame: StartGame,
    click: Click
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Game);
