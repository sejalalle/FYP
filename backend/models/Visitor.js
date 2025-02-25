const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    phone: { type: String, required: true },
    purpose: { type: String, required: true },
    photo: { type: String }, // Path to photo if uploaded
    checkInTime: { type: Date, required: true }, // Ensure it's a full Date object
    checkOutTime: { type: Date },
    department: { type: String, required: true },
    contactPerson: { type: String, required: true },
    idNumber: { type: String, required: true },
});

module.exports = mongoose.model('Visitor', VisitorSchema);
