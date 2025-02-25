const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const visitorRoutes = require('./routes/visitorRoutes'); // Import the visitor routes

dotenv.config();
connectDB();

const app = express();

// Middleware

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Add PATCH to allowed methods
    credentials: true // Allow credentials if needed
}));

// Visitor counter route (optional, can be removed if using visitorRoutes)
app.get('/', async function(req, res) {
    try {
        let visitors = await Visitor.findOne({ name: 'localhost' });
        if (visitors === null) {
            const beginCount = new Visitor({ name: 'localhost', count: 1 });
            await beginCount.save();
            res.send(`Counter: 1`);
            console.log("First visitor arrived");
        } else {
            visitors.count += 1;
            await visitors.save();
            res.send(`Counter: ${visitors.count}`);
            console.log("Visitor arrived: ", visitors.count);
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Use visitor routes
app.use('/api/visitors', visitorRoutes);
 // All visitor-related routes will be prefixed with /api/visitors
 

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});