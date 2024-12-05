const gameElement = document.getElementById('game');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart');

let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;
let currentPlayer = 'X'; // Player is 'X', computer is 'O'

// Create the board dynamically
function createBoard() {
  gameElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    if (cell === 'X') cellElement.classList.add('x'); // Blue for X
    if (cell === 'O') cellElement.classList.add('o'); // Red for O
    cellElement.dataset.index = index;
    cellElement.textContent = cell;
    gameElement.appendChild(cellElement);
  });
}

// Check for a win or draw
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameOver = true;
      resultElement.textContent = `${board[a]} Wins!`;
      return;
    }
  }

  if (board.every((cell) => cell)) {
    isGameOver = true;
    resultElement.textContent = 'It\'s a Draw!';
  }
}

// Computer makes a move
function computerMove() {
  if (isGameOver) return;

  // Pick the first available cell (basic AI)
  const availableCells = board.map((cell, index) => (cell === '' ? index : null)).filter((index) => index !== null);
  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

  if (randomIndex !== undefined) {
    board[randomIndex] = 'O';
    createBoard();
    checkWin();
    currentPlayer = 'X'; // Switch back to player
  }
}

// Handle player's move
gameElement.addEventListener('click', (e) => {
  if (isGameOver || currentPlayer !== 'X') return;

  const index = e.target.dataset.index;
  if (board[index] === '') {
    board[index] = 'X';
    createBoard();
    checkWin();
    if (!isGameOver) {
      currentPlayer = 'O'; // Switch to computer
      setTimeout(computerMove, 500); // Delay for computer move
    }
  }
});

// Restart the game
restartButton.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameOver = false;
  currentPlayer = 'X';
  resultElement.textContent = '';
  createBoard();
});

// Start the game
createBoard();
