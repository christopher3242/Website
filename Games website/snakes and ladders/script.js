const NUM_SQUARES = 100;
const NUM_SNAKES = 5;
const NUM_LADDERS = 5;

let snakes = {};
let ladders = {};
let player1Position = 0;
let player2Position = 0;
let currentPlayer = 1;

// Create player tokens
const player1Token = document.createElement('div');
const player2Token = document.createElement('div');
player1Token.classList.add('player-token', 'player1-token');
player2Token.classList.add('player-token', 'player2-token');

const board = document.getElementById("board");
const rollButton = document.getElementById("rollButton");
const message = document.getElementById("message");
const pos1 = document.getElementById("pos1");
const pos2 = document.getElementById("pos2");
const combinedPosition = document.getElementById("combinedPosition"); // Reference for combined position element

function generateRandomSnakesAndLadders() {
    while (Object.keys(snakes).length < NUM_SNAKES) {
        let head = Math.floor(Math.random() * (NUM_SQUARES - 2)) + 2;
        let tail = Math.floor(Math.random() * (head - 1)) + 1;
        if (!snakes[head] && !ladders[tail]) {
            snakes[head] = tail;
        }
    }

    while (Object.keys(ladders).length < NUM_LADDERS) {
        let bottom = Math.floor(Math.random() * (NUM_SQUARES - 1)) + 1;
        let top = Math.floor(Math.random() * (NUM_SQUARES - bottom)) + bottom + 1;
        if (!ladders[bottom] && !snakes[top]) {
            ladders[bottom] = top;
        }
    }
}

function createBoard() {
    for (let i = 100; i >= 1; i--) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.textContent = i;
        board.appendChild(square);
    }
    applySnakesAndLadders();
    updatePlayerPositions();
}

// Apply snakes and ladders styling
function applySnakesAndLadders() {
    for (let position in snakes) {
        const square = board.children[100 - position];
        square.classList.add('snake');
    }
    for (let position in ladders) {
        const square = board.children[100 - position];
        square.classList.add('ladder');
    }
}

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    message.textContent = `Player ${currentPlayer} rolled: ${roll}`;

    if (currentPlayer === 1) {
        player1Position += roll;
        if (player1Position > 100) player1Position = 100;
        pos1.textContent = player1Position;
        currentPlayer = 2;
    } else {
        player2Position += roll;
        if (player2Position > 100) player2Position = 100;
        pos2.textContent = player2Position;
        currentPlayer = 1;
    }

    checkSnakesAndLadders();
    updatePlayerPositions();
    checkForWin();
    updateCombinedPosition(); // Update combined position after each roll
}

function updatePlayerPositions() {
    for (let i = 0; i < board.children.length; i++) {
        const square = board.children[i];
        if (square.contains(player1Token)) {
            square.removeChild(player1Token);
        }
        if (square.contains(player2Token)) {
            square.removeChild(player2Token);
        }
    }

    if (player1Position > 0) {
        const newSquare1 = board.children[100 - player1Position];
        newSquare1.appendChild(player1Token);
    }

    if (player2Position > 0) {
        const newSquare2 = board.children[100 - player2Position];
        newSquare2.appendChild(player2Token);
    }
}

function checkSnakesAndLadders() {
    if (snakes[player1Position]) {
        player1Position = snakes[player1Position];
        message.textContent += ` Player 1 hit a snake and slid down to ${player1Position}.`;
    }
    if (ladders[player1Position]) {
        player1Position = ladders[player1Position];
        message.textContent += ` Player 1 climbed a ladder to ${player1Position}.`;
    }

    if (snakes[player2Position]) {
        player2Position = snakes[player2Position];
        message.textContent += ` Player 2 hit a snake and slid down to ${player2Position}.`;
    }
    if (ladders[player2Position]) {
        player2Position = ladders[player2Position];
        message.textContent += ` Player 2 climbed a ladder to ${player2Position}.`;
    }
}

function checkForWin() {
    if (player1Position === 100 || player2Position === 100) {
        message.textContent += ` Player ${player1Position === 100 ? '1' : '2'} wins!`;
        rollButton.disabled = true;
    }
}

function updateCombinedPosition() {
    const totalPosition = player1Position + player2Position;
    combinedPosition.textContent = `Combined Position: ${totalPosition}`; // Display the combined position
}

rollButton.addEventListener('click', rollDice);

// Start the game
generateRandomSnakesAndLadders();
createBoard();