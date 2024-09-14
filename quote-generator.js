#!/usr/bin/env node

/*
PROJECT DETAILS
Project Name: Random Quote Generator
JavaScript Concept: Fetch API, Async/Await, CLI
Concept Focus:
    - Fetch API: Used to make HTTP requests to a quote service.
    - Async/Await: Handling asynchronous requests to the API.
    - CLI: Allow users to fetch a new quote or view stored quotes from the terminal.
*/

//Import necessary modules 
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import { stringify } from 'querystring';

//Store API URL inside variable 
const QUOTE_API_URL = 'https://official-joke-api.appspot.com/random_joke';


//Create DATA FILE TO Store and persist the quotes 
const DATA_FILE = 'quotes.json';

//Load quotes from file (aysnc)
async function loadQuotes() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return []; // File does not exist, return an empty array
        } else {
            console.error("Error Loading quotes:", error);
            throw error;
        }
    }
}

// Save quotes to file (async)
async function saveQuotes(quotes) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(quotes, null, 2), 'utf-8'); // Make sure the encoding is 'utf-8'
    } catch (error) {
        console.error("Error saving quotes:", error);
    }
}


async function fetchRandomQuote() {
    try {
        const response = await fetch(QUOTE_API_URL);
        const data = await response.json();
        return { content: `${data.setup} - ${data.punchline}`, author: "Unknown" };
    } catch (error) {
        console.error("Error fetching joke:", error);
    }
}


//Add a new random quote (async) 
async function addRandomQuote() {
    const quote = await fetchRandomQuote();
    if(quote) {
       const quotes = await loadQuotes();
       quotes.push(quote);
       await saveQuotes(quotes);
       console.log(`Quote added: "${quote.content}" -${quote.author}`);
    }
}


//List all stored quotes (async)
async function listQuotes() {
    const quotes = await loadQuotes();
    if(quotes.length === 0 ) {
        console.log("No quotes found.");
    } else {
        console.log("Saved Quotes:");
        quotes.forEach((quote, index) => {
            console.log(`${index + 1}. "${quote.content}" -${quote.author}`);
        });
    } 
}


// Yargs CLI setup
yargs(hideBin(process.argv))
    .command('fetch', 'Fetch a new random quote', {}, async () => {
        await addRandomQuote();
    })
    .command('list', 'List all saved quotes', {}, async () => {
        await listQuotes();
    })
    .help()
    .argv;