#!/usr/bin/env node

/*
PROJECT DETAILS
Project Name: Random Joke Generator
JavaScript Concept: Fetch API, Async/Await, CLI
Concept Focus:
    - Fetch API: Used to make HTTP requests to a joke service.
    - Async/Await: Handling asynchronous requests to the API.
    - CLI: Allow users to fetch a new joke or view stored jokes from the terminal.
*/

// Import necessary modules
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fetch from 'node-fetch';
import { promises as fs } from 'fs';

// Store API URL inside a variable
const JOKE_API_URL = 'https://official-joke-api.appspot.com/random_joke';

// Create a data file to store and persist the jokes
const DATA_FILE = 'jokes.json';

// Load jokes from file (async)
async function loadJokes() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return []; // File does not exist, return an empty array
        } else {
            console.error("Error loading jokes:", error);
            throw error;
        }
    }
}

// Save jokes to file (async)
async function saveJokes(jokes) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(jokes, null, 2), 'utf-8'); // Make sure the encoding is 'utf-8'
    } catch (error) {
        console.error("Error saving jokes:", error);
    }
}

// Fetch a random joke from the API (async)
async function fetchRandomJoke() {
    try {
        const response = await fetch(JOKE_API_URL);
        const data = await response.json();
        return { content: `${data.setup} - ${data.punchline}`, author: "Unknown" };
    } catch (error) {
        console.error("Error fetching joke:", error);
    }
}

// Add a new random joke (async)
async function addRandomJoke() {
    const joke = await fetchRandomJoke();
    if (joke) {
        const jokes = await loadJokes();
        jokes.push(joke);
        await saveJokes(jokes);
        console.log(`Joke added: "${joke.content}" -${joke.author}`);
    }
}

// List all stored jokes (async)
async function listJokes() {
    const jokes = await loadJokes();
    if (jokes.length === 0) {
        console.log("No jokes found.");
    } else {
        console.log("Saved Jokes:");
        jokes.forEach((joke, index) => {
            console.log(`${index + 1}. "${joke.content}" -${joke.author}`);
        });
    }
}

// Yargs CLI setup
yargs(hideBin(process.argv))
    .command('fetch', 'Fetch a new random joke', {}, async () => {
        await addRandomJoke();
    })
    .command('list', 'List all saved jokes', {}, async () => {
        await listJokes();
    })
    .help()
    .argv;
