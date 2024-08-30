//Project - Todo List manager 
//JS concept in focus : Functions and methods 

//Import the readline Module to handle user CLI input in node.js 

const readline = require('readline');

//create an interface for reading user input from the console 

const rl = readline.createInterface({
     input: process.stdin,
     output : process.stdout
});

//Initialize an empty array to store to-do tasks
let toDoList = [];

//Function to display all tasks
function displayTasks () {
    if(toDoList.length === 0){
        console.log("Your To-do List is empty.")
    } else {
        console.log("Your Todo List");
        toDoList.forEach((task,index)=> {
            console.log(`${index + 1}. ${task}`);
         });
    }

}

//Function to add task 
function addTask(task) {
    // Check if task is defined and not empty
    if (!task) {
        console.log("Error: Task cannot be empty.");
        return;
    }
    toDoList.push(task);
    console.log(`Task added: ${task}`);
}



//Function to remove task from the list 
function removeTask (taskNumber ) {
    if (taskNumber > 0 && taskNumber <= toDoList.length) {
        const removedTask = toDoList.splice(taskNumber -1, 1); // Remove Task
        console.log(`Task "${removedTask}" removed from your to-do list.`);
    } else {
        console.log("Invalid task number.");
    }
}

//Function to handle user input and interact with the to-do list

// Function to handle user input and interact with the to-do list
function handleInput() {
    rl.question("What would you like to do? (add, remove, display, exit): ", function (command) {
        switch (command) {
            case "add":
                // Prompt user to enter the task
                rl.question("Enter the task you want to add: ", function (task) {
                    addTask(task); // Correctly pass 'task' to addTask function
                    handleInput(); // Re-prompt after adding
                });
                break;
            case "remove":
                rl.question("Enter the task number to remove: ", function (taskNumber) {
                    removeTask(parseInt(taskNumber)); // Use the task number to remove task
                    handleInput(); // Re-prompt after removing
                });
                break;
            case "display":
                displayTasks(); // Display current tasks
                handleInput(); // Re-prompt after displaying
                break;
            case "exit":
                console.log("Goodbye!");
                rl.close(); // Close the readline interface
                break;
            default:
                console.log("Invalid command. Please enter add, remove, display, or exit.");
                handleInput(); // Re-prompt after invalid command
                break;
        }
    });
}


//Start the To-do List manager 
console.log( "Welcome to your To-Do List manager!");

handleInput(); //Initial Prompt

