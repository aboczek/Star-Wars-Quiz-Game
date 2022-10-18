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
// Declaring all variables to get elements from html file
const gameBoard = document.getElementById("game-board");
// Play! button in main menu
const playGame = document.getElementById("play-game");
const leadersBoard = document.getElementById("score-on");
// Highscore button in main menu
const highScoreBtn = document.getElementById("highscore");
// return button in highscore/leaderboard
const returnToMenu = document.getElementById("return-to-menu");
const rules = document.getElementById("rules");
const gameWindow = document.getElementById("game-window");
const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer"));
const gameResult = document.getElementById("game-result");
const gameScore = document.getElementById("game-score");
const mainMenu = document.getElementById("main-menu");
const questionCount = document.getElementById("question-counter");
const saveScore = document.getElementById("save-score");
const userResult = document.getElementById("result");
// getting score from local storage
const mostRecentScore = localStorage.getItem("mostRecentScore");
// saves highscore to localstorage as JSON
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
// sets top 3 leaderboard
const MAX_HIGH_SCORE = 3;

// Hidding unecessary content from viewing and loading Dom
window.addEventListener('DOMContentLoaded', () => {
    rules.style.display = "none";
    gameWindow.style.display = "none";
    leadersBoard.style.display = "none";
    gameResult.style.display = "none";
    // listenning to clicks on Play button and Highscore
    playGame.addEventListener("click", startGame);
    highScoreBtn.addEventListener("click", showScore);
    returnToMenu.addEventListener("click", returnToMainMenu);
});

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

// // //Starting the rules before game

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questionContainer];
    getNewQuestion();
    // hides main game board and shows rules
    rules.style.display = "flex";
    gameBoard.style.display = "none";
    // hides rules and shows game window for questions with 5 seconds timeout on rules
    setTimeout(function () {
        rules.style.display = "none"
        gameWindow.style.display = "flex";
    }, 5000);
};
// highscore button for leaderboard/highscore
showScore = () => {
    gameBoard.style.display = "none";
    leadersBoard.style.display = "flex";
};
// returns from leaderboard/highscore
returnToMainMenu = () => {
    gameBoard.style.display = "flex";
    leadersBoard.style.display = "none";
}

// inserts questions in html #question randomly generated from array
getNewQuestion = () => {
    if (availableQuestions.lenght == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        // turns off game window and goes to game result
        gameWindow.style.display = "none";
        gameResult.style.display = "flex";
        return;

    };
    questionCounter++;
    // increments question number from 1 to 10
    questionCount.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    // inserts answers to buttons in html
    answers.forEach((answer) => {
        number = answer.dataset["number"];
        answer.innerText = currentQuestion["answer" + number];
    });
    // takes question from questions used so it doesnt show them again
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
// gets new question after selecting answer
answers.forEach(answer => {
    answer.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        // checks if answer is true or false
        acceptingAnswers = false;
        const selectedAnswer = e.target;
        const selectedButton = selectedAnswer.dataset["number"];

        // if true it changes to correct if false changes to incorrect
        let classToApply = "incorrect";
        if (selectedButton == currentQuestion.correct) {
            classToApply = "correct";
        };

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        // adds class to container if answer is correct or incorrect and will change color accordingly
        selectedAnswer.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedAnswer.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});
// increments score in the background
incrementScore = num => {
    score += num;
};

// disables save button if no username inserted
userResult.addEventListener("keyup", () => {
    saveScore.disabled = !userResult.value;
});

// gets score from game from local storage
gameScore.innerText = mostRecentScore;

// adds function saveHighScore(event) to html
document.getElementById("save-score").addEventListener("click", function(event) { saveHighScore(event); });
// saves the score for highscore
saveHighScore = (e) => {
    e.preventDefault();

    let score = {
        score: mostRecentScore,
        name: userResult.value
    };
    highScore.push(score);
    highScore.sort((a, b) => b.score - a.score);
    highScore.splice(3);
// saves highscore to local storage
    localStorage.setItem("highScore", JSON.stringify(highScore));
// turns off game result and turns on main menu
    gameResult.style.display = "none";
    gameBoard.style.display = "flex";
};

showScore = () => {
    gameBoard.style.display = "none";
    leadersBoard.style.display = "flex";
};