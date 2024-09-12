#!/usr/bin/env node

/*
PROJECT DETAILS
Project Name: To-Do List Manager
JavaScript Concept: Async/Await, File System (fs), CLI
Concept Focus:
    - Async/Await: Allows asynchronous code to run in a more synchronous-looking fashion.
    - File System: Reading and writing to JSON files for persistent data storage.
*/

//Import yargs for CLI and fs/promises for file operations
import yargs from 'yargs';
import { hideBin} from 'yargs/helpers';
import { promises as fs } from 'fs';

const DATA_FILE = 'todos.json';

//lOAD Tasks from JSON file ( async)
async function loadTasks() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT' ) {
            // File does not exist, create an empty array
            return [];
      } else {
        console.error("Error Loading tasks:", error);
        throw error;
      }
    }
}

//Save tasks to JSON file (async)
async function saveTasks(tasks) {
    try {
        await fs.writeFile("DATA_FILE", JSON.stringify(tasks, null, 2));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }

}

//Add a task(async) 
async function addTask(taskName) {
    const tasks = await loadTasks();
    tasks.push({taskName, completed: false});
    await saveTasks(tasks);
    console.log(`Task "${taskName}" added.`);
}

//List all tasks (Async)

async function listTasks() {
    const tasks = await loadTasks();
    if (tasks.length === 0) {
        console.log("No tasks Found.");
    } else {
        console.log("To-Do List:");
        tasks.forEach((task, index) => {
            const status = task.completed ? "✅" : "❌";
            console.log(`${index + 1}. ${task.taskName} [${status}]`);
        });
    }
}

//Mark task as completed (async) 
async function completeTask(taskNumber) {
    const tasks = await loadTasks();
    if (taskNumber > 0 && taskNumber <= tasks.length) {
        tasks[taskNumber - 1].completed = true;
        await saveTasks(tasks);
        console.log(`Task "${tasks[taskNumber - 1].taskName}" marked as Completed.`);
    } else {
        console.log("Invalid task Number.");
    }
}

//Remove a task (async) 
async function removeTask(taskNumber) {
    const tasks = await loadTasks();
    if ( taskNumber > 0 && taskNumber <= tasks.length) {
        const removedTask = tasks.splice(taskNumber - 1, 1);
        await saveTasks(tasks);
        console.log(`Task "${removedTask[0].taskName}" removed.`);
    } else {
        console.log("Invalid task Number.");
    }
}

//Yargs setUp for CLI Commands 
yargs(hideBin(process.argv))
    .command('add <task>', 'Add a new task', {}, async (argv) => {
        await addTask(argv.task);
    })
    .command('list', 'List all tasks', {}, async () => {
        await listTasks();
    })
    .command('complete <taskNumber>', 'Mark a task as completed', {}, async (argv) => {
        await completeTask(argv.taskNumber);
    })
    .command('remove <taskNumber>', 'Remove a task', {}, async (argv) => {
        await removeTask(argv.taskNumber);
    })
    .help()
    .argv;