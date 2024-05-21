const router = require("express").Router();
const stud = require('../models/studentdetails'); // Import the student model
const jwt = require('jsonwebtoken'); // Import JWT for token authentication

// Route to add a new student
router.post("/addStudent", async (req, res) => {
    try {
        // Create a new student record using the data from the request body
        const newStudent = new stud(req.body);
        // Save the new student record to the database
        await newStudent.save();
        // Send a success response back to the client
        res.send({
            success: true,
            message: 'New student added'
        });
    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to get all students
router.get("/getStudent", async (req, res) => {
    try {
        // Retrieve all student records from the database
        const students = await stud.find();
        // Send the student records as a success response back to the client
        res.send({
            success: true,
            message: 'Student data retrieved',
            data: students,
        });
    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to authenticate and log in a student
router.post("/loginstudent", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user with the provided username in the database
        const user = await stud.findOne({ username });

        // If user not found, send error response
        if (!user) {
            res.send({ success: false, message: "User not found" });
        } else {
            // If username and password match, generate JWT token
            if (username === user.username && password === user.password) {
                const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.send({
                    success: true,
                    message: 'User login successful',
                    jwttoken: token,
                    username: username
                });
            }
        }
    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to get a student by username
router.post("/getStudentbynumber", async (req, res) => {
    const { username } = req.body;

    try {
        // Find the user with the provided username in the database
        const user = await stud.findOne({ username });

        // If user not found, send error response
        if (!user) {
            res.send({ success: false, message: "User not found" });
        } else {
            // If user found, send success response with user data
            res.send({
                success: true,
                message: 'User found',
                data: user
            });
        }
    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to get a student by ID
router.post("/getStudentbyid", async (req, res) => {
    const { _id } = req.body;

    try {
        // Find the user with the provided ID in the database
        const user = await stud.findOne({ _id });

        // If user not found, send error response
        if (!user) {
            res.send({ success: false, message: "User not found" });
        } else {
            // If user found, send success response with user data
            res.send({
                success: true,
                message: 'User found',
                data: user
            });
        }
    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to update a student by ID
router.put("/updateStudentbyid", async (req, res) => {
    const { _id, studentnewdata } = req.body;

    try {
        // Find and update the user with the provided ID in the database
        const user = await stud.findOneAndUpdate({ _id }, studentnewdata, { new: true });

        // If user not found, send error response
        if (!user) {
            res.send({
                success: false,
                message: "User not found"
            });
        } else {
            // If user found and updated, send success response with updated user data
            res.send({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        }

    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to delete a student by ID
router.post("/deletestud", async (req, res) => {
    const { _id } = req.body;

    try {
        // Find and delete the user with the provided ID in the database
        const result = await stud.findByIdAndDelete({ _id });
        // Send success response if deletion is successful
        res.send({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (error) {
        // If an error occurs, send an error response back to the client
        console.error(error);
        res.send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
