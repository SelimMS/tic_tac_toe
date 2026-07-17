const gameboard = (() => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  let currentPlayer = 0;
  
  const pieces = ['X', 'O'];
  const player1 = {
    name: 'Player 1',
    piece: pieces[0]
  };
  
  const player2 = {
    name: 'Player 2',
    piece: pieces[1]
  };

  let players = [player1, player2];
  if (players) {
    currentPlayer = players[0]
  }

  const switchPlayer = () => {
    if (currentPlayer == players[0]) {
      currentPlayer = players[1]
    } else if (currentPlayer == players[1]) {
      currentPlayer = players[0]
    }
    console.log(currentPlayer.name + "'s turn");
    return currentPlayer;
  };

  const makeMove = (row, col) => {
    let piece = currentPlayer.piece;
    if (board[row][col] === null) {
      board[row][col] = piece;
    } else {
      console.log('Invalid move! Cell is already occupied.');
    }
  }

  return {
    switchPlayer,
    board,
    currentPlayer,
    makeMove
  }
})();

function resetGame() {
  gameboard.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  gameboard.currentPlayer = 0;
}

function printBoard() {
  console.log('Current Board:');
  for (let i = 0; i < 3; i++) {
    console.log(gameboard.board[i].map(cell => cell === null ? '-' : cell).join(' | '));
  }
}

function startGame() {
  console.log('Starting Tic-Tac-Toe Game!');
  printBoard();
}


startGame();
gameboard.makeMove(1, 1)
gameboard.switchPlayer()
printBoard()
gameboard.makeMove(1, 2)
gameboard.switchPlayer()
printBoard()
gameboard.makeMove(2, 2)
gameboard.switchPlayer()
printBoard()
