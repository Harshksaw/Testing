'use client'
import React, { useState } from 'react';

const ContactForm = ({ onSubmit }:any) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [hobbies, setHobbies] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, email, hobbies });
    setName('');
    setPhoneNumber('');
    setEmail('');
    setHobbies('');

    
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-96 ">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-white font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="phoneNumber" className="text-white font-medium">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-white font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="hobbies" className="text-white font-medium">
          Hobbies
        </label>
        <textarea
          id="hobbies"
          name="hobbies"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1"
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Contact
        </button>        
      </div>
      
      </form>

  )
}
export default ContactForm;