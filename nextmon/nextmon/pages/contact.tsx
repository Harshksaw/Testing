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

  const updateContact = async () => {
    try {
      
      // setContacts(updatedContacts);

    } catch (error) {
      console.error(error);
    }
  };


  const deleteContact = async (id: any) => {
    try {
      console.log(id)
      const res =  await axios.delete(`${URL}/api/contacts/${id}`);
      console.log(res)
  
      console.log(contacts)
      setContacts(contacts.filter((contact : any) => contact._id != id));
      console.log(contacts)
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
        setContacts={setContacts}
        onDelete={deleteContact}
        onUpdate={updateContact} 
      />
    </div>
  );
};

export default Contact;