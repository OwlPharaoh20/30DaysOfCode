// Day 6: Love calculator app 
//Focus: Javascript Arrays, Array Methods, string Manipulation

const readline = require('readline'); //import the readline Module

//Create an interface to read input from the console.

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});


// Function to calculate love percentage based on names
function calculateLovePercentage(name1, name2) {
    // Concatenate names and convert to lowercase
    const combinedNames = (name1 + name2).toLowerCase();

    // Convert combined names string to an array of characters
    const nameArray = combinedNames.split('');

    // Object to store the occurrence of each character
    let occurrences = {};

    // Count occurrences of each character
    nameArray.forEach(function(char) {
        if (!occurrences[char]) {
            occurrences[char] = 0; // Initialize if not present
        }
        occurrences[char]++; // Increment count
    });

    // Calculate sum of occurrences
    let sum = 0;
    for (let key in occurrences) {
        sum += occurrences[key];
    }

    // Calculate love percentage
    let lovePercentage = (sum % 100); // Modulo 100 to keep within 0-99
    return lovePercentage;
}

// Function to handle user input
function handleInput() {
    rl.question("Enter the first person's name: ", function(name1) {
        rl.question("Enter the second person's name: ", function(name2) {
            // Calculate love percentage using the function
            const lovePercentage = calculateLovePercentage(name1, name2);

            // Output the love percentage to the console
            console.log(`The love percentage between ${name1} and ${name2} is: ${lovePercentage}%`);
            rl.close(); // Close the readline interface
        }); // Make sure to close the second question callback here
    }); // Make sure to close the first question callback here
}

//Start the application 
console.log("Welcome to the love calculator App!");
handleInput(); //Initial prompt to the user

