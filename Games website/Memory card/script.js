const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const scoreDisplay = document.getElementById('score-display');

// Update image array with 10 unique images (ensure these images are available)
let cardValues = [
    'image1.png',
    'image2.png',
    'image3.png',
    'image4.png',
    'image5.png',
    'image6.png',
    'image7.png',
    'image8.png',
    'image9.png',
    'image10.png'
];

cardValues = [...cardValues, ...cardValues]; // Duplicate the card values for matching pairs

// Adding empty slots to make it 25 cards
while (cardValues.length < 25) {
    cardValues.push(null); // Push null values for empty spaces in the grid
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

// Shuffle function to randomize the card positions
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCardElement(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    const img = document.createElement('img');
    img.src = value; // Set the image source
    img.alt = "Memory Card Image"; 
    card.appendChild(img);

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
}

// Flip the card when clicked
function flipCard() {
    if (lockBoard || this === firstCard || !this.dataset.value) return; // Ignore empty cards

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        updateScore(1);
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function updateScore(points) {
    score += points;
    scoreDisplay.textContent = `Score: ${score}`;
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function setupGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    shuffle(cardValues);
    gameBoard.innerHTML = '';
    cardValues.forEach(createCardElement);
}

resetButton.addEventListener('click', setupGame);
setupGame(); // Initialize the game on load