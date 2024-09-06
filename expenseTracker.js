/*
Day 11: JavaScript Loops (for, while, do...while)
Project: Expense Tracker
Focus: Understanding and applying different types of loops to iterate over data, 
handle user input, and manage expenses.
*/

//Import the inquirer module for CLI interface 
import inquirer from 'inquirer';

// Array to store the list of expenses
let expenses = [];

// Function to add a new expense
function addExpense() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'description',
            message: 'Enter the description of the expense:',
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount of the expense:',
            validate: function (value) {
                let valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number
        }
    ]).then(answers => {
        const { description, amount } = answers;
        expenses.push({ description, amount });
        console.log(`${description} added with an amount of $${amount}`);
        mainMenu(); // Go back to the main menu after adding an expense
    });
}

// Function to display all expenses
function displayExpenses() {
    console.log('Your Expenses:');
    expenses.forEach((expense, index) => {
        console.log(`${index + 1}. ${expense.description}: $${expense.amount}`);
    });
    mainMenu(); // Go back to the main menu after displaying expenses
}

// Function to calculate the total of all expenses
// Corrected Feature: Calculate Total Expenses
function calculateTotal() {
    if (expenses.length === 0) {
        console.log("No expenses to calculate.");
        return mainMenu(); // Go back to the main menu if no expenses exist
    }

    // Corrected: Summing the expenses
    const total = expenses.reduce((accumulator, expense) => accumulator + parseFloat(expense.amount), 0);

    // Format the total to include commas and two decimal places (e.g., 1,234.56)
    const formattedTotal = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    console.log(`Total Expenses: ${formattedTotal}`);
    mainMenu(); // Go back to the main menu after displaying total
}


// New Feature: Edit Expense
function editExpense() {
    if (expenses.length === 0) {
        console.log("No expenses to edit.");
        return mainMenu(); // Go back to the main menu if no expenses exist
    }

    // Ask the user which expense they want to edit
    inquirer.prompt([
        {
            type: 'list',
            name: 'expenseIndex',
            message: 'Select an expense to edit:',
            choices: expenses.map((expense, index) => `${index + 1}. ${expense.description}: $${expense.amount}`)
        }
    ]).then(answer => {
        const expenseIndex = parseInt(answer.expenseIndex.split('.')[0]) - 1; // Extract the index from the choice
        inquirer.prompt([
            {
                type: 'input',
                name: 'newDescription',
                message: 'Enter the new description:',
                default: expenses[expenseIndex].description
            },
            {
                type: 'input',
                name: 'newAmount',
                message: 'Enter the new amount:',
                validate: function (value) {
                    let valid = !isNaN(parseFloat(value));
                    return valid || 'Please enter a number';
                },
                filter: Number,
                default: expenses[expenseIndex].amount
            }
        ]).then(editedExpense => {
            expenses[expenseIndex].description = editedExpense.newDescription;
            expenses[expenseIndex].amount = editedExpense.newAmount;
            console.log(`Expense updated: ${editedExpense.newDescription} - $${editedExpense.newAmount}`);
            mainMenu(); // Go back to the main menu after editing the expense
        });
    });
}

// Main menu to select options
// Adjust the choices in the mainMenu function
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add expense', 'Display Expenses', 'Edit Expense', 'Delete Expense', 'Calculate Total', 'Exit']
        }
    ]).then(answer => {
        switch (answer.action) {
            case 'Add expense':
                addExpense();
                break;
            case 'Display Expenses':
                displayExpenses();
                break;
            case 'Edit Expense':
                editExpense();
                break;
            case 'Delete Expense': // Call the deleteExpense function
                deleteExpense();
                break;
            case 'Calculate Total':
                calculateTotal();
                break;
            case 'Exit':
                console.log("Goodbye!");
                process.exit();
        }
    });
}

//New Feature: Delete Expense
function deleteExpense() {
    if (expenses.length === 0) {
        console.log("No expenses to delete.");
        return mainMenu(); //Go back to the main menu if no expenses exist
    }

    //Ask the user which expense they want to delete  
    inquirer.prompt([
        {
            type: 'List',
            name: 'expenseIndex',
            message: 'Select an expense to delete:',
            choices: expenses.map((expense, index) => `${index + 1}. ${expense.description}: $${expense.amount}`)
        }
    ]).then(answer => {
        const expenseIndex = parseInt(answer.expenseIndex.split('.')[0]) - 1; //Extract the index from the choice
        const deletedExpense = expenses.splice(expenseIndex, 1); //Remove the selected expense
        console.log(`Deleted expense: ${deletedExpense[0].description} - $${deletedExpense[0].amount}`);
        mainMenu(); //Go back to the main menu after deletion
    })
}



// Start the app by calling the mainMenu function
mainMenu();
