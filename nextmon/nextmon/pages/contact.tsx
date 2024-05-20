'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm  from '../components/AddContactForm';
import ContactTable  from '../components/ContactTable';

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

  const addContact = async (newContact) => {
    try {
      console.log(newContact);
      const response = await axios.post('http://localhost:3000/api/contacts', newContact);
      setContacts([...contacts, response.data]); 
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async (updatedContact) => {
    try {
      const updatedContacts = await Promise.all(
        contacts.map(async (contact) => {
          if (contact._id === updatedContact._id) {
            const response = await axios.put(`/api/contacts/${contact._id}`, updatedContact);
            return response.data;
          }
          return contact;
        })
      );
      setContacts(updatedContacts);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" px-4 py-8  ">
      <h1 className="text-2xl font-bold mb-4">Contact Manager</h1>
      <div className='flex justify-center items-center bg-gray-900 '>

      <ContactForm onSubmit={addContact} />
      </div>
      <ContactTable
        contacts={contacts}
        onDelete={deleteContact}
        onUpdate={updateContact} // Assuming ContactTable handles updates
      />
    </div>
  );
};

export default Contact;