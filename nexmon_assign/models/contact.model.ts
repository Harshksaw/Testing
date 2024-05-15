// contact.model.js
import mongoose from 'mongoose';

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

export default mongoose.model('Contact', ContactSchema);
