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
        correct: 1
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

    {
        question: "How many engines does the X-Wing Fighter have?",
        answer1: "2",
        answer2: "3",
        answer3: "4",
        correct: 3
    }
]
// Declaring all variables to get elements from html file
const gameBoard = document.getElementById("game-board");
const playGame = document.getElementById("play-game");
const highscore = document.getElementById("score-on");
const rules = document.getElementById("rules");
const gameWindow = document.getElementById("game-window");
const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer"));
const gameResult = document.getElementById("game-result");
const gameScore = document.getElementById("game-score");
const mainMenu = document.getElementById("main-menu");

// Hidding unecessary content from viewing and loading Dom
window.addEventListener('DOMContentLoaded', () => {
    rules.style.display = "none";
    gameWindow.style.display = "none";
    highscore.style.display = "none";
    gameResult.style.display = "none";
    // listenning to clicks on Play button and Highscore
    playGame.addEventListener("click", startGame);
    highscore.addEventListener("click", showScore);
})

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// // //Starting the rules before game

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questionContainer];
    getNewQuestion ();
// hides main game board and shows rules
        rules.style.display = "flex";
    gameBoard.style.display = "none";
// hides rules and shows game window for questions with 5 seconds timeout on rules
    setTimeout(function () {
        rules.style.display = "none"
        gameWindow.style.display = "flex";
    }, 5000);
};
// inserts questions in html #question randomly generated from array
getNewQuestion = () => {
        if(availableQuestions.lenght == 0 || questionCounter >= MAX_QUESTIONS) {

        }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
// inserts answers to buttons in html
    answers.forEach((answer) => {
        number = answer.dataset["number"];
        answer.innerText = currentQuestion["answer" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
// gets new question after selecting answer
answers.forEach(answer => {
    answer.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedAnswer = e.target;
        const selectedButton = selectedAnswer.dataset["number"];
        console.log(selectedButton == currentQuestion.correct);
        getNewQuestion();
    });
});