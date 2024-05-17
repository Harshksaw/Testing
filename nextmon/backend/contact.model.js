// contact.model.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    unique: true, // Ensure unique email addresses
  },
  hobbies: {
    type: String,
  },
}, { timestamps: true }); // Add timestamps for creation/update

module.exports = mongoose.model('Contact', ContactSchema);
