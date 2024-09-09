// Day 14 - Task Manager CLI

/*
Features:

- Add Task: Add a new task with a description and priority level.
- Mark as Completed: Mark any task as completed.
- View All Tasks: View all tasks with their status and priority.
- Filter Tasks: Filter tasks by status (pending/completed).
- Clear Tasks: Clear all tasks.
*/

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

// File path to store tasks and ID counter
const FILE_PATH = 'tasks.json';
const ID_PATH = 'id.json';

// Load tasks from the file
function loadTasks() {
    if (fs.existsSync(FILE_PATH)) {
        const data = fs.readFileSync(FILE_PATH);
        return JSON.parse(data);
    }
    return [];
}

// Save tasks to the file
function saveTasks() {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

// Load next ID from the file
function loadNextId() {
    if (fs.existsSync(ID_PATH)) {
        const data = fs.readFileSync(ID_PATH);
        return JSON.parse(data).nextId || 1;
    }
    return 1;
}

// Save next ID to the file
function saveNextId() {
    fs.writeFileSync(ID_PATH, JSON.stringify({ nextId }));
}

// Initialize task ID counter
let nextId = loadNextId(); 
let tasks = loadTasks();  // Load tasks from the file

// Ensure task IDs are correctly initialized
if (tasks.length > 0) {
    nextId = Math.max(...tasks.map(task => task.id)) + 1;
}

// Function to add a new task
function addTask(title, priority) {
    const task = {
        id: nextId++, // Assign the next unique ID
        title,
        priority, // Use priority as intended
        completed: false // Initialize task as not completed
    };
    tasks.push(task);
    saveTasks(); // Save tasks to file
    saveNextId(); // Save next ID to file
    console.log(`Task added: ${title} (Priority: ${priority})`);
}

// Function to mark a task as completed
function completeTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = true;
        saveTasks(); // Save tasks to file
        console.log(`Task ${id} marked as completed`);
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
        tasks.forEach((task) => {
            console.log(`${task.id}. ${task.title} - Priority: ${task.priority} (Completed: ${task.completed ? 'Yes' : 'No'})`);
        });
    }
}

// Function to filter tasks by status 
function filterTasks(status) {
    const filteredTasks = tasks.filter(task => task.completed === (status === 'completed'));
    if (filteredTasks.length === 0) {
        console.log(`No ${status} tasks found.`);
    } else {
        filteredTasks.forEach(task => {
            console.log(`${task.id}. ${task.title} - Priority: ${task.priority} (Completed: ${task.completed ? 'Yes' : 'No'})`);
        });
    }
}

// Function to clear all tasks
function clearTasks() {
    tasks = [];
    nextId = 1; // Reset ID counter
    saveTasks(); // Save tasks to file
    saveNextId(); // Save next ID to file
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
