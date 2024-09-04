/*
Project: Simple Shopping List Manager

Focus: Arrays and common array methods (push, splice, map, filter, find).
*/

// Import the inquirer module for creating a command-line interface
import inquirer from 'inquirer';

//Initialize an empty array to hold the shopping list items
let shoppingList = [];

//Function to add an item to the shopping list 
function addItem() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'itemName',
            message: 'Enter the name of the item:'
        }
    ]).then((answers) => {
        shoppingList.push(answers.itemName);
        console.log(`${answers.itemName} has been added to the list.`);
        mainMenu(); // Go back to the main menu after adding an item
    });
}

//Function to remove an item by index from the shopping list
function removeItem() {
    if (shoppingList.length === 0) {
        console.log("Your shopping list is empty. Nothing to remove.");
        mainMenu(); // Go back to the main menu since there's nothing to remove
        return;
    }

    inquirer.prompt([
        {
            type: 'input',
            name: 'itemNumber',
            message: 'Enter the number of the item you want to remove:'
        }
    ]).then((answers) => {
        const index = parseInt(answers.itemNumber) - 1;
        if (index >= 0 && index < shoppingList.length) {
            const removedItem = shoppingList.splice(index, 1);
            console.log(`${removedItem} has been removed from the list.`);
        } else {
            console.log("Invalid item number.");
        }
        mainMenu(); // Go back to the main menu after removing an item
    });
}

//Function to display all items in the shopping list
function displayItems () {
    //Check if the shopping List is empty
    if (shoppingList.length === 0) {
        console.log("Your shopping list is empty");
    } else { 
        console.log("Your shopping list");
        shoppingList.map((item, index) => {
            console.log(`${index + 1}. ${item}`); //Array method 'map' is used to iterate over and display each item
        });
    }
    mainMenu(); // Go back to the main menu after displaying items

}


//Function to filter items in the shopping list by a keyword
function filterItems(keyword) {
    const filteredList = shoppingList.filter(item => item.includes(keyword)); 
    //Array method 'filter' returns a new array of items that include the keyword
    if (filteredList.length === 0) {
        console.log(`No items found with the keyword "${Keyword}".`);
    } else  {
        console.log("Filtered Shopping List:");
        filteredList.map((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }

}

//Main Menu to interact with the shopping list manager 
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add Item', 'Display Items', 'Remove Item', 'Exit']
        }
    ]).then((answers) => {
        switch (answers.action) {
            case 'Add Item':
                addItem();
                break;
            case 'Display Items':
                displayItems();
                break;
            case 'Remove Item':
                removeItem();
                break;
            case 'Exit':
                console.log("Goodbye!");
                break;
            default:
                console.log("Invalid choice, please try again.");
                mainMenu();
        }
    });
}
//Start the application by calling the main menu function
mainMenu();

