#!/usr/bin/env node

/*
PROJECT DETAILS
Project Name: Movie Information Fetcher
JavaScript Concept: Fetch API, Async/Await, CLI, Object Manipulation
API: The Movie Database (TMDb)

Project Outline:
- Firstly import Necessary Modules.
- Store Your API Key and Base URL in Variables.


Create 4 functions for the application features. 
- Function to Fetch Popular movies
- Function to fetch Upcoming Movies 
- Function to search for a movie by title
- Function to display a list of Movies 


-Lastly, Yargs setup for CLI commands
*/

// Import necessary modules
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fetch from 'node-fetch';

// Store API Key and Base URL in variables
const API_KEY = 'e348bd45be38fb9998671324d26a75a1';
const BASE_URL = 'https://api.themoviedb.org/3';

// Create 4 functions for the application features

// Function to Fetch Popular movies 
async function fetchPopularMovies() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    try {
        const response = await fetch(url);
        //Store the API response in a variable
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error); 
    }
}

//Function to fetch Upcoming Movies
async function fetchUpcomingMovies() {
    const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
    try {
        const response = await fetch(url);
        const data = await response.json(); // Correcting 'data' variable reference
        return data.results; // Ensure data is being returned from the API response
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
    }
}

//Search for movie by title
async function searchMovieByTitle(title) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(title)}&page=1&include_adult=false`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error searching for movie:', error);
    }
}

// Function to display a list of Movies
function displayMovies(movies) {
    if (!movies || movies.length === 0) { // Add a check to ensure 'movies' is defined
        console.log('No movies found.');
    } else {
        movies.forEach((movie, index) => {
            console.log(`${index + 1}. ${movie.title} (Release Date: ${movie.release_date})`);
            console.log(`   Overview: ${movie.overview}\n`);
        });
    }
}


// Yargs CLI setup
yargs(hideBin(process.argv))
    .command('popular', 'Fetch and display popular movies', {}, async () => {
        const movies = await fetchPopularMovies();
        displayMovies(movies);
    })
    .command('upcoming', 'Fetch and display upcoming movies', {}, async () => {
        const movies = await fetchUpcomingMovies();
        displayMovies(movies);
    })
    .command('search <title>', 'Search for a movie by title', {}, async (argv) => {
        const movies = await searchMovieByTitle(argv.title);
        displayMovies(movies);
    })
    .help()
    .argv;
