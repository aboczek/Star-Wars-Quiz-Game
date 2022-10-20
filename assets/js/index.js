// Questions and answers
let questionContainer = [{
        question: "What is the name of Yoda's home?",
        answer1: "Naboo",
        answer2: "Kashyyk",
        answer3: "Dagobah",
        correct: 3
    },

    {
        question: "C-3P0 is fluent in how many languages?",
        answer1: "3",
        answer2: "2 milion",
        answer3: "Over 60 million languages",
        correct: 3
    },

    {
        question: "Who built C-3P0?",
        answer1: "Anakin Skywalker",
        answer2: "Boba Fett",
        answer3: "Princes Leia",
        correct: 1
    },

    {
        question: "How old is Yoda when he dies?",
        answer1: "69",
        answer2: "900",
        answer3: "232",
        correct: 2
    },

    {
        question: "Who is the young Jedi Knight who becomes Darth Vader?",
        answer1: "Luke Skywalker",
        answer2: "Anakin Skywalker",
        answer3: "Obi Wan Kenobi",
        correct: 2
    },

    {
        question: "What is the ‘Rule of 2’?",
        answer1: "There can only be 2 Sith Lords at one time.",
        answer2: "Eye for an eye",
        answer3: "Brunch and dinner",
        correct: 1
    },

    {
        question: "Who stars as the famous Han Solo in the original Star Wars films?",
        answer1: "Brad Pitt",
        answer2: "Harrison Ford",
        answer3: "Daniel Radcliffe",
        correct: 2
    },

    {
        question: "Who is Luke and Leia’s mother?",
        answer1: "Padmé Amidala",
        answer2: "Ahsoka Tano",
        answer3: "Jyn Erso",
        correct: 1
    },

    {
        question: " What age did Padmé Amidala become a queen?",
        answer1: "9",
        answer2: "14",
        answer3: "18",
        correct: 2
    },

    {
        question: "Who tried to save Han Solo by disguising and infiltrating Jabba’s palace?",
        answer1: "Master Yoda",
        answer2: "Princess Leia",
        answer3: "Chewbacca",
        correct: 2
    },
];

const gameBoard = document.querySelector("#game-board");
const playGame = document.querySelector("#play-game");
const leadersBoard = document.querySelector("#score-on");
const highScoreBtn = document.querySelector("#highscore");
const returnToMenu = document.querySelector("#return-to-menu");
const rules = document.querySelector("#rules");
const gameWindow = document.querySelector("#game-window");
const question = document.querySelector("#question");
const answers = Array.from(document.getElementsByClassName("answer"));
const gameResult = document.querySelector("#game-result");
const gameScore = document.querySelector("#game-score");
const mainMenu = document.querySelector("#main-menu");
const questionCount = document.querySelector("#question-counter");
const saveScore = document.querySelector("#save-score");
const scoreList = document.querySelector("#score-list");
const userResult = document.querySelector("#result");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

const MAX_HIGH_SCORE = 3;
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let currentQuestion = {};



// Hidding unecessary content from viewing and loading Dom
window.addEventListener('DOMContentLoaded', () => {
    rules.style.display = "none";
    gameWindow.style.display = "none";
    leadersBoard.style.display = "none";
    gameResult.style.display = "none";
    // listenning to clicks on play, highscore, return to main menu
    playGame.addEventListener("click", startGame);
    highScoreBtn.addEventListener("click", showScore);
    returnToMenu.addEventListener("click", returnToMainMenu);
    mainMenu.addEventListener("click", returnToMainMenuTwo);
});




const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questionContainer];
    getNewQuestion();
    rules.style.display = "flex";
    gameBoard.style.display = "none";
    setTimeout(function () {
        rules.style.display = "none"
        gameWindow.style.display = "flex";
    }, 5000);
};

const showScore = () => {
    gameBoard.style.display = "none";
    leadersBoard.style.display = "flex";
};

const returnToMainMenu = () => {
    gameBoard.style.display = "flex";
    leadersBoard.style.display = "none";
}


const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);

        gameWindow.style.display = "none";
        gameResult.style.display = "flex";
        return;
    };

    questionCounter++;

    questionCount.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    answers.forEach((answer) => {
        number = answer.dataset["number"];
        answer.innerText = currentQuestion["answer" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

answers.forEach(answer => {
    answer.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedAnswer = e.target;
        const selectedButton = selectedAnswer.dataset["number"];


        let classToApply = "incorrect";
        if (selectedButton == currentQuestion.correct) {
            classToApply = "correct";
        };

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedAnswer.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedAnswer.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

const incrementScore = num => {
    score += num;
};


userResult.addEventListener("keyup", () => {
    saveScore.disabled = !userResult.value;
});


gameScore.innerText = mostRecentScore;



document.getElementById("save-score").addEventListener("click", function (event) {
    saveHighScore(event);
});

const saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: userResult.value
    };
    highScore.push(score);

    highScore.sort((a, b) => b.score - a.score);
    highScore.splice(3);

    localStorage.setItem("highScore", JSON.stringify(highScore));

    gameResult.style.display = "none";
    gameBoard.style.display = "flex";
};

const returnToMainMenuTwo = () => {
    gameResult.style.display = "none";
    gameBoard.style.display = "flex";
};


scoreList.innerHTML = highScore.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");