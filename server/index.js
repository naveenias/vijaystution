// Import required modules
const express = require('express');
const app = express(); // Create an Express application
app.use(express.json()); // Middleware to parse JSON requests
require('dotenv').config(); // Load environment variables
const cors = require('cors');

const mongoose = require('mongoose'); // Import Mongoose for MongoDB connection

// Connect to MongoDB using Mongoose and environment variable for MongoDB URL
mongoose.connect(process.env.mongo_url);
const connection = mongoose.connection;

// Configure CORS to allow requests from your frontend
app.use(cors({
    origin: 'https://naveenstution.vercel.app/', // Replace with your frontend URL
  }));
// Event handlers for MongoDB connection status
connection.on('connected', () => {
    console.log('Mongo DB connected');
});

connection.on('error', () => {
    console.log('Mongo DB not connected');
});

const port = 8000; // Define the port for the server to listen on

// Import route handlers for different API endpoints
const userroutes = require("./routes/userroute");
const studroutes = require("./routes/studentroute");
const teacherroutes = require("./routes/teacherroute");
const attendroutes = require("./routes/attendroute");
const marksrouts = require("./routes/marks");
const sendsmsroute = require("./routes/sendsms");

// Define routes for different API endpoints
app.use('/api/teachers', teacherroutes);
app.use('/api/students', studroutes);
app.use('/api/users', userroutes);
app.use('/api/attendence', attendroutes);
app.use("/api/marks", marksrouts);
app.use("/api/sendsms", sendsmsroute);

// Start the Express server to listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
