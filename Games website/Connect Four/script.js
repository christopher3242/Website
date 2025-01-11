const rows = 6;
const columns = 7;
let board = Array.from({ length: rows }, () => Array(columns).fill(null));
let currentPlayer = 'red'; // Human player
let isGameActive = true;

const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restart');

// Create the initial board
function createBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.col = col;
            boardElement.appendChild(cell);
        }
    }
}

// Handle click on cell (human player's turn)
function handleCellClick(event) {
    const col = parseInt(event.target.dataset.col);
    if (!isGameActive || board[0][col] !== null) return; // Check if the column is full

    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === null) {
            board[row][col] = currentPlayer;
            const cell = boardElement.children[row * columns + col];
            cell.classList.add(currentPlayer);
            if (checkWinner(row, col)) {
                alert(`${currentPlayer} wins!`);
                isGameActive = false;
            } else {
                currentPlayer = 'yellow'; // Switch to AI player
                setTimeout(aiMove, 500); // Delay for AI move
            }
            break;
        }
    }
}

// AI move function
function aiMove() {
    if (!isGameActive) return;

    let col;
    do {
        col = Math.floor(Math.random() * columns);
    } while (board[0][col] !== null); // Ensure AI only picks valid columns

    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === null) {
            board[row][col] = currentPlayer;
            const cell = boardElement.children[row * columns + col];
            cell.classList.add(currentPlayer);
            if (checkWinner(row, col)) {
                alert(`${currentPlayer} wins!`);
                isGameActive = false;
            } else {
                currentPlayer = 'red'; // Switch back to human player
            }
            break;
        }
    }
}

// Check if the player has won
function checkWinner(row, col) {
    return (
        checkDirection(row, col, 1, 0) ||  // Horizontal
        checkDirection(row, col, 0, 1) ||  // Vertical
        checkDirection(row, col, 1, 1) ||  // Diagonal /
        checkDirection(row, col, 1, -1)     // Diagonal \
    );
}

// Helper function to check specific directions
function checkDirection(row, col, rowDir, colDir) {
    let count = 0;

    // Check in one direction
    for (let r = row, c = col; r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer; r += rowDir, c += colDir) {
        count++;
    }

    // Check in the opposite direction
    for (let r = row - rowDir, c = col - colDir; r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer; r -= rowDir, c -= colDir) {
        count++;
    }

    return count >= 4; // Check if there are 4 in a row
}

// Restart the game
restartButton.addEventListener('click', () => {
    board = Array.from({ length: rows }, () => Array(columns).fill(null));
    currentPlayer = 'red'; // Reset to human player
    isGameActive = true;
    createBoard();
});

// Set up event listeners for each cell
boardElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('cell')) {
        handleCellClick(event);
    }
});

// Initialize the game
createBoard();