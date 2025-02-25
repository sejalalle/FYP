const Visitor = require('../models/Visitor');

// Helper function to convert "HH:mm" to a Date object
const convertTimeToDate = (timeString) => {
    if (!timeString) return new Date();
    
    const today = new Date();
    const [hours, minutes] = timeString.split(":");
    
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
};

// Get all visitors
const getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.status(200).json(visitors);
    } catch (error) {
        console.error('Error fetching visitors:', error);
        res.status(500).json({ message: 'Error fetching visitors', error: error.message });
    }
};

// Add a new visitor
const addVisitor = async (req, res) => {
    try {
        let { checkInTime } = req.body;

        // Convert checkInTime if it's in "HH:mm" format
        if (checkInTime && typeof checkInTime === "string") {
            checkInTime = convertTimeToDate(checkInTime);
        }

        const newVisitor = new Visitor({ ...req.body, checkInTime });
        await newVisitor.save();
        
        res.status(201).json({ message: "Visitor added successfully", visitor: newVisitor });
    } catch (error) {
        console.error('Error adding visitor:', error);
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
        console.error('Error fetching visitor:', error);
        res.status(500).json({ message: 'Error fetching visitor', error: error.message });
    }
};

// Update visitor details
const updateVisitor = async (req, res) => {
    try {
        let { checkInTime } = req.body;

        // Convert checkInTime if it's in "HH:mm" format
        if (checkInTime && typeof checkInTime === "string") {
            checkInTime = convertTimeToDate(checkInTime);
        }

        const updatedVisitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            { ...req.body, checkInTime },
            { new: true, runValidators: true }
        );

        if (!updatedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json(updatedVisitor);
    } catch (error) {
        console.error('Error updating visitor:', error);
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
        console.error('Error deleting visitor:', error);
        res.status(500).json({ message: 'Error deleting visitor', error: error.message });
    }
};



// Approve a visitor
const approveVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' }, // Update the status to "approved"
            { new: true } // Return the updated document
        );

        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        res.json({ message: 'Visitor approved successfully', visitor });
    } catch (error) {
        console.error('Error approving visitor:', error);
        res.status(500).json({ message: 'Failed to approve visitor', error });
    }
};

// Reject a visitor
const rejectVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' }, // Update the status to "rejected"
            { new: true } // Return the updated document
        );

        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        res.json({ message: 'Visitor rejected successfully', visitor });
    } catch (error) {
        console.error('Error rejecting visitor:', error);
        res.status(500).json({ message: 'Failed to reject visitor', error });
    }
};

module.exports = {
    getVisitors,
    addVisitor,
    getVisitorById,
    updateVisitor,
    deleteVisitor,
    approveVisitor, // Add this
    rejectVisitor, // Add this
};