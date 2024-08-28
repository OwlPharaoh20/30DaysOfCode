//Project : Currency Converter 
//Concept : Variables, COnstants, Basic Arithmetics.

//Import the readline module to handle user input in node js

const readline = require('readline');

//create an interface for reading user input from the console

const rl =  readline.createInterface({
    input: process.stdin,
    output: process.stdout

});

//Declare a constant for the exchange rate from USD To EUR
const exchangeRate = 0.85; // Assuming 1 USD is 0.85 EUR

//Display a welcome message to the user 
console.log ("Welcome to currency Converter");

//Prompt the user to enter an amount in USD 
rl.question("Enter amount in USD: ", function(usd) {
    //`usd` is taken as input from the user and store in a variable

    //Convert the input from string to number using parseFloat
    let amountInUSD = parseFloat(usd);

    //Calculate the equivalent amount in EUR
    let amountInEUR = amountInUSD * exchangeRate;

    //Display the result using template literals
    console.log(`$${amountInUSD} USD is equal to E${amountInEUR.toFixed(2)} EUR. `);

    //Close the readline interface
    rl.close();

    

});