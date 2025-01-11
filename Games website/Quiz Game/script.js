const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');

let score = 0;
let currentQuestionIndex = 0;

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '3', correct: false },
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Lisbon', correct: false }
        ]
    },
    {
        question: 'What is the largest ocean on Earth?',
        answers: [
            { text: 'Indian Ocean', correct: false },
            { text: 'Atlantic Ocean', correct: false },
            { text: 'Arctic Ocean', correct: false },
            { text: 'Pacific Ocean', correct: true }
        ]
    },
    {
        question: 'What is Cock ?',
        answers: [
            { text: 'Suck up', correct: false },
            { text: 'Balls', correct: true },
            { text: 'Diddy and Drake', correct: false },
            { text: 'Sex', correct: false }
        ]
    }
];

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'none';
    feedbackElement.innerText = '';
    scoreElement.innerText = 'Score: 0';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.setAttribute('data-correct', answer.correct);
        button.onclick = () => selectAnswer(button);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(button) {
    const correct = button.getAttribute('data-correct') === 'true';
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true; 
        if (btn.getAttribute('data-correct') === 'true') {
            btn.classList.add('correct');
        } else {
            btn.classList.add('wrong');
        }
    });

    if (correct) {
        button.classList.add('correct');
        score++;
        feedbackElement.innerText = 'Correct!';
        feedbackElement.classList.add('correct-message');
        feedbackElement.classList.remove('wrong-message');
    } else {
        button.classList.add('wrong');
        feedbackElement.innerText = 'Wrong!';
        feedbackElement.classList.add('wrong-message');
        feedbackElement.classList.remove('correct-message');
    }

    scoreElement.innerText = `Score: ${score}`;
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.style.display = 'none';
        feedbackElement.innerText = ''; // Clear feedback
    } else {
        questionContainer.innerHTML = `<h2>Quiz Finished!</h2><p>Your final score is: ${score}</p>`;
        nextButton.style.display = 'none'; // Hide next button at the end
    }
});

startGame();