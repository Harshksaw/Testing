// app.js (or separate routes file)
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('../db'); // Import database connection
const Contact = require('../contact.model'); // Import Contact model
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Connect to MongoDB before starting the server
connectDB();

// Parse incoming request bodies
app.use(bodyParser.json());
// Allow anyone to make CORS requests
app.use(cors());

// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

// Create new contact
app.post('/api/contacts', async (req, res) => {
  try {
    // Validate incoming data (optional)
    const { name, phoneNumber, email, hobbies } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Missing required fields (name, email)' });
    }

    const newContact = new Contact({ name, phoneNumber, email, hobbies });
    const createdContact = await newContact.save();
    res.status(201).json(createdContact);
  } catch (error) {
    console.error(error);
    // Handle specific errors (e.g., duplicate email)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate email address' });
    }
    res.status(400).json({ message: 'Error creating contact' });
  }
});

// Update existing contact
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    // Validate update data (optional)

    const updatedContact = await Contact.findByIdAndUpdate(id, update, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating contact' });
  }
});

// Delete contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedContact = await Contact.findByIdAndDelete(id);
    console.log(deletedContact);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
