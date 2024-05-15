'use client'

// app/page.tsx

import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import ContactTable from '../components/ContactTable';
import { Contact } from '../types/Contact';
import Layout from './layout'; // Import the layout component
import connectDB from '../lib/dbConnect'; // Import the connectDB function

const HomePage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      await connectDB(); // Connect to MongoDB before fetching data
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data as Contact[]);
    };

    fetchContacts();
  }, []);

  const handleAddContact = (newContact: Contact) => {
    setContacts([...contacts, newContact]);
    // Replace with actual API call to create contact on backend
    fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => console.log('Contact creation:', data));
  };

  const handleEditContact = (updatedContact: Contact) => {
    setContacts(
      contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
    );
    // Replace with actual API call to update contact on backend
    fetch(`/api/contacts/${updatedContact.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedContact),
    })
      .then((response) => response.json())
      .then((data) => console.log('Contact update:', data));
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    // Replace with actual API call to delete contact on backend
    fetch(`/api/contacts/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => console.log('Contact deletion:', data));
  };

  return (
    <Layout>
      {/* Contact form and table components */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Contacts</h1>
        <button className="btn btn-primary">Add New Contact</button> {/* Replace with actual button component */}
      </div>
      <ContactForm onSubmit={handleAddContact} />
      <ContactTable contacts={contacts} onDelete={handleDeleteContact} onEdit={handleEditContact} />
    </Layout>
  );
};

export default HomePage;
