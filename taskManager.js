// Day 14 - Task Manager CLI

/*
Features:

- Add Task: Add a new task with a description and priority level.
- Mark as Completed: Mark any task as completed.
- View All Tasks: View all tasks with their status and priority.
- Filter Tasks: Filter tasks by status (pending/completed).
- Clear Tasks: Clear all tasks.
*/

// Import yargs for CLI interactions
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Store all tasks
let tasks = [];
let taskId = 1; // ID to track each task

// Function to add a new task
function addTask(title, priority = 'low') {
    const task = {
        id: taskId++,  // Automatically increment task ID
        title,
        priority,
        completed: false
    };
    tasks.push(task);
    console.log(`Task added: ${title} (Priority: ${priority})`);
    console.log(tasks);  // Log the tasks array to verify it is being updated
}

// Function to mark a task as completed
function completeTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = true;
        console.log(`Task "${task.title}" marked as completed.`);
    } else {
        console.log(`Task with ID ${id} not found.`);
    }
}

// Function to view all tasks
function viewTasks() {
    if (tasks.length === 0) {
        console.log("No tasks found.");
    } else {
        console.log("Your tasks:");
        tasks.forEach(task => {
            console.log(`${task.id}. ${task.title} - Priority: ${task.priority} (Completed: ${task.completed ? 'Yes' : 'No'})`);
        });
    }
}

// Function to filter tasks by status
function filterTasks(status) {
    const isCompleted = status === 'completed';
    const filteredTasks = tasks.filter(task => task.completed === isCompleted);

    if (filteredTasks.length === 0) {
        console.log(`No ${status} tasks found.`);
    } else {
        console.log(`${status.charAt(0).toUpperCase() + status.slice(1)} tasks:`);
        filteredTasks.forEach(task => {
            console.log(`${task.id}. ${task.title} - Priority: ${task.priority} (Completed: ${task.completed ? 'Yes' : 'No'})`);
        });
    }
}

// Function to clear all tasks
function clearTasks() {
    tasks = [];
    taskId = 1; // Reset taskId
    console.log("All tasks cleared.");
}

// Setup yargs commands
yargs(hideBin(process.argv))
    .command('add [title] [priority]', 'Add a new task', (yargs) => {
        yargs
            .positional('title', { describe: 'Title of the task', type: 'string' })
            .positional('priority', { describe: 'Priority level of the task', type: 'string', default: 'low' });
    }, (argv) => {
        if (argv.title) {
            addTask(argv.title, argv.priority);
        } else {
            console.log("Please provide a task title.");
        }
    })
    .command('complete [id]', 'Mark task as completed', (yargs) => {
        yargs.positional('id', { describe: 'Task ID to mark as completed', type: 'number' });
    }, (argv) => {
        if (argv.id) {
            completeTask(argv.id);
        } else {
            console.log("Please provide a task ID.");
        }
    })
    .command('view', 'View all tasks', () => {
        viewTasks();
    })
    .command('filter [status]', 'Filter tasks by status', (yargs) => {
        yargs.positional('status', { describe: 'Filter by status (pending/completed)', type: 'string' });
    }, (argv) => {
        if (argv.status) {
            filterTasks(argv.status);
        } else {
            console.log("Please specify a task status (pending/completed).");
        }
    })
    .command('clear', 'Clear all tasks', () => {
        clearTasks();
    })
    .help()
    .argv;
