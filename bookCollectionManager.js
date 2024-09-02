// Import the inquirer module for creating a command-line interface
import inquirer from 'inquirer';


// Object constructor function for creating Book objects
function Book(title, author) {
    this.title = title;
    this.author = author;
    this.getDetails = function() {
        return `${this.title} by ${this.author}`; // Object method to get book details
    };
}

// Array to hold book collection
const bookCollection = [];

// Function to add a book to the collection
function addBook() {
    inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the book title:' },
        { type: 'input', name: 'author', message: 'Enter the book author:' }
    ]).then(answers => {
        const newBook = new Book(answers.title, answers.author); // Creating a new Book object
        bookCollection.push(newBook); // Adding the new book to the collection array
        console.log('Book added successfully!');
        mainMenu(); // Return to main menu
    });
}

// Function to view all books in the collection
function viewBooks() {
    console.log("\nYour Book Collection:");
    bookCollection.forEach(book => {
        console.log(book.getDetails()); // Using object method to display book details
    });
    mainMenu(); // Return to main menu
}

// Main menu function to choose options
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add Book', 'View Books', 'Exit']
        }
    ]).then(answer => {
        switch (answer.action) {
            case 'Add Book':
                addBook(); // Option to add a book
                break;
            case 'View Books':
                viewBooks(); // Option to view books
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit(); // Exit the program
                break;
        }
    });
}

// Welcome message and start of the application
console.log("Welcome to the Book Collection Manager!");
mainMenu(); // Initialize the main menu
