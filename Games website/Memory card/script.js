const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const scoreDisplay = document.getElementById('score-display');

let cards = [];
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
    'image10.png',
];
cardValues = [...cardValues, ...cardValues]; // Duplicate cards
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCardElement(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    
    const img = document.createElement('img');
    img.src = value;
    img.alt = "Memory Card Image";
    
    card.appendChild(img);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

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
        updateScore(1); // Increase score for a match
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
    score = 0; // Reset score
    scoreDisplay.textContent = `Score: ${score}`; // Update score display
    shuffle(cardValues);
    gameBoard.innerHTML = '';
    cardValues.forEach(createCardElement);
}

resetButton.addEventListener('click', setupGame);
setupGame();