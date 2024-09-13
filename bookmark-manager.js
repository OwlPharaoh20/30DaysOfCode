#!/usr/bin/env node

/*
PROJECT DETAILS
Project Name: Bookmark Manager
JavaScript Concept: Async/Await, File System (fs), Local Storage Simulation
Concept Focus:
    - Async/Await for file operations.
    - File System for persistent storage of bookmarks.
    - Local Storage Simulation using a JSON file.
*/

// Import necessary modules
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { promises as fs } from 'fs';

const DATA_FILE = 'bookmarks.json';

// Load bookmarks from the JSON file (async)
async function loadBookmarks() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);  
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        } else {
            console.error("Error loading bookmarks:", error);
            throw error;
        }
        
    }
}


//Save bookmarks to the JSON file (async)
async function saveBookmarks (bookmarks) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(bookmarks, null, 2));
    } catch (error) {
        console.error("Error saving bookmarks:", error )
        
    }
  
}



//Add a bookmark(async)
async function addBookmark(title, url) {
    const bookmarks = await loadBookmarks();
    bookmarks.push({title, url});
    await saveBookmarks(bookmarks);
    console.log(`Bookmark added: "${title}" (${url})`);
    
}


//List all bookmarks (async)
async function listBookmarks() {
    
    const bookmarks = await loadBookmarks();
    if (bookmarks.length === 0) {
        console.log("No bookmarks found.")
    } else {
        console.log("Bookmarks:");
        bookmarks.forEach((bookmark, index) => {
            console.log(`${index + 1}. ${bookmark.title} - ${bookmark.url}`);

        });
    }
}



//Remove a bookmark by index (async) 
async function removeBookmark(index) {
    const bookmarks = await loadBookmarks();
    if (index > 0 && index <= bookmarks.length) {
        const removed = bookmarks.splice(index -1, 1);
        await saveBookmarks(bookmarks);
        console.log(`Bookmark removed: "${removed[0].title}"`);
    } else {
        console.log("Invalid Bookmark index.");
    }
}



//Search Bookmarks by title (async)
async function searchBookmarks(searchTerm) {
    const bookmarks = await loadBookmarks();
    const results = bookmarks.filter( bookmark => 
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if ( results.length > 0) {
        console.log("Search Results:");
        results.forEach((bookmark, index) => {
            console.log(`No bookmarks found with the term "${searchTerm}".`)
        });
    } else {
        console.log(`No bookmarks found with the term "${searchItem}".`)
    }
}



// Yargs setup
yargs(hideBin(process.argv))
    .command('add <title> <url>', 'Add a new bookmark', {}, async (argv) => {
        await addBookmark(argv.title, argv.url);
    })
    .command('list', 'List all bookmarks', {}, async () => {
        await listBookmarks();
    })
    .command('remove <index>', 'Remove a bookmark by index', {}, async (argv) => {
        await removeBookmark(argv.index);
    })
    .command('search <term>', 'Search bookmarks by title', {}, async (argv) => {
        await searchBookmarks(argv.term);
    })
    .help()
    .argv;