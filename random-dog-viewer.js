#!/usr/bin/env node

/*
PROJECT DETAILS
Project Name: Random Dog Image Viewer
JavaScript Concept: Fetch API, HTTP requests
Concept Focus:
    - Fetch API: Used to make HTTP requests to a server and handle responses asynchronously.
*/

//Import necessary modules
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fetch from 'node-fetch'; //Installed with `npm install node-fetch`

const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';

//Fetch Random dog image using fetch API

async function fetchDogImage() {
    try {
        const response = await fetch(DOG_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } 
        const data = await response.json();
        console.log(`Random Dog Image: ${data.message}`);
    } catch (error) {
        console.error('Error fetching dog image: ', error)
    }
}


// Yargs setup for CLI commands
yargs(hideBin(process.argv))
    .command('fetch', 'Fetch a random dog image', {}, async () => {
        await fetchDogImage();
    })
    .command('quit', 'Quit the program', {}, () => {
        console.log('Exiting the program.');
        process.exit(0);
    })
    .help()
    .argv;