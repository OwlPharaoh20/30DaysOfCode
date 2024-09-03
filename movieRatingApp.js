// Day 8: JavaScript Functions and Methods
// Project: Movie Rating App

// Import the inquirer module for creating a command-line interface
import inquirer from 'inquirer';
// Array to store movies and their ratings
const movies = [];

// Function to add a movie
function addMovie() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the movie title:'
        },
        {
            type: 'input',
            name: 'rating',
            message: 'Enter your rating (0-5):',
            validate: function (value) {
                const valid = !isNaN(value) && value >= 0 && value <= 5;
                return valid || 'Please enter a number between 0 and 5.';
            }
        }
    ]).then(answers => {
        const title = answers.title.trim(); // Use trim() to remove extra spaces
        const rating = parseFloat(answers.rating);

        movies.push({ title, rating }); // Add movie to the list
        console.log(`Added "${title}" with a rating of ${rating}.`);
        mainMenu(); // Go back to the main menu
    }).catch(error => {
        console.error("Error occurred during movie addition:", error);
        mainMenu(); // Return to the main menu if there's an error
    });
}

// Function to display all movies
function displayMovies() {
    if (movies.length === 0) {
        console.log("No movies in the list.");
    } else {
        movies.forEach((movie, index) => {
            console.log(`${index + 1}. ${movie.title} - Rating: ${movie.rating}`);
        });
    }
    mainMenu(); // Go back to the main menu
}

// Function to calculate the average rating
function calculateAverageRating() {
    if (movies.length === 0) {
        console.log("No movies in the list to calculate average.");
    } else {
        const totalRating = movies.reduce((sum, movie) => sum + movie.rating, 0);
        const averageRating = totalRating / movies.length;
        console.log(`The average rating is ${averageRating.toFixed(2)}.`);
    }
    mainMenu(); // Go back to the main menu
}

// Main menu function
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add Movie', 'Display Movies', 'Calculate Average Rating', 'Exit']
        }
    ]).then(answer => {
        switch (answer.action) {
            case 'Add Movie':
                addMovie(); // Add a movie to the list
                break;
            case 'Display Movies':
                displayMovies(); // Show all movies
                break;
            case 'Calculate Average Rating':
                calculateAverageRating(); // Show average rating
                break;
            case 'Exit':
                console.log("Goodbye!");
                process.exit(); // Close the process
                break;
        }
    }).catch(error => {
        console.error("Error occurred in the main menu:", error);
        mainMenu(); // Return to the main menu if there's an error
    });
}

// Start the app
mainMenu();
