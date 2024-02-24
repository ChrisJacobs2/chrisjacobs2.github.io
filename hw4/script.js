// Hi Sunny! 

// Span variable
const gameResultMsg = document.getElementById('game-result-msg');

// image variables
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

// button variables
const playAgain = document.getElementById('play-again');
const reset = document.getElementById('reset');

// flag to keep track of whether the computer is thinking
var gameOngoing = false;

var current = null;

// Holds the result of the most recent game. This is either "Victory", "Defeat", or "Tie".
var result = ""; 

//score variables 
var wins = 0;
var losses = 0;
var ties = 0;

// event listener for the play-again button
playAgain.addEventListener('click', () => {
    restoreGameState();
});

// event listener for the reset button
reset.addEventListener('click', () => {
    restoreGameState();

    wins = 0;
    losses = 0;
    ties = 0;

    // span elements for wins, losses, and ties
    document.getElementById('wins').innerHTML = 0;
    document.getElementById('losses').innerHTML = 0;
    document.getElementById('ties').innerHTML = 0;
});


/**
 * This function restores the game state to its initial state, but keeps the score.
 * It is called by the "play again" button and the "reset" button event listeners.
 * @returns {void}
 */
function restoreGameState() {
    // reset the gameOngoing flag
    gameOngoing = false;

    // disable the highlight on the player's choice
    current.classList.remove('highlight');

    // re-enable pointer events
    rock.style.pointerEvents = 'auto';
    paper.style.pointerEvents = 'auto';
    scissors.style.pointerEvents = 'auto';

    // clear the game result message
    gameResultMsg.innerHTML = '';

    // set the computer throw image back to the question mark
    displayComputerChoice('question');
}


// Event listener for each player's choice. Fires when a user clicks an image in the Player Throw section.
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (gameOngoing == false) {    // prevents the player from playing while the computer is 'thinking'

            // keep track of what the player chose. For the "play again" button functionality.
            current = choice;

            // block the if statement until user clicks "play again" or "reset"
            gameOngoing = true;     
            
            // disable pointer events until "play again" or "reset" is clicked
            rock.style.pointerEvents = 'none';
            paper.style.pointerEvents = 'none';
            scissors.style.pointerEvents = 'none';

            // disable the play again and reset buttons for 3 seconds
            playAgain.style.pointerEvents = 'none';
            reset.style.pointerEvents = 'none';
            setTimeout(() => {
                playAgain.style.pointerEvents = 'auto';
                reset.style.pointerEvents = 'auto';
            }, 3000);
            
            // highlight the choice
            choice.classList.add('highlight');

            // play the game. choice.id is either "rock", "paper", or "scissors"
            main(choice.id);            
        }
    });
});


/**
 * This function is called by the image event listeners and run the game.
 * @param {string} playerChoice - the player's choice of "rock", "paper", or "scissors".
 * @returns {void}
 */
function main(playerChoice) {
    // get a string representing the computer's choice
    const cpuChoice = computerChoice();

    // get the result of the game as a string
    result = playGame(playerChoice, cpuChoice);

    // log game to the console
    console.log("computer choice: " + cpuChoice + "\nplayer choice: " + playerChoice + "\nresult: " + result);

    // animate the computer's choice
    computerThinking(cpuChoice);

    // update wins, losses, and ties varaibes, as well
    // as the result and score displays on the webpage
    updateResult(result);
}


/**
 * This function randomly picks a choice for the computer throw.
 * @returns {string} "rock", "paper", or "scissors".
 */
function computerChoice() {
    // rand is an interger from 0 to 2.
    rand = Math.floor(Math.random() * 3);

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
 * This function takes two string parameters, the player's choice and the computer's
 * choice, and returns the result of the game. Invalid choices will return either
 * "Tie!" or "Defeat!", depending on if they are the same.
 * @param {string} playerChoice - the player's choice of rock, paper, or scissors
 * @param {string} computerChoice - the computer's choice of rock, paper, or scissors
 * @returns {string} the result of the game. 'Victory!', 'Defeat!', or 'Tie!'
 */
function playGame(playerChoice, computerChoice) {  
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
 * This function handles the computer "thinking" animation.
 * When it runs, the question mark image will be replaced with a
 * alternating image of rock, paper, scissors, that changes 6 times a second,
 * for three seconds. Then, the image will be replaced with the computer's choice.
 * While the computer is 'thinking', the player's choice will be highlighted. They will
 * also not be able to pick another choice until the computer has made its choice.
 * @param {string} cpuChoice - the computer's choice of "rock", "paper", or "scissors"
 * @returns {void}
 */
function computerThinking(cpuChoice) {
    // Set the pointer to default for the player's choices
    choices.forEach(choice => {
        choice.style.cursor = 'default';
    });

    shuffleAnim(cpuChoice);
    choices.forEach(choice => {
        choice.style.cursor = 'pointer';
    });
    thinking = false;
}


/**
 * This function updates the result of the game on the webpage.
 * It also keeps track of the number of wins, losses, and ties.
 * @param {string} result - the result of the game
 * @returns {void}
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
    // wait 3 seconds then update the result
    setTimeout(() => {
        gameResultMsg.innerHTML = result;

        // get the id 'wins', 'losses', and 'ties' and update their innerHTML
        document.getElementById('wins').innerHTML = wins;
        document.getElementById('losses').innerHTML = losses;
        document.getElementById('ties').innerHTML = ties;
    }, 3000);
}


/**
 * This function is called by computerThinking() to animate
 * the shuffling of the computer throw. It works by unhiding and hiding
 * different images of rock, paper, and scissors in order.
 * @param {string} cpuChoice - the computer's choice of "rock", "paper", or "scissors"
 * @returns {void}
 */
function shuffleAnim(cpuChoice) {
    // I know this line looks cringe but it was way easier to implement it this way
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


/**
 * This function is called by the shuffleAnim() and restoreGameState()
 * functions to display image corresponding to the computer's choice of
 * rock, paper, or scissors.
 * @param {string} cpuChoice - the computer's choice of "rock", "paper", or "scissors"
 * @returns {void}
 */
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
        case 'question':
            question.style.display = 'block';
            break;
    }
}