const twilio = require('twilio'); // Import Twilio module
const router = require("express").Router();
require('dotenv').config(); // Load environment variables
// Twilio account credentials
const accountSid = process.env.twilio_accountSid;
const authToken = process.env.twilio_authToken;

// Create a new Twilio client with the provided credentials
const client = new twilio(accountSid, authToken);

// Route to send a text message
router.post('/sendtext', async (req, res) => {
    try {
        // Extract phone number and message from request body
        const { PhoneNo, message } = req.body;
        // Send text message using Twilio client
        const twilioResponse = await client.messages.create({
            body: message,
            to: "+91" + PhoneNo, // Phone number to send the message to
            from: '+14846522896' // Your Twilio phone number
        });

        // Send success response with Twilio response body
        res.status(200).json({ success: true, message: twilioResponse.body });
    } catch (error) {
        // Log and send error response if sending message fails
        res.send({ success: false, message: 'Failed to send text message' });
    }
});

module.exports = router;
