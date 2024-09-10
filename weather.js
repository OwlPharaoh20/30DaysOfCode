//Day 15
//Focus today, Javascript async functions and API operations

// Import axios to make HTTP requests
import axios from 'axios';

//Function to get weather data

async function getWeather(city){
    const apiKey = '311ee79a89f82a87acac9abdc2574dc0';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        //Extracting important weather details
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;

        console.log(`weather in ${city}:`);
        console.log(`Temperature: ${temp}°C`);
        console.log(`Description: ${description}`);
        console.log(`Humidity: ${humidity}%`);
    } catch (error) {
        console.log('Error fetching weather data. Please try again.');

    }
}

//Fetch weather for a city passed as an argument
const city = process.argv[2];
if(city) {
    getWeather(city);
} else {
    console.log('Please provide a city name.');
}