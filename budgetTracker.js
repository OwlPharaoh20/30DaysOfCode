//Day 13

/*
Personal Budget Tracker App
Focus JavaScript Concepts:

    Array Manipulation (map, filter, reduce)
    Modular Functions
    Conditional Statements (if/else)
    Object Handling
    String Interpolation
*/

/*
Features of this app:
- Add income and expenses.
- View a breakdown of all transactions.
- Calculate the total balance.
- Filter transactions by type (income or expense).
- Clear all transactions.
*/

// Import yargs for CLI interactions
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Store all transactions
let transactions = [];

// Function to add a new transaction (INCOME OR EXPENSE)
function addTransaction(type, description, amount) {
    const transaction = {
        type,
        description,
        amount: parseFloat(amount),
    };
    transactions.push(transaction);
    console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} added: ${description} - $${amount}`);
}

// Function to display all transactions
function viewTransactions() {
    if (transactions.length === 0) {
        console.log("No transactions recorded.");
    } else {
        transactions.forEach((transaction, index) => {
            console.log(`${index + 1}. ${transaction.type.toUpperCase()} : ${transaction.description} - $${transaction.amount.toFixed(2)}`);
        });
    }
}

// Function to calculate total balance
function calculateBalance() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;
    console.log(`Total Income: $${totalIncome.toFixed(2)},  Total Expense: $${totalExpense.toFixed(2)}, Balance: $${balance.toFixed(2)}`);
}

// Function to filter transactions by type
function filterTransactions(type) {
    const filtered = transactions.filter(t => t.type === type);
    if (filtered.length === 0) {
        console.log(`No ${type} transactions found.`);
    } else {
        filtered.forEach((t, index) => {
            console.log(`${index + 1}. ${t.type.toUpperCase()}: ${t.description} - $${t.amount.toFixed(2)}`);
        });
    }
}

// Function to clear all transactions
function clearTransactions() {
    transactions = [];
    console.log("All transactions cleared.");
}

// Setup yargs commands
yargs(hideBin(process.argv))
    .command('add [type] [description] [amount]', 'Add a new transaction', (yargs) => {
        yargs
            .positional('type', { describe: 'Type of transaction (income/expense)', type: 'string' })
            .positional('description', { describe: 'Description of the transaction', type: 'string' })
            .positional('amount', { describe: 'Amount of the transaction', type: 'number' });
    }, (argv) => {
        if (argv.type && argv.description && argv.amount) {
            addTransaction(argv.type, argv.description, argv.amount);
        } else {
            console.log("Please provide all required fields (type, description, amount).");
        }
    })
    .command('view', 'View all transactions', () => {
        viewTransactions();
    })
    .command('balance', 'Calculate total balance', () => {
        calculateBalance();
    })
    .command('filter [type]', 'Filter transactions by type', (yargs) => {
        yargs.positional('type', { describe: 'Type of transaction to filter by (income/expense)', type: 'string' });
    }, (argv) => {
        if (argv.type) {
            filterTransactions(argv.type);
        } else {
            console.log("Please specify a transaction type (income/expense).");
        }
    })
    .command('clear', 'Clear all transactions', () => {
        clearTransactions();
    })
    .help()
    .argv;

