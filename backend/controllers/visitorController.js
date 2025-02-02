const Visitor = require('../models/Visitor');

// Get all visitors
const getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.status(200).json(visitors);
    } catch (error) {
        console.error('Error fetching visitors:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error fetching visitors', error: error.message });
    }
};


// Add a new visitor
const addVisitor = async (req, res) => {
    try {
        const newVisitor = new Visitor(req.body);
        await newVisitor.save();
        res.status(201).json(newVisitor);
    } catch (error) {
        console.error('Error adding visitor:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error adding visitor', error: error.message });
    }
};

// Get a specific visitor by ID
const getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json(visitor);
    } catch (error) {
        console.error('Error fetching visitor:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error fetching visitor', error: error.message });
    }
};

// Update visitor details
const updateVisitor = async (req, res) => {
    try {
        const updatedVisitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Ensure that validators are run on update
        );
        if (!updatedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json(updatedVisitor);
    } catch (error) {
        console.error('Error updating visitor:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating visitor', error: error.message });
    }
};

// Delete a visitor
const deleteVisitor = async (req, res) => {
    try {
        const deletedVisitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!deletedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json({ message: 'Visitor deleted successfully' });
    } catch (error) {
        console.error('Error deleting visitor:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting visitor', error: error.message });
    }
};

module.exports = { getVisitors, addVisitor, getVisitorById, updateVisitor, deleteVisitor };