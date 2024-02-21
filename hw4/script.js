const rockImage = document.getElementById("rock");
const paperImage = document.getElementById("paper");
const scissorsImage = document.getElementById("scissors");

/**
 * This function takes two string parameters, the player's choice and the computer's
 * choice, and returns the result of the game. Invalid choices will return either
 * "Tie!" or "Defeat!", depending on if they are the same.
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
    } else {
        return 'scissors';
    }
}