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
let questionContainer = []
let currentQuestion = {};


fetch("assets/json/questions.json")
    .then(res => {
        return res.json();
    })
    .then(loadQuestions => {
        questionContainer = loadQuestions
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
        gameScoreFunction();
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

const gameScoreFunction = () => {
gameScore.innerText = window.localStorage.getItem("mostRecentScore");
};


document.getElementById("save-score").addEventListener("click", function (event) {
    saveHighScore(event);
});

const saveHighScore = (e) => {
    e.preventDefault();

    const score = {
    score: window.localStorage.getItem("mostRecentScore"),
    name: userResult.value
    }
    
    // let score = {
    //     score: mostRecentScore,
    //     name: userResult.value
    // };
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
}).join("");



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