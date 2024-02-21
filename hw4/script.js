const gameResultMsg = document.getElementById('game-result-msg');

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const choices = [rock, paper, scissors];


// flag to keep track of whether the computer is thinking
var gameOngoing = false;

var result;
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
 * This function takes two string parameters, the player's choice and the computer's
 * choice, and returns the result of the game. Invalid choices will return either
 * "Tie!" or "Defeat!", depending on if they are the same.
 * @returns the result of the game as a string, 'Victory!', 'Defeat!', or 'Tie!'
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
 * This function generates a number from 1 to 3, and returns the computer's choice
 * reflecting that number. 0/1 is rock, 2 is paper, and 3 is scissors.
 * @returns the computer's choice of rock, paper, or scissors as a string
 */
function computerChoice() {
    // rand is a real number from 0 to 3, not including 3
    var rand = Math.random() * 3;
    // rand is now an interger from 1 to 3. Pretty low (but nonzero) chance of it being 0.
    rand = Math.ceil(rand);
    if (rand == 1 || rand == 0) {
        return 'rock';
    } else if (rand == 2) {
        return 'paper';
    } else {    //rand == 3
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
 * This function runs the game given an element id in the form of a string
 * @param {string} playerChoice - the player's choice of rock, paper, or scissors
 */
function main(playerChoice) {
    const cpuChoice = computerChoice();
    result = playGame(playerChoice, cpuChoice);
    // TODO: run an animation to show the computer thinking
    computerThinking();
        // TODO: Make the box I clicked highlighted until the computer makes a choice
    updateResult(result);
    // TODO: Run an animation to show the result of the game
}





/**
 * This function handles the computer "thinking" animation.
 * When it runs, the question mark image will be replaced with a
 * alternating image of rock, paper, scissors, that changes 6 times a second,
 * for three seconds. Then, the image will be replaced with the computer's choice.
 * While the computer is 'thinking', the player's choice will be highlighted. They will
 * also not be able to pick another choice until the computer has made its choice.
 */
function computerThinking() {
    // Set the pointer to default for the player's choices
    choices.forEach(choice => {
        choice.style.cursor = 'default';
    });
    // TODO: Make it so I can't click the images while the computer is thinking    
            // TODO: Use loop to change the image 3 times a half-second cycle, looping 6 times
            // TODO: display the computer's choice
            // TODO: Make it so the play-again button needs to be hit to reset the game
    choices.forEach(choice => {
        choice.style.cursor = 'pointer';
    });
    thinking = false;
}