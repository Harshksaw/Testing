import React, { useState } from 'react';
import { Contact } from '../types/Contact';

  
interface ContactFormProps {
  onSubmit: (contact: Contact) => void;
  initialValues?: Contact; // Optional initial values for editing
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialValues }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(initialValues?.phoneNumber || '');
  const [email, setEmail] = useState(initialValues?.email || '');
  const [hobbies, setHobbies] = useState(initialValues?.hobbies || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ id: Date.now(), name, phoneNumber, email, hobbies });
    // Clear form after submission
    setName('');
    setPhoneNumber('');
    setEmail('');
    setHobbies('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields with appropriate input types and labels */}
      <button type="submit">Save</button>
    </form>
  );
};

export default ContactForm;
