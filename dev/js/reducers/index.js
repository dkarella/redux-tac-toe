import {combineReducers} from 'redux';
import game from './game';

const allReducers = combineReducers({
  game: game
});

export default allReducers;
