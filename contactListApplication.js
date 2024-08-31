//Day 5 of 30 days of code 
//Focus : Functions , Parameters , Return Values.

/*
Step by step guides to the application.
Define a function to add a new contact.
Define a function to display all contacts.
Define a function to search for a contact by name.
*/

//Import readline module to get user input via cli 

const readline = require('readline'); 

//Create an interface to read input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Array to store contacts 
let contacts = [ ];

//Function to add a contact 

function addContact (name, phoneNumber) {
    //Create a contact object with name and phone number 
    let contact = { 
        name : name,
        phoneNumber : phoneNumber
    };

    //Add contact to the contacts array
    contacts.push(contact);
    console.log("Contact added successfully.");
    handleInput(); // Re-prompt for next action
};


//Function to display all contacts
function displayContacts( ) {
    console.log("Contact List:");
    
    //check if the contacts array is empty
    if ( contacts.length === 0 ) {
        console.log("No contacts found.");
    } else {
        //Loop through each contact and display details
        contacts.forEach(function(contact, index) {
            console.log(`${index + 1}. Name: ${contact.name}, Phone Number: ${contact.phoneNumber}`);
        })
    }
    handleInput(); //Re-prompt the user for next action.

}

//Function to search for a contact by name
function searchContact(name) {
    //Filter Contacts that match the search name 
    let foundContacts = contacts.filter(function(contact) {
    return contact.name.toLowerCase() === name.toLowerCase();
    });

    //Check if any contacts were found
    if(foundContacts.length > 0) {
        console.log("Search Results:");
        foundContacts.forEach(function(contact) {
                console.log(`Name: ${contact.name}, Phone Number: ${contact.phoneNumber}`);
            });
        }  else {
            console.log("No contacts found with that name. ");
        }
        handleInput(); //Re-prompt for next action
    }


    // Function to handle user input and actions
  function handleInput() {
    rl.question("What would you like to do? (add, display, search, exit):", function(command){
       switch(command) {
        case "add" :
            rl.question("Enter the contact name: ", function(name){
                rl.question("Enter the contact phone number: ", function(phoneNumber) {
                addContact(name, phoneNumber);
                });
            });
            break;
        case "display":
            displayContacts();
            break;
        case "search":
            rl.question("Enter the name to search:", function(name){
                searchContact(name);
            });
            break;
        case "exit":
          console.log("Goodbye!");
          rl.close(); //close the readline interface
          break;
          default: 
          console.log("Invalid command. please enter add, display, search, or exit.");
          handleInput(); //Re-prompt for next action
          break;
       }

    });
  }

  //Start the application by prompting user input
  console.log("Welcome to the Basic contact list application");
  handleInput(); //Initial Prompt to the user

