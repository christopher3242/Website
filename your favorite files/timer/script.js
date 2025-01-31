let countdown;
let totalTime = 0;
let timerPaused = true;
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const inputHours = document.getElementById('inputHours');
const inputMinutes = document.getElementById('inputMinutes');
const inputSeconds = document.getElementById('inputSeconds');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
const exitButton = document.getElementById('exitButton');

startButton.addEventListener('click', function() {
    const hours = parseInt(inputHours.value) || 0;
    const minutes = parseInt(inputMinutes.value) || 0;
    const seconds = parseInt(inputSeconds.value) || 0;
    
    totalTime = (hours * 3600) + (minutes * 60) + seconds;

    if (totalTime > 0 && timerPaused) {
        startCountdown(totalTime);
        startButton.disabled = true;
        timerPaused = false;
        pauseButton.classList.remove('hidden');
        resetButton.classList.remove('hidden');
    }
});

pauseButton.addEventListener('click', function() {
    clearInterval(countdown);
    timerPaused = true;
    startButton.disabled = false;
    pauseButton.classList.add('hidden');
});

resetButton.addEventListener('click', function() {
    clearInterval(countdown);
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    inputHours.value = '';
    inputMinutes.value = '';
    inputSeconds.value = '';
    message.classList.add('hidden');
    startButton.disabled = false;
    pauseButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    timerPaused = true;
});

function startCountdown(duration) {
    countdown = setInterval(() => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;

        hoursDisplay.textContent = String(hours).padStart(2, '0');
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');

        if (duration <= 0) {
            clearInterval(countdown);
            message.classList.remove('hidden');
            pauseButton.classList.add('hidden');
            resetButton.classList.remove('hidden');
        }

        duration--;
    }, 1000);
}

