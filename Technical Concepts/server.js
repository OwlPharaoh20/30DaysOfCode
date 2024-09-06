//Create Folder and Navigate
// mkdir my-node-app
//cd my-node-app


//Install Dependencies
//npm init -y
//npm install express mongoose axios
 

//create Server JS file and write codes
// server.js

// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection using Mongoose
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic Mongoose model for a sample collection
const Item = mongoose.model("Item", new mongoose.Schema({ name: String }));

// Define routes

// GET route to fetch all items from the MongoDB database
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items", error: err });
  }
});

// POST route to create a new item in the MongoDB database
app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: "Error creating item", error: err });
  }
});

// GET route to demonstrate Axios fetching data from an external API
app.get("/external-data", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching external data", error: err });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



//Set The Env Variables in your .env file
/*
PORT=3000
MONGO_URI=mongodb://localhost:27017/mydatabase

*/

//Start The server
//node server.js
