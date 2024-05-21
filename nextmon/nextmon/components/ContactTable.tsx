'use client'
import React, { useState } from 'react';
import axios from 'axios';

import ContactDataCell from './ContactDataCell';

import SelectCheckbox from './SelectBox';
import EditForm from './EditForm';

interface TableProps {
  contacts: any[];
  onDelete: (id: any) => void;
  onUpdate: (contact: any) => void;
  setContacts: (contacts: any[]) => void; 
}

const ContactTable = ({ contacts, onDelete, onUpdate, setContacts }: TableProps) => {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  const URL = 'https://testing-9ksj.onrender.com'

  const handleEditClick = (id: string) => {
    const contactToEdit = contacts.find((contact) => contact._id === id);
    setEditData(contactToEdit);
    setOpen(true);
  };

  const handleEdit = async () => {
    try {
    
      setOpen(!open);
    
    } catch (error) {
      console.error('Error updating contact', error);
    }
  };
  const handleSave = async(editData : any) => {
    console.log(editData)
    // find the index of the contact being edited
    const res = await axios.put(`${URL}/api/contacts/${editData._id}`, editData);
    console.log(res)
    if (res.status === 200) {
      onUpdate(res.data);
      setOpen(!open);
      const index = contacts.findIndex(contact => contact._id === editData._id);

      // create a new array with the updated contact
      const newContacts = [...contacts];
      newContacts[index] = res.data;
    
      // update the contacts state
      setContacts(newContacts);
      


    } else {
      console.error('Error updating contact');
    }

  
  };


  return (
    <table className="table w-full mt-10 text-yellow-50">
      <thead>
        <tr>
          <th>Select</th>
          <th>ID</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Hobbies</th>

        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, index) => (
          <tr key={index} className="border-b border-gray-200 py-4 text-center">
            <td>
              <SelectCheckbox


              />
            </td>
            <ContactDataCell contact={contact._id} />
            <ContactDataCell contact={contact.name} />
            <ContactDataCell contact={contact.phoneNumber} />
            <ContactDataCell contact={contact.email} />
            <ContactDataCell contact={contact.hobbies} />
            <td>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit()}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center
         text-white bg-blue-600 rounded-full hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-red-500"
                >
                  Edit
                </button>

                {open && <EditForm handleEdit={handleEdit}  editData={contact} handleSave={handleSave}/>}
                <button
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center
  text-white bg-red-600 rounded-full hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500"
                  onClick={() => onDelete(contact._id)}
                >
                  Delete

                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;