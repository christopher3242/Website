let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById('guessButton').addEventListener('click', function() {
    const guessInput = document.getElementById('guessInput');
    const message = document.getElementById('message');
    const playAgainButton = document.getElementById('playAgainButton');

    const userGuess = Number(guessInput.value);
    attempts++;

    if (userGuess < 1 || userGuess > 100) {
        message.textContent = 'Please enter a number between 1 and 100.';
    } else if (userGuess > randomNumber) {
        message.textContent = 'Too high! Try again.';
    } else if (userGuess < randomNumber) {
        message.textContent = 'Too low! Try again.';
    } else {
        message.textContent = `Congratulations! You found the number ${randomNumber} in ${attempts} attempts.`;
        playAgainButton.style.display = 'block';
        guessInput.disabled = true;
    }
    
    guessInput.value = '';
});

document.getElementById('playAgainButton').addEventListener('click', function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    document.getElementById('message').textContent = '';
    document.getElementById('guessInput').disabled = false;
    document.getElementById('playAgainButton').style.display = 'none';
    document.getElementById('guessInput').value = '';
});