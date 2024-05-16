'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';

interface Contact {
  name: string;
  phoneNumber: string;
  email: string;
  hobbies: string;
}

const ContactForm: React.FC = ({setAddContact}:any) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [hobbies, setHobbies] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submit form:', { name, phoneNumber, email, hobbies });

    const newContact: Contact = {
      name,
      phoneNumber,
      email,
      hobbies,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/contacts', {
        name,
        phoneNumber,
        email,
        hobbies,
      });

      if (response.status === 200) {
        setName('');
        setPhoneNumber('');
        setEmail('');
        setHobbies('');
        setAddContact();
      } else {
        console.error('Error creating contact');
      }
      
    } catch (error) {
      console.error('Error creating contact:', error);
      
      
    }

    // Implement API call to create a new contact
   

   
  };

  return (
    <div className=" mx-auto max-w-[50%] px-6 py-4 bg-gray-800 text-white  rounded-sm ">
      <h2 className="text-2xl font-semibold mb-2">Add New Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-2 text-white text-2xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {/* Name */}
          <label htmlFor="name" className="block  font-medium text-xl text-white ">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          />

          {/* Phone Number */}
          <label htmlFor="phoneNumber" className="block  font-medium text-xl text-white">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          />

          {/* Email */}
          <label htmlFor="email" className="block  font-medium text-xl text-white">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          />

          {/* Hobbies */}
          <label htmlFor="hobbies" className="block  font-medium text-xl text-white">
            Hobbies:
          </label>
          <textarea
            id="hobbies"
            rows={4}
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2  font-medium text-xl text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            // onClick={handleSubmit}

          >
            Add Contact
          </button>
        </div>
            </form>

    </div>
  );
};

export default ContactForm;
