const router = require("express").Router();
const mark = require("../models/marks");

// Route to add marks
router.post("/addmarks", async (req, res) => {
    try {
        // Create a new marks record using the data from the request body
        const marksEntry = new mark(req.body);
        // Save the new marks record to the database
        await marksEntry.save();
        // Send a success response back to the client
        res.send({
            success: true,
            message: 'Marks saved'
        });
    } catch (error) {
        // If an error occurs, send an error response back to the client
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Route to get marks
router.post("/getmarks", async (req, res) => {
    const id = req.body;
    
    try {
        // Retrieve marks data for the specified ID from the database
        const marksData = await mark.find({ id: id.id });
        // Send the marks data as a success response back to the client
        res.send({
            success: true,
            message: 'Found data',
            data: marksData
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
