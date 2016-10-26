const initial = {
  playing: false,
  gameOver: false,
  board: [
    0,0,0,
    0,0,0,
    0,0,0
  ],
  winner: 0,
  dimensions: {
    width: 300,
    height: 300
  }
};

export default function(state=Object.assign({}, initial), action) {

  switch (action.type) {
    case "START_GAME":
      return startGame();
      break;
    case "CLICK":
      const next = handleClick(state, action.payload.x, action.payload.y);
      return  next ? next : state;
      break;
  }

  return state;
}

function startGame() {
  const newGame = Object.assign({}, initial);
  clearBoard(newGame.board);
  console.log('newGame', newGame);
  newGame.playing = true;
  return newGame;
}

function handleClick(state, x, y) {
  // find index of board
  let i = 0;
  const {board, playing} = state;
  const {width, height} = state.dimensions;

  if(x >= (width/3) && x < 2*(width/3)){
    i += 1;
  } else if (x >= 2*(width/3)) {
    i += 2;
  }

  if(y >= (height/3) && y < 2*(height/3)){
    i += 3;
  } else if (y >= 2*(width/3)) {
    i += 6;
  }

  if(board[i] === 0) {
    const next = Object.assign({}, state);
    next.board[i] = 1;
    // check if player won before ending the game.
    if(checkGameOver(next)) {
      return next;
    };
    // apply the opponent's move
    applyOppentsMove(next.board);
    // check if opponent won
    checkGameOver(next);
    return next;
  }

  return null;
}

// TODO: Implement AI
function applyOppentsMove(board) {
  for(let i = 0; i < board.length; i++) {
    if(board[i] === 0) {
      return board[i] = 2;
    }
  }

  /* AI:
    1. Win: If the player has two in a row, they can place a third to get three in a row.
    2. Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
    3. Fork: Create an opportunity where the player has two threats to win (two non-blocked lines of 2).
    4. Blocking an opponent's fork:
      b. Option 1: The player should create two in a row to force the opponent into defending, as long as it doesn't result in them creating a fork. For example, if "X" has a corner, "O" has the center, and "X" has the opposite corner as well, "O" must not play a corner in order to win. (Playing a corner in this scenario creates a fork for "X" to win.)
      a. Option 2: If there is a configuration where the opponent can fork, the player should block that fork.
    5. Center: A player marks the center. (If it is the first move of the game, playing on a corner gives "O" more opportunities to make a mistake and may therefore be the better choice; however, it makes no difference between perfect players.)
    6. Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
    7. Empty corner: The player plays in a corner square.
    8. Empty side: The player plays in a middle square on any of the 4 sides.
  */
}

function checkGameOver(state) {
  const {board} = state;
  let playerWon = false;
  let computerWon = false;
  // check rows
  for(let i = 0; i < 9; i+=3) {
    if(board[i] !== 0 && board[i] === board[i+1] && board[i] === board[i+2]) {
      if(board[i] === 1) {
        playerWon = true;
      } else if (board[i] === 2){
        computerWon = true;
      }
    }
  }
  // check columns
  for(let i = 0; i < 3; i++) {
    if(board[i] !== 0 && board[i] === board[i+3] && board[i] === board[i+6]) {
      if(board[i] === 1) {
        playerWon = true;
      } else if (board[i] === 2){
        computerWon = true;
      }
    }
  }

  // check diagonals
  if(board[0] !== 0 && board[0] === board[4] && board[0] === board[8]) {
    if(board[0] === 1) {
      playerWon = true;
    } else if (board[0] === 2){
      computerWon = true;
    }
  }

  if(board[2] !== 0 && board[2] === board[4] && board[2] === board[6]) {
    if(board[2] === 1) {
      playerWon = true;
    } else if (board[2] === 2){
      computerWon = true;
    }
  }

  if(playerWon) {
    state.gameOver = true;
    state.winner = 1;
    return true;
  }

  if(computerWon) {
    state.gameOver = true;
    state.winner = 2;
    return true;
  }

  return false;
}

function clearBoard(board) {
  for(let i = 0; i < board.length; i++) {
    board[i] = 0;
  }
}
