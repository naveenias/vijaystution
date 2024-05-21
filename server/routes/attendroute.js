const router = require("express").Router();
const attend = require('../models/attend');

// Route to add attendance
router.post("/addattendence", async (req, res) => {
    try {
        // Create a new attendance record using the data from the request body
        const attendence = new attend(req.body);
        // Save the new attendance record to the database
        await attendence.save();
        // Send a success response back to the client
        res.send({
            success: true,
            message: 'Attendance saved'
        });
    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to get attendance records
router.get("/getattendence", async (req, res) => {
    try {
        // Retrieve all attendance records from the database
        const attendenceData = await attend.find();
        // Send the attendance records as a success response back to the client
        res.send({
            success: true,
            message: 'Found data',
            data: attendenceData
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
