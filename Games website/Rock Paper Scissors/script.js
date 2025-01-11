const choices = ["rock", "paper", "scissors"];
const message = document.getElementById("message");
const computerChoiceText = document.getElementById("computer-choice");
const resetButton = document.getElementById("reset");

// Add event listeners to choice buttons
document.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => {
        const userChoice = button.id;
        const computerChoice = getComputerChoice();
        const result = determineWinner(userChoice, computerChoice);
        
        message.textContent = result.message;
        computerChoiceText.textContent = `Computer chose: ${computerChoice}`;
        resetButton.style.display = "block"; // Show reset button
    });
});

// Function to get computer's choice randomly
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return { message: "It's a tie!" };
    } 
    
    if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        return { message: "You win!" };
    } else {
        return { message: "You lose!" };
    }
}

// Reset the game when the "Play Again" button is clicked
resetButton.addEventListener("click", () => {
    // Clear the message and computer choice
    message.textContent = "";
    computerChoiceText.textContent = "";
    resetButton.style.display = "none"; // Hide the reset button
});

// Add functionality for the Exit button
document.getElementById("exit").addEventListener("click", () => {
    window.location.href = "file:///C:/Users/Christopher/Documents/GitHub/website-onilne/Games%20website/games%202.html";
});