const gameBoardRef = document.querySelector("#game-board");
const playGameRef = document.querySelector("#play-game");
const leadersBoardRef = document.querySelector("#score-on");
const highScoreBtnRef = document.querySelector("#highscore");
const returnToMenuRef = document.querySelector("#return-to-menu");
const rulesRef = document.querySelector("#rules");
const gameWindowRef = document.querySelector("#game-window");
const questionRef = document.querySelector("#question");
const answersRef = Array.from(document.querySelectorAll(".answer"));
const gameResultRef = document.querySelector("#game-result");
const gameScoreRef = document.querySelector("#game-score");
const mainMenuRef = document.querySelector("#main-menu");
const questionCountRef = document.querySelector("#question-counter");
const saveScoreRef = document.querySelector("#save-score");
const scoreListRef = document.querySelector("#score-list");
const userResultRef = document.querySelector("#result");
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
const secondsRef = document.querySelector("#seconds");

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questionContainer = [];
let currentQuestion = {};
let timer;

fetch("assets/data/questions.json")
    .then(res => {
        return res.json();
    })
    .then(loadQuestions => {
        questionContainer = loadQuestions;
    });

const internalTimer = (timeLeft = 5) => {
    timer = setInterval(function () {
        secondsRef.innerHTML = timeLeft;
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
        }
    }, 1000);
};

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questionContainer];
    getNewQuestion();
    rulesRef.style.display = "flex";
    gameBoardRef.style.display = "none";

    internalTimer();

    setTimeout(function () {
        rulesRef.style.display = "none";
        gameWindowRef.style.display = "flex";
    }, 6000);
};

const showScore = () => {
    gameBoardRef.style.display = "none";
    leadersBoardRef.style.display = "flex";
    scoreListRef.innerHTML = highScore.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");
};

const returnToMainMenu = () => {
    gameBoardRef.style.display = "flex";
    leadersBoardRef.style.display = "none";
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        gameScoreFunction();
        // saveScoreBtn();
        gameWindowRef.style.display = "none";
        gameResultRef.style.display = "flex";
        return;
    }

    questionCounter++;
    questionCountRef.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionRef.innerText = currentQuestion.question;

    answersRef.forEach((answer) => {
        number = answer.dataset["number"];
        answer.innerText = currentQuestion["answer" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    answersCorrect();
};
const answersCorrect = () => {
    answersRef.forEach(answer => {
        answer.addEventListener("click", e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedAnswer = e.target;
            const selectedButton = selectedAnswer.dataset["number"];


            let classToApply = "incorrect";
            if (selectedButton == currentQuestion.correct) {
                classToApply = "correct";
            }

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
};
const incrementScore = num => {
    score += num;
};

userResultRef.addEventListener("keyup", () => {
    saveScoreRef.disabled = !userResultRef.value;
});

const gameScoreFunction = () => {
    gameScoreRef.innerText = window.localStorage.getItem("mostRecentScore");
};
const saveScoreBtn = () => {
    document.querySelector("#save-score").addEventListener("click", function (event) {
        saveHighScore(event);
    });
};

const saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: window.localStorage.getItem("mostRecentScore"),
        name: userResultRef.value
    };

    highScore.push(score);
    highScore.sort((a, b) => b.score - a.score);
    highScore.splice(3);

    localStorage.setItem("highScore", JSON.stringify(highScore));
    userResultRef.value = "";
    gameResultRef.style.display = "none";
    gameBoardRef.style.display = "flex";
};
saveScoreBtn();

const returnToMainMenuTwo = () => {
    gameResultRef.style.display = "none";
    gameBoardRef.style.display = "flex";
};

window.addEventListener('DOMContentLoaded', () => {
    // listenning to clicks on play, highscore, return to main menu
    playGameRef.addEventListener("click", startGame);
    highScoreBtnRef.addEventListener("click", showScore);
    returnToMenuRef.addEventListener("click", returnToMainMenu);
    mainMenuRef.addEventListener("click", returnToMainMenuTwo);
});