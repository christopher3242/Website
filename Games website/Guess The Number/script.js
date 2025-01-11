let randomNumber = Math.floor(Math.random() * 50) + 1; // Change the range to 1-50
let attempts = 0;

document.getElementById('submitGuess').addEventListener('click', function() {
    const userGuess = parseInt(document.getElementById('guessInput').value);
    attempts++;

    if (isNaN(userGuess)) {
        displayMessage("Please enter a valid number!");
    } else if (userGuess < 1 || userGuess > 50) { // Update the range check
        displayMessage("Please guess a number between 1 and 50!");
    } else if (userGuess === randomNumber) {
        displayMessage(`Congratulations! You guessed the number in ${attempts} attempts!`);
        document.getElementById('restartButton').style.display = 'block';
        document.getElementById('submitGuess').disabled = true;
    } else if (userGuess < randomNumber) {
        displayMessage("Too low! Try again.");
    } else {
        displayMessage("Too high! Try again.");
    }
});

document.getElementById('restartButton').addEventListener('click', function() {
    attempts = 0;
    randomNumber = Math.floor(Math.random() * 50) + 1; // Reset the random number
    document.getElementById('guessInput').value = '';
    document.getElementById('message').innerText = '';
    document.getElementById('submitGuess').disabled = false;
    this.style.display = 'none';
});

function displayMessage(message) {
    document.getElementById('message').innerText = message;
}