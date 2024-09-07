//Day 12 
/*
Focus JavaScript concepts:

    Conditional statements (if/else)
    Modular functions
    Object handling
    CLI Event Handling

    In this project, we’ll build a weather CLI app that allows users to:

    1. Input a location.
    2. Get a simulated weather forecast.
    3. Optionally save the forecast to a history log.
    4. View or clear history.
*/

// Import commander for CLI interactions
import { program } from 'commander';

// Simulated weather data
const weatherData = {
    "New york": { temp: 25, condition: "Sunny" },
    "London": { temp: 18, condition: "Cloudy" },
    "Tokyo": { temp: 22, condition: "Rainy" },
    "Los Angeles": { temp: 30, condition: "Sunny" },
    "Paris": { temp: 20, condition: "Overcast" },
    "Berlin": { temp: 16, condition: "Drizzle" },
    "Sydney": { temp: 28, condition: "Sunny" },
    "Moscow": { temp: 10, condition: "Snow" },
    "Cairo": { temp: 35, condition: "Hot" },
    "Beijing": { temp: 24, condition: "Hazy" },
    "Mexico City": { temp: 26, condition: "Thunderstorms" },
    "Sao Paulo": { temp: 29, condition: "Sunny" },
    "Mumbai": { temp: 31, condition: "Humid" },
    "Johannesburg": { temp: 19, condition: "Clear" },
    "Toronto": { temp: 12, condition: "Windy" },
    "Buenos Aires": { temp: 23, condition: "Mild" },
    "Seoul": { temp: 21, condition: "Cloudy" },
    "Bangkok": { temp: 33, condition: "Hot" },
    "Rome": { temp: 27, condition: "Clear" },
    "Istanbul": { temp: 22, condition: "Partly Cloudy" },
    "Dubai": { temp: 38, condition: "Extremely Hot" },
    "Singapore": { temp: 32, condition: "Humid" },
    "Cape Town": { temp: 17, condition: "Breezy" }
};


// History of queries (Module-level variable)
let weatherHistory = [];

// Helper function to get weather data based on the city
function getWeather(city) {
    const weather = weatherData[city]; // Access the weather data by city name
    if (weather) {
        return `The weather in ${city} is ${weather.temp}°C and ${weather.condition}.`;
    } else {
        return `Sorry, we don't have data for ${city}.`;
    }
}

// Function to display weather history
function displayHistory() {
    if (weatherHistory.length === 0) {
        console.log("No weather history found.");
    } else {
        console.log("Weather History:");
        weatherHistory.forEach((entry, index) => {
            console.log(`${index + 1}. ${entry}`);
        });
    }
}

// Function to clear history
function clearHistory() {
    if (weatherHistory.length === 0) {
        console.log("History is already empty.");
    } else {
        weatherHistory = [];
        console.log("Weather history cleared.");
    }
}

// Function to handle weather querying and conditional logic
function checkWeather(city, saveToHistory = false) {
    const weather = getWeather(city);
    console.log(weather);

    // Save to history if requested
    if (saveToHistory) {
        weatherHistory.push(weather);
    }
}

// Function for the main CLI Menu
function runWeatherApp() {
    program
        .version('1.0.0')
        .description('A simple weather CLI app')
        .option('-c, --city <city>', 'Get weather for a specific city')
        .option('-s, --save', 'Save this weather info to history')
        .option('-h, --history', 'View the weather query history')
        .option('-C, --clear', 'Clear the weather query history')
        .parse(process.argv);

    const options = program.opts();

    // Handle city input
    if (options.city) {
        if (weatherData[options.city]) {
            checkWeather(options.city, options.save);
        } else {
            console.log(`Sorry, we don't have weather data for ${options.city}.`);
        }
    } else if (options.history) {
        displayHistory();
    } else if (options.clear) {
        clearHistory();
    } else {
        console.log("Please enter a valid command. Use --help to see available options.");
    }
}

// Run the app
runWeatherApp();
