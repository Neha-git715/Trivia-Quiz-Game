const questions = [
    {
        question: 'What is the largest ocean on Earth?',
        answers: [
            { text: 'Atlantic Ocean', correct: false },
            { text: 'Indian Ocean', correct: false },
            { text: 'Arctic Ocean', correct: false },
            { text: 'Pacific Ocean', correct: true }
        ]
    },
    {
        question: 'What is the powerhouse of the cell?',
        answers: [
            { text: 'Nucleus', correct: false },
            { text: 'Mitochondria', correct: true },
            { text: 'Ribosomes', correct: false },
            { text: 'Golgi apparatus', correct: false }
        ]
    },
    {
        question: 'Who painted the Mona Lisa?',
        answers: [
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Claude Monet', correct: false }
        ]
    },

    { question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
];
const startButton = document.getElementById('start');
const Container = document.getElementsByClassName('container');
const quizContainer = document.getElementById('quiz-container');

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const thankYouContainer = document.getElementById('thank-you-container');

let currentQuestionIndex = 0;
let score = 0;

startButton.addEventListener('click', startGame);

function startGame() {
    Container[0].classList.add('hide');
    quizContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        const correct = questions[currentQuestionIndex].answers.find(a => a.text === button.textContent).correct;
        button.classList.add(correct ? 'correct' : 'incorrect');
        button.disabled = true;
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showScore();
        thankYouContainer.classList.remove('hide');
    }
}

function showScore() {
    scoreContainer.classList.remove('hide');
    scoreElement.textContent = score;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});


