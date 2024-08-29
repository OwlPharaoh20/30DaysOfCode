//Project : Simple Password Generator
//Concept: Data types - Strings, Numbers

//Import the readline module to handle user input in Node.JS
const readline = require('readline');

//Create an interface for reading the user input from the console

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout

});

//Define a string containing possible characters for the password

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";

//Prompt the user to enter the desired password length
rl.question( "Enter the desired password length:", function(length){
    //Convert input from string to number using parseInt
    let passwordLength = parseInt(length);

    //Initialize an empty string to store the generated password 
    let password = "";

    //Loop to generate password characters randomly
    for (let i = 0; i < passwordLength; i++) {
        //Generate a random index to pick a character from the characters string
        let randomIndex = Math.floor(Math.random() * characters.length);

        //Append the randomly selected character to the password 
        password += characters[randomIndex];
    }

    //Display the generated password 
    console.log(`Generated Password: ${password}`);

    //Close the readline interface 
    rl.close();





});