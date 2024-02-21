const choices = ['rock', 'paper', 'scissors'];

var result;
var wins;
var losses;
var ties;

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
    const rand = Math.random() * 3;
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
    // TODO: Make it so that the result is displayed on the webpage
}

/**
 * This function runs the game given an element id in the form of a string
 */
function main(playerChoice) {
    const cpuChoice = computerChoice(); 
    result = playGame(playerChoice, cpuChoice);
    updateResult(result);
}


// loop over the array choices, and add an event listener to each element
// that has an id that is in the array
choices.forEach(choice => {
    document.getElementById(choice).addEventListener('click', function() {
        main(choice);
    });
});