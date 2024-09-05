//Day 10 : Number Guessing Game 
// Focus: Loops, Conditional statements, Random Number Generation.

import inquirer from 'inquirer';

//Function to start the Game
function startGame() {
    console.log("Welcome to the Number Guessing game!");

    const randomNumber = Math.floor(Math.random() * 100) + 1; //Random Number between 1 and 100
    let attemptsLeft = 7; //Total Number of attempts allowed

    //Function to prompt user for a guess
    function promptGuess() {
        if(attemptsLeft > 0) {
            inquirer.prompt([
                {
                    type: "input",
                    name: "guess",
                    message : `You have ${attemptsLeft} attempts Left. Enter Your Guess (1-100):`,
                    validate : function(value) {
                        const valid = !isNaN(parseInt(value)) && parseInt(value) >= 1 && parseInt(value) <= 100;
                        return valid || "Please enter a valid number between 1 and 100.";   

                    }
                }
            ]).then(answer => {
                const userGuess = parseInt(answer.guess);
                attemptsLeft--;

                //Conditional statements to check the user's guess
                if(userGuess === randomNumber){
                    console.log(`Congratulations! You guessed the correct number: ${randomNumber}`);
                    playAgain(); //Ask if the user wants to play again
                } else if ( userGuess > randomNumber){
                    console.log("Too High!");
                    promptGuess(); //Recursive Prompt to call for another guess
                } else {
                    console.log("To Low!");
                    promptGuess(); //Recursive call to prompt for another guess
                }
            }).catch(error => {
                console.error("An error occurred:", error);
                promptGuess(); //Retry if there's an error
            });
        } else {
            console.log(`Sorry, You've run out of attempts. The correct number was ${randomNumber}.`);
            playAgain(); //Ask if the user wants to play again
        }

    }

    //Function to ask the user if they want to play again
    function playAgain() {
        inquirer.prompt([
            {
                type: "confirm",
                name: "again",
                message: "Do you want to play again?",
                default: false
            }
        ]).then(answer => {
            if(answer.again) {
                startGame(); //Restart the game
            } else {
                console.log("Thank You for playing! Goodbye!");
            } 
        }).catch(error => {
            console.error("An error occurred:", error);
        });
    }

    promptGuess(); //Start the guessing game

}

//Start the game when the script runs
startGame();