const gameResultMsg = document.getElementById('game-result-msg');

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const choices = [rock, paper, scissors];


// variables for the computer's thinking animation
const question = document.getElementById('question');
const rockAnim = document.getElementById('rock-anim');
const paperAnim = document.getElementById('paper-anim');
const scissorsAnim = document.getElementById('scissors-anim');
const anims = [rockAnim, paperAnim, scissorsAnim];



// flag to keep track of whether the computer is thinking
var gameOngoing = false;

var result; // the result of the game. This is either "Victory", "Defeat", or "Tie".
var wins = 0;
var losses = 0;
var ties = 0;

// Event listener for each player's choice
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (gameOngoing == false) {    // prevents the player from playing while the computer is 'thinking'
            gameOngoing = true;        
            // play the game
            main(choice.id);
            
            // highlight the choice
            choice.classList.add('highlight');
            // unhighlight it after 3 seconds
            setTimeout(() => {
                choice.classList.remove('highlight');
                gameOngoing = false;
            }, 3000); // 3 seconds
        }
    });
});

/**
 * This function runs the game given an element id in the form of a string
 * @param {string} playerChoice - the player's choice of rock, paper, or scissors
 */
function main(playerChoice) {
    const cpuChoice = computerChoice();
    result = playGame(playerChoice, cpuChoice);
    // animate the computer's choice
    computerThinking(cpuChoice);
        // TODO: Make the box I clicked highlighted until the computer makes a choice
    updateResult(result);
    
}

/**
 * This function takes two string parameters, the player's choice and the computer's
 * choice, and returns the result of the game. Invalid choices will return either
 * "Tie!" or "Defeat!", depending on if they are the same.
 * @returns the result of the game as a string, 'Victory!', 'Defeat!', or 'Tie!'
 */
function playGame(playerChoice, computerChoice) {
    console.log(playerChoice, computerChoice);
    // 3 possibilities for a tie
    if (playerChoice == computerChoice) {
        return 'Tie!';
    }
    // 3 possibilities where the player wins
    if ((playerChoice == 'rock') && (computerChoice == 'scissors') ||
        (playerChoice == 'scissors') && (computerChoice == 'paper') ||
        (playerChoice == 'paper') && (computerChoice == 'rock')) {
        return 'Victory!';
    // 3 possibilities where the player loses. 
        } else {
            return 'Defeat!';
        }
}

/**
 * This function generates a number from 0 to 2, and returns the computer's choice as 
 * a string reflecting that number. 0 is rock, 1 is paper, and 2 is scissors.
 * @returns the computer's choice of rock, paper, or scissors as a string
 */
function computerChoice() {
    // rand is a real number from 0 to 2.
    var rand = Math.random() * 3;

    rand = Math.floor(rand);
    switch (rand) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}

/**
 * This function updates the result of the game on the webpage.
 * It also keeps track of the number of wins, losses, and ties.
 * @param {string} result - the result of the game
 */
function updateResult(result) {
    switch (result) {
        case 'Victory!':
            wins++;
            break;
        case 'Defeat!':
            losses++;
            break;
        case 'Tie!':
            ties++;
            break;
    }
    gameResultMsg.innerHTML = result;
    // TODO: Add code to display the number of wins, losses, and ties
    // TODO: Add a reset button
}






/**
 * This function handles the computer "thinking" animation.
 * When it runs, the question mark image will be replaced with a
 * alternating image of rock, paper, scissors, that changes 6 times a second,
 * for three seconds. Then, the image will be replaced with the computer's choice.
 * While the computer is 'thinking', the player's choice will be highlighted. They will
 * also not be able to pick another choice until the computer has made its choice.
 * @param {string} cpuChoice - the computer's choice of "rock", "paper", or "scissors"
 */
function computerThinking(cpuChoice) {
    // Set the pointer to default for the player's choices
    choices.forEach(choice => {
        choice.style.cursor = 'default';
    });

    shuffleAnim(cpuChoice);
            // TODO: Make it so the play-again button needs to be hit to reset the game
    choices.forEach(choice => {
        choice.style.cursor = 'pointer';
    });
    thinking = false;
}

/**
 * This function is called by computerThinking() to animate
 * the shuffling of the computer throw. It works by unhiding and hiding
 * different images of rock, paper, and scissors in order.
 */
function shuffleAnim(cpuChoice) {
    // I know this line looks cringe but its more readable and was easier to code
    var arr = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2];

    // hide the question mark in 1/6 of a second from now
    setTimeout(() => {
        question.style.display = 'none';
    }, 167);

    // Interval with 1/6 second delay.
    var x = 0;
    var clock = setInterval(function() {
        
        // Hide the previously shown image
        if (x > 0) {
            anims[arr[x - 1]].style.display = 'none';
        }

        // Show the next image
        anims[arr[x]].style.display = 'block';
        
        x++;
        if (x >= 18) {
            clearInterval(clock); // stop the interval
            displayComputerChoice(cpuChoice);
        }
    }, 167); // 167 ms is 1/6 of a second
    
}

function displayComputerChoice(cpuChoice) {
    // hide all anims
    rockAnim.style.display = 'none';
    paperAnim.style.display = 'none';
    scissorsAnim.style.display = 'none';
    switch (cpuChoice) {
        case 'rock':
            rockAnim.style.display = 'block';
            break;
        case 'paper':
            paperAnim.style.display = 'block';
            break;
        case 'scissors':
            scissorsAnim.style.display = 'block';
            break;
    }
}