// Questions and answers
let questionContainer = [{
        question: "What is the name of Yoda's home?",
        answer: {
            a: "Naboo",
            b: "Kashyyk",
            c: "Dagobah"
        },
        correct: "c"
    },

    {
        question: "C-3P0 is fluent in how many languages?",
        answer: {
            a: "3",
            b: "2 milion",
            c: "Over 60 million languages"
        },
        correct: "c"
    },

    {
        question: "Who built C-3P0?",
        answer: {
            a: "Anakin Skywalker",
            b: "Boba Fett",
            c: "Princes Leia"
        },
        correct: "a"
    },

    {
        question: "How old is Yoda when he dies?",
        answer: {
            a: "69",
            b: "900",
            c: "232"
        },
        correct: "b"
    },

    {
        question: "Who is the young Jedi Knight who becomes Darth Vader?",
        answer: {
            a: "Luke Skywalker",
            b: "Anakin Skywalker",
            c: "Obi Wan Kenobi"
        },
        correct: "b"
    },

    {
        question: "What is the ‘Rule of 2’?",
        answer: {
            a: "There can only be 2 Sith Lords at one time.",
            b: "Eye for an eye",
            c: "Brunch and dinner"
        },
        correct: "a"
    },

    {
        question: "Who stars as the famous Han Solo in the original Star Wars films?",
        answer: {
            a: "Brad Pitt",
            b: "Harrison Ford",
            c: "Daniel Radcliffe"
        },
        correct: "b"
    },

    {
        question: "Who is Luke and Leia’s mother?",
        answer: {
            a: "Padmé Amidala",
            b: "Ahsoka Tano",
            c: "Jyn Erso"
        },
        correct: "a"
    },

    {
        question: " What age did Padmé Amidala become a queen?",
        answer: {
            a: "9",
            b: "14",
            c: "18"
        },
        correct: "b"
    },

    {
        question: "Who tried to save Han Solo by disguising and infiltrating Jabba’s palace?",
        answer: {
            a: "Master Yoda",
            b: "Princess Leia",
            c: "Chewbacca"
        },
        correct: "b"
    },

    {
        question:  "How many engines does the X-Wing Fighter have?",
        answer: {
            a: "2",
            b: "3",
            c: "4"
        },
        correct: "c"
    }
]
// Declaring all variables to get elements from html file
const gameBoard = document.getElementById("game-board");
const playGame = document.getElementById("play-game");
const highscore = document.getElementById("score-on");
const rules = document.getElementById("rules");
const gameWindow = document.getElementById("game-window");
const questions = document.getElementById("question");
const firstAnswer = document.getElementById("a");
const secondAnswer = document.getElementById("b");
const thirdAnswer = document.getElementById("c");
const gameResult = document.getElementById("game-result");
const gameScore = document.getElementById("game-score");
const mainMenu = document.getElementById("main-menu");

// Hidding unecessary content from viewing and loading Dom
window.addEventListener('DOMContentLoaded', () => {
    rules.style.display = "none";
    gameWindow.style.display = "none";
    highscore.style.display = "none";
    gameResult.style.display = "none";    
    playGame.addEventListener("click", startGame);
    highscore.addEventListener("click", showScore);
})

// Starting the rules before game
function startGameRules () {
    rules.style.display = "block";
    gameBoard.style.display = "none";

    setTimeout (function() {
        rules.style.display = "none"
        gameWindow.style.display = "flex";
    }, 5000);
}

// Start the game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questionContainer];
    getQuestion();
}



