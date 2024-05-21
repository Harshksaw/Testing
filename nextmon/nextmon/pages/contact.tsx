'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm  from '../components/AddContactForm';
import ContactTable  from '../components/ContactTable';

const Contact = () => {
  const URL ='https://testing-9ksj.onrender.com'
  const [contacts, setContacts] = useState<any>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${URL}/api/contacts`);
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

  const addContact = async ({newContact }: any) => {
    try {
      console.log(newContact) 

      const response = await axios.post(`${URL}/api/contacts`, newContact);
      console.log(response)
      
      setContacts([...contacts, response.data]); 
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async ({updatedContact}:any) => {
    try {
      const updatedContacts = await Promise.all(
        contacts.map(async (contact :any) => {
          if (contact._id === updatedContact._id) {
            const response = await axios.put(`${URL}/api/contacts/${contact._id}`, updatedContact);
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


  const deleteContact = async ({id} :any) => {
    try {
      console.log(id)
     const res =  await axios.delete(`${URL}/api/contacts/${id}`);
      console.log(res)

      

      setContacts(contacts.filter((contact : any) => contact._id != id));
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
        onUpdate={updateContact} 
      />
    </div>
  );
};

export default Contact;