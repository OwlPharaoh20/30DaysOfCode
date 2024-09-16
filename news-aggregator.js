#!/usr/bin/env node
/*
Day 21: News Aggregator
Javascript Concept: Fetch API, Async/Await, File System (fs), CLI
*/

// Import necessary modules
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fetch from 'node-fetch';
import { promises as fs } from 'fs';


// Store API URL and DATA FILE in variables
const NEWS_API_URL = 'https://newsapi.org/v2/';
const API_KEY = 'e7a9eec1f14d4bbca1c6c97947718e11'; // Replace with your actual API key
const DATA_FILE = 'news.json';


// Helper function to load saved news articles 
async function loadSavedNews() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if(error.code === 'ENOENT') {
            return []; //If the file doesn't exist, return an empty array
        } else {
            console.error("Error loading saved News:", error);
            throw error;
        }
    }
}

//Helper function to save news articles 
async function saveNews(news) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(news, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error saving news:", error);
        
    }
}

//Fetch Latest news based on Keyboard 
async function fetchLatestNews(keyword) {
    const url = `${NEWS_API_URL}everything?q=${keyword}&apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayArticles(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error)
        
    }
}

//Fetch news by category 
async function fetchNewsByCategory(category) {
    try {
        const response = await fetch(`${NEWS_API_URL}top-headlines?category=${category}&apiKey=${API_KEY}`);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news by category:', error);
    }
}


//Display news articles
function displayArticles(articles) {
    if (!articles || articles.length === 0) {
        console.log("No news articles found.");
        return;
    }

    articles.forEach((article, index) => {
        console.log(`${index + 1}. ${article.title}`);
        console.log(`Source: ${article.source.name}`);
        console.log(`URL: ${article.url}`);
        console.log('');
    })
}

//Fetch news by source
async function fetchNewsBySource(source) {
    try {
        const response = await fetch(`${NEWS_API_URL}top-headlines?sources=${source}&apiKey=${API_KEY}`);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news by source:', error);
    }
}



//Save the fethched news
async function saveFetchedNews(keyword) {
    const url = `${NEWS_API_URL}everything?q=${keyword}&apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const savedNews = await loadSavedNews();
        const updatedNews = [...savedNews, ...data.articles];
        await saveNews(updatedNews);
        console.log("News articles saved.");
    } catch (error) {
        console.error("Error saving news:", error);
    }
    
}

///List Saved news articles
async function listSavedNews() {
    const savedNews = await loadSavedNews();
    if (savedNews.length === 0) {
        console.log("No saved news articles.");
    } else {
        console.log("Saved news Articles: ");
        savedNews.forEach((article, index) => {
            console.log(`${index + 1}. ${article.title}`);
            console.log(`Source: ${article.source.name}`);
            console.log(`URL: ${article.url}`);
        })

    } 
    
}

// Yargs CLI commands setup
// Yargs CLI commands setup
yargs(hideBin(process.argv))
    .command('latest <keyword>', 'Fetch the latest news by keyword', {}, async (argv) => {
        await fetchLatestNews(argv.keyword);
    })
    .command('category <category>', 'Fetch news by category', {}, async (argv) => {
        const articles = await fetchNewsByCategory(argv.category);
        displayArticles(articles); // Display the articles after fetching
    })
    .command('source <source>', 'Fetch news by source', {}, async (argv) => {
        const news = await fetchNewsBySource(argv.source);
        if (news && news.length > 0) {
            news.forEach((article, index) => {
                console.log(`${index + 1}. ${article.title}`);
                console.log(`   Source: ${article.source.name}`);
                console.log(`   Description: ${article.description}\n`);
            });
        } else {
            console.log('No news articles found for this source.');
        }
    })
    .command('search <keyword>', 'Search for news articles by keyword', {}, async (argv) => {
        await fetchLatestNews(argv.keyword);
    })
    .command('save <keyword>', 'Save news articles by keyword', {}, async (argv) => {
        await saveFetchedNews(argv.keyword);
    })
    .command('list', 'List all saved news articles', {}, async () => {
        await listSavedNews();
    })
    .help()
    .argv;
