'use client'

import React, { useState, useEffect } from 'react';
import ContactTable from '../components/Contact';
import ContactForm from '../components/AddContactForm'; // Import ContactForm
import axios from 'axios';

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
  const [onDelete, setOnDelete] = useState(false);  

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await axios('http://localhost:3000/api/contacts');
      console.log('Contacts:', data.data); 

      setContacts(data.data);
    };

    fetchContacts();
  }, [onDelete]);

  const handleEdit = (id: string) => {
    // Handle edit navigation (e.g., redirect to edit page)
    console.log('Edit contact--->:', id);
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
        onDelete={setOnDelete}
        selectedContacts={selectedContacts}
        onSelectChange={handleSelectChange}
      />
    </div>
  );
};

export default ContactsPage;
