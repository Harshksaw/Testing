// app/api/contacts.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import Contact from '../../types/Contact'; 
import ContactSchema from '../../models/contact.model'
import connectDB from '../../lib/dbConnect'; // Import the connectDB function

export default async function handler(req: NextApiRequest, res: NextApiResponse<Contact[] | string>) {
  await connectDB(); // Connect to MongoDB before processing requests



  switch (req.method) {
    case 'GET':
      try {
        res.status(200).json({ message: 'Health check passed' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error performing health check' });
      }
      break;
    case 'POST':
      try {
        const newContact: Contact = req.body;
        const createdContact = await ContactSchema.create(newContact); // Create a new contact
        res.status(201).json(createdContact);
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating contact' });
      }
      break;
    case 'PUT':
      try {
        const updatedContact: Contact = req.body;
        const { id } = updatedContact; // Assuming ID is present in the request body
        const updatedDoc = await ContactSchema.findByIdAndUpdate(id, updatedContact, { new: true }); // Update existing contact
        if (!updatedDoc) {
          return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(updatedDoc);
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error updating contact' });
      }
      break;
    case 'DELETE':
      try {
        const id = req.query.id as string;
        const deletedContact = await ContactSchema.findByIdAndDelete(id); // Delete contact by ID
        if (!deletedContact) {
          return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting contact' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
