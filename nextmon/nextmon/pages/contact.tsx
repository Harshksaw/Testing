'use client'

import React, { useState, useEffect } from 'react';
import ContactTable from '../components/Contact';
import ContactForm from '../components/AddContactForm'; // Import ContactForm

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  hobbies: string;
}

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data);
    };

    fetchContacts();
  }, []);

  const handleEdit = (id: string) => {
    // Handle edit navigation (e.g., redirect to edit page)
    console.log('Edit contact:', id);
  };

  const handleDelete = (id: string) => {
    setSelectedContacts((prev) => prev.filter((selectedId) => selectedId !== id));
    // Implement API call to delete the contact
  };

  const handleSelectChange = (id: string, checked: boolean) => {
    setSelectedContacts((prev) => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter((selectedId) => selectedId !== id);
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <ContactForm /> {/* Add ContactForm component */}
      <ContactTable
        contacts={contacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedContacts={selectedContacts}
        onSelectChange={handleSelectChange}
      />
    </div>
  );
};

export default ContactsPage;
