/*
Day 11: JavaScript Loops (for, while, do...while)
Project: Expense Tracker
Focus: Understanding and applying different types of loops to iterate over data, 
handle user input, and manage expenses.
*/

//Import the inquirer module for CLI interface 
import inquirer from 'inquirer';

//Initialize an empty array to store expenses 
let expenses = [ ];

//Function to display the main menu
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices : ['Add expense', 'Daily Expenses', 'Calculate Total', 'Exit'],
        }
    ]).then((answer) => {
        //Use if-else statements to handle the user's choice
        if(answer.action === 'Add expense') {
            addExpense();
        } else if ( answer.action === 'Daily Expenses') {
            dailyExpenses();
        } else if (answer.action === 'Calculate total') {
            calculateTotal();
        } else {
            console.log('GoodBye!');
            process.exit();
        }

    });
} 

//Function to add an expense 
function addExpense() {
    //Let's build the CLI user input form.
    inquirer.prompt([
        {
            type: 'input',
            name: 'description',
            message: 'Enter the description of the expense:',
        },
        {
            type: 'number',
            name: 'amount',
            message: 'Enter the amount of the expense:',
        },
    ]).then((answers) => {
        //Add the expense to the array
        expenses.push({description: answers.description, amount: answers.amount});

        //Go back to the main menu
        console.log(`${answers.description} added with an amount of $${answers.amount}`);
        mainMenu(); //Go back to the main menu after adding an expense
    });
}

//Function to display all expenses

function displayExpenses() {
    if (expenses.length === 0) {
        console.log('No expenses to display.');
    } else {
        console.log('\nYour Expenses:');

        //Loop through the expenses array using a for loop
        for ( let i = 0; i < expenses.length; i++) {
            console.log(`${i + 1}. ${expenses[i].description} - $${expenses[i].amount}`);

        }
    }
    mainMenu(); //Go Back the main menu after displaying expense
}

//Function to calculate the total expenses
function calculateTotal() {
    let total = 0;

    //Use a while loop to calculate the total.
    let i = 0; 
    while (i < expenses.length) {
        total += expenses[i].amount;
        i++;
    }

    console.log(`\nThe total amount spent is: $${total}\n`);

    mainMenu(); //Go back to the main menu after calculating total

}

//Start the app by calling the main menu
mainMenu();