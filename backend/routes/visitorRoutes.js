const express = require('express');
const {
    getVisitors,
    addVisitor,
    getVisitorById,
    updateVisitor,
    deleteVisitor,
    approveVisitor, // Add this
    rejectVisitor, // Add this
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

// Route to approve a visitor by ID
router.patch('/approve/:id', approveVisitor); // Add this

// Route to reject a visitor by ID
router.patch('/reject/:id', rejectVisitor); // Add this

module.exports = router; // Export the router