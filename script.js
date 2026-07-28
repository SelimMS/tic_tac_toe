const game = document.querySelector('.game')
const ticTacToe = document.createElement('div')
game.appendChild(ticTacToe)

const gameboard = (() => {
  const board = [
    null, null, null,
    null, null, null,
    null, null, null
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

  const makeMove = (move) => {
    let piece = currentPlayer.piece;
    if (board[move] === null) {
      board[move] = piece;
    } else {
      console.log('Invalid move! Cell is already occupied.');
    }
    switchPlayer()
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
    null, null, null,
    null, null, null,
    null, null, null
  ];
  gameboard.currentPlayer = 0;
}

const gameDisplay = document.createElement('div')
game.appendChild(gameDisplay)
gameDisplay.classList.add('container')
for (let i = 0; i < gameboard.board.length; i++) {
  const box = document.createElement('div')
  box.classList.add('tic')
  box.id = i
  gameDisplay.appendChild(box)
  box.addEventListener('click', (e) => {
    if (winner == null) {
      let piece = gameboard.currentPlayer.piece
      e.target.textContent = piece
      console.log(e.target.id)
      gameboard.makeMove(e.target.id)
      checkWinner()
      if (winner == null) {
        winnerText.textContent = `Computer is thinking...`
        setTimeout(() => {
            computerMove()
            document.getElementById(squareUsed).textContent = 'O'
            printBoard()
            winnerText.textContent = `Player turn...`
            checkWinner()
          }, 1000)
      }
    }
  })
}



function printBoard() {
  console.log('Current Board:');
  let printedBoard = []
  let displayBoard = []
  printedBoard = gameboard.board.map(item => item ?? '-')
  for (let i = 0; i < printedBoard.length; i += 3) {
    const chunk = printedBoard.slice(i, i + 3).join(", ");
    const separator = (i + 3 < printedBoard.length) ? " |" : "";
    console.log(`${chunk}${separator}`);
    displayBoard.push(`${chunk}`)
  }
  console.log(displayBoard)
}

function startGame() {
  console.log('Starting Tic-Tac-Toe Game!');
  printBoard();
}

let winner = null
const winnerText = document.createElement('p')
game.append(winnerText)
winnerText.classList.add('winnerText')
const winning_combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
function checkWinner() {
  const board = gameboard.board
  for (const combo of winning_combos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      console.log(`${board[a]} is the Winner`)
      winner = board[a]
      winnerText.textContent = `${winner} is the winner`
    }
  }
  const isTie = board.every(cell => cell !== null);
  if (isTie) {
    return "Tie"
  }
  return null;
}

let squareUsed = null
function computerMove() {
  const board = gameboard.board
  const randomNumber = Math.floor((Math.random() * 9))
  const emptySquare = board.findIndex((element) => element == null)
  console.log('Computer is thinking...')
  if (board[randomNumber] === null) {
    gameboard.makeMove(randomNumber)
    squareUsed = randomNumber
  } else {
    gameboard.makeMove(emptySquare)
    squareUsed = emptySquare
  }
  return squareUsed
  checkWinner()
}


startGame();
// gameboard.makeMove(0)
// printBoard()
// computerMove()
// printBoard()
// gameboard.makeMove(4)
// printBoard()
// computerMove()
// printBoard()
// gameboard.makeMove(8)
// printBoard()
// computerMove()
// printBoard()