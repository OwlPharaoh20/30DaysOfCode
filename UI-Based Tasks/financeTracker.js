/*
Javascript 30 days of code 
Day 28
Project details: Finance Tracker
Javascript concept : Event Handling, File Storage, DOM manipulation, Array Manipulation
  
Project Features:

    Add Income/Expense: Input fields for adding an income or expense.
    Category Selection: Categorize each transaction (e.g., Food, Transport, Bills, etc.).
    Transaction List: Display a list of all added transactions.
    Total Calculation: Calculate the total balance, total income, and total expense.
    LocalStorage: Save and load the transactions from localStorage, so the data persists.

*/

// DOM Elements
const transactionForm = document.getElementById('transactionForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const transactionList = document.getElementById('transactionList');
const totalBalanceDisplay = document.getElementById('totalBalance');
const totalIncomeDisplay = document.getElementById('totalIncome');
const totalExpenseDisplay = document.getElementById('totalExpense');
const clearAllBtn = document.getElementById('clear-all-btn');  // Added clear all button reference

// Array to store transactions
let transactions = [];

// Load transactions from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = savedTransactions;
    updateUI();
});

// Function to handle form submission
transactionForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form values
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const category = categoryInput.value;

    if (description === '' || isNaN(amount) || category === '') {
        alert('Please fill in all fields');
        return;
    }

    // Create a new transaction object
    const transaction = {
        id: Date.now(),
        description,
        amount,
        category
    };

    // Add transaction to the array
    transactions.push(transaction);

    // Update UI and localStorage
    updateUI();
    saveToLocalStorage();

    // Reset the form
    descriptionInput.value = '';
    amountInput.value = '';
    categoryInput.value = 'income';
});

// Function to update the UI
function updateUI() {
    // Clear the current transaction list
    transactionList.innerHTML = '';

    let totalIncome = 0;
    let totalExpense = 0;

    // Loop through transactions and display them
    transactions.forEach((transaction) => {
        // Create list item for each transaction
        const li = document.createElement('li');
        li.classList.add('mb-2', 'p-2', 'rounded', 'flex', 'justify-between', 'border');
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span class="${transaction.category === 'income' ? 'text-green-500' : 'text-red-500'}">
                ${transaction.category === 'income' ? '+' : '-'} $${transaction.amount.toFixed(2)}
            </span>
        `;
        transactionList.appendChild(li);

        // Calculate totals
        if (transaction.category === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    // Update the total balance, income, and expense
    const totalBalance = totalIncome - totalExpense;
    totalBalanceDisplay.textContent = totalBalance.toFixed(2);
    totalIncomeDisplay.textContent = totalIncome.toFixed(2);
    totalExpenseDisplay.textContent = totalExpense.toFixed(2);
}

// Save transactions to localStorage
function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Event listener for clearing all transactions
clearAllBtn.addEventListener('click', () => {
    // Clear the transactions array
    transactions = [];

    // Update UI and localStorage
    updateUI();
    saveToLocalStorage();
});
