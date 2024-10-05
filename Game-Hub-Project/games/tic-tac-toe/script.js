const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winnerMessage = document.getElementById("winner-message");
const restartButton = document.getElementById("restartButton");

let isCircleTurn = false;
let boardState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkForWinner(currentPlayer) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return boardState[index] === currentPlayer;
    });
  });
}

function isDraw() {
  return boardState.every(cell => cell !== null);
}

function placeMark(cell, currentPlayer, index) {
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function handleClick(event) {
  const cell = event.target;
  const currentPlayer = isCircleTurn ? "O" : "X";
  const index = Array.from(cells).indexOf(cell);

  if (boardState[index] !== null) return;  // Cell already taken

  placeMark(cell, currentPlayer, index);

  if (checkForWinner(currentPlayer)) {
    winnerMessage.textContent = `${currentPlayer} Wins!`;
    cells.forEach(cell => cell.removeEventListener("click", handleClick));
  } else if (isDraw()) {
    winnerMessage.textContent = "It's a Draw!";
  } else {
    isCircleTurn = !isCircleTurn;
  }
}

function startGame() {
  boardState.fill(null);
  winnerMessage.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener("click", handleClick, { once: true });
  });
  isCircleTurn = false;
}

restartButton.addEventListener("click", startGame);

startGame();
