const gameBoardRef = document.querySelector("#game-board");
const playGameRef = document.querySelector("#play-game");
const leadersBoardRef = document.querySelector("#score-on");
const highScoreBtnRef = document.querySelector("#highscore");
const returnToMenuRef = document.querySelector("#return-to-menu");
const rulesRef = document.querySelector("#rules");
const gameWindowRef = document.querySelector("#game-window");
const questionRef = document.querySelector("#question");
const gameResultRef = document.querySelector("#game-result");
const gameScoreRef = document.querySelector("#game-score");
const mainMenuRef = document.querySelector("#main-menu");
const questionCountRef = document.querySelector("#question-counter");
const saveScoreRef = document.querySelector("#save-score");
const scoreListRef = document.querySelector("#score-list");
const userResultRef = document.querySelector("#result");
const secondsRef = document.querySelector("#seconds");
const answersRef = Array.from(document.querySelectorAll(".answer"));
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questionContainer = [];
let currentQuestion = {};

/**
 * Gets Question
 */
const getQuestion = () => {
fetch("assets/data/questions.json")
    .then(res => res.json())
    .then(loadQuestions => questionContainer = loadQuestions);
};

getQuestion();

/**
 * Countdown for rules to be displayed
 * @param {Number} timeLeft 
 */
const countdown = (timeLeft = 5) => {
    let timer = setInterval(function () {
        secondsRef.innerHTML = timeLeft;
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
        }
    }, 1000);
};

/**
 * Starts the game while turning on 
 * countdown from 5 to 0 and then shows Questions
 */
const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questionContainer];
    getNewQuestion();
    rulesRef.style.display = "flex";
    gameBoardRef.style.display = "none";

    countdown(5);

    setTimeout(function () {
        rulesRef.style.display = "none";
        gameWindowRef.style.display = "flex";
    }, 6000);
};

/**
 * Shows highscore in main menu
 * @returns {HTMLElement}
 */
const showScore = () => {
    gameBoardRef.style.display = "none";
    leadersBoardRef.style.display = "flex";
    scoreListRef.innerHTML = highScore.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");
};

/**
 * Goes back from highscore to main menu
 */
const returnToMainMenu = () => {
    gameBoardRef.style.display = "flex";
    leadersBoardRef.style.display = "none";
};

/**
 * Gets new question and randomize it,
 *  if there is no more available questions saves score to display at the end
 * displays each answer on buttons
 * @returns void
 */
const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        getGameScore();
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

/**
 * Checks for selected answer and 
 * if its true makes it correct if false makes it incorrect.
 */
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

/**
 * Increases score displayed at the end of the game
 * @param {Number} num 
 */
const incrementScore = num => score += num;

/**
 * Display score at the end of the game 
 */
const getGameScore = () => {
    gameScoreRef.innerText = window.localStorage.getItem("mostRecentScore");
};

/**
 * Saves score to highScore when button is pressed
 */
const saveScoreBtn = () => {
    saveScoreRef.addEventListener("click", event => {
        saveHighScore(event);
    });
};

/**
 * Pulls score from localstorage and
 * makes it highest to lowest allowing only top 3 score to be saved/shown
 * @param {SubmitEvent} event 
 */
const saveHighScore = (event) => {
    event.preventDefault();

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

/**
 * Returns from end game to main menu without saving score
 */
const returnToMainMenuTwo = () => {
    gameResultRef.style.display = "none";
    gameBoardRef.style.display = "flex";
};

userResultRef.addEventListener("keyup", () => {
    saveScoreRef.disabled = !userResultRef.value;
});

window.addEventListener("DOMContentLoaded", () => {
    playGameRef.addEventListener("click", startGame);
    highScoreBtnRef.addEventListener("click", showScore);
    returnToMenuRef.addEventListener("click", returnToMainMenu);
    mainMenuRef.addEventListener("click", returnToMainMenuTwo);
});