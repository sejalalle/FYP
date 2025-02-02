const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactEmail: { type: String, required: true }, // Removed email, kept only contactEmail
    phone: { type: String, required: true },
    purpose: { type: String, required: true },
    photo: { type: String }, // Path to photo if uploaded
    checkInTime: { type: Date, default: Date.now },
    checkOutTime: { type: Date },
    department: { type: String, required: true },
    contactPerson: { type: String, required: true },
    idNumber: { type: String, required: true },
});

module.exports = mongoose.model('Visitor', VisitorSchema);
