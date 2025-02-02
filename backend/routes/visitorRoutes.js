const express = require('express');
const {
    getVisitors,
    addVisitor,
    getVisitorById,
    updateVisitor,
    deleteVisitor,
} = require('../controllers/visitorController'); // Import the controller functions

const router = express.Router();

// Route to get all visitors
router.get('/', getVisitors);

// Route to add a new visitor
router.post('/', addVisitor);

// Route to get a specific visitor by ID
router.get('/:id', getVisitorById);

// Route to update visitor details by ID
router.put('/:id', updateVisitor);

// Route to delete a visitor by ID
router.delete('/:id', deleteVisitor);

module.exports = router; // Export the router