// Project: Simple Calculator
// Concept: JavaScript Versions, Basic Syntax using Node.js

// Import the readline module to handle user input in Node.js
const readline = require('readline');

// Create an interface for reading user input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Display a welcome message to the user
console.log("Welcome to Simple Calculator!");

// Ask the user for the first number
rl.question("Enter the first number: ", function (num1) {
    // Convert the first input into a float
    num1 = parseFloat(num1);

    // Ask the user for the second number
    rl.question("Enter the second number: ", function (num2) {
        // Convert the second input into a float
        num2 = parseFloat(num2);

        // Ask the user for the operation
        rl.question("Enter operation (+, -, *, /): ", function (operation) {

            // Initialize a variable to store the result
            let result;

            // Use a switch statement to determine the operation to perform
            switch (operation) {
                case "+":
                    result = num1 + num2; // Perform addition
                    break;
                case "-":
                    result = num1 - num2; // Perform subtraction
                    break;
                case "*":
                    result = num1 * num2; // Perform multiplication
                    break;
                case "/":
                    result = num1 / num2; // Perform division
                    break;
                default:
                    console.log("Invalid operation"); // Handle invalid input
                    rl.close();
                    return; // Exit the function
            }

            // Display the result to the user
            console.log(`Result: ${result}`);
            rl.close(); // Close the readline interface
        });
    });
});

// Explanation:
// 1. We use the `readline` module to handle user input in Node.js.
// 2. `rl.question()` is used to prompt the user and capture input.
// 3. Input is converted to numbers using `parseFloat()`.
// 4. A `switch` statement performs the chosen arithmetic operation based on user input.
// 5. The result is displayed using `console.log()`, and the readline interface is closed with `rl.close()`.
