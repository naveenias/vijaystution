const router = require("express").Router();
const teacher = require('../models/teachermodel'); // Import the teacher model

// Route to add a new teacher
router.post("/addteacher", async (req, res) => {
    try {
        // Create a new teacher record using the data from the request body
        const newTeacher = new teacher(req.body);
        // Save the new teacher record to the database
        await newTeacher.save();
        // Send a success response back to the client
        res.send({
            success: true,
            message: 'New Teacher added'
        });
    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to get all teachers
router.get("/getteacher", async (req, res) => {
    try {
        // Retrieve all teacher records from the database
        const teachers = await teacher.find();
        // Send the teacher records as a success response back to the client
        res.send({
            success: true,
            message: 'Teachers data found',
            data: teachers,
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
