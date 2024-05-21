const router = require("express").Router();
const User = require('../models/usermodel'); // Import the User model
const jwt = require('jsonwebtoken'); // Import JWT for token authentication

// Route to add a new user
router.post("/adduser", async (req, res) => {
    try {
        // Create a new user record using the data from the request body
        const newUser = new User(req.body);
        // Save the new user record to the database
        await newUser.save();
        // Send a success response back to the client
        res.send({
            success: true,
            message: 'New User added'
        });
    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to get all users
router.get("/getuser", async (req, res) => {
    try {
        // Retrieve all user records from the database
        const users = await User.find();
        // Send the user records as a success response back to the client
        res.send({
            success: true,
            message: 'Users data found',
            data: users
        });
    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to authenticate and log in an admin
router.post("/loginadmin", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user with the provided username in the database
        const user = await User.findOne({ username });

        // If user not found, send error response
        if (!user) {
            return res.send({ success: false, message: "Error: User not found" });
        }

        // If password does not match, send error response
        if (user.password !== password) {
            return res.send({ success: false, message: "Error: Incorrect password" });
        }

        // If username and password match, generate JWT token
        const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        // Send success response with JWT token
        res.send({
            success: true,
            message: 'User log in success',
            jwttoken: token
        });

    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
