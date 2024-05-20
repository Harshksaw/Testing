import React, { useState } from 'react';
import axios from 'axios';
import EditForm from './EditForm';
import ContactDataCell from './ContactDataCell';
import ActionButtons from './ActionButton';
import SelectCheckbox from './SelectBox';

interface TableProps {
  contacts: any[];
  onDelete: (id: any) => void;
  onUpdate: (contact: any) => void;
}

const ContactTable = ({ contacts, onDelete, onUpdate }: TableProps) => {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  console.log(contacts);

  const handleEditClick = (id: string) => {
    const contactToEdit = contacts.find((contact) => contact._id === id);
    setEditData(contactToEdit);
    setOpen(true);
  };

  const handleEdit = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/api/contacts/${editData._id}`, editData);
      if (res.status === 200) {
        onUpdate(res.data);
        setOpen(false);
      } else {
        console.error('Error updating contact');
      }
    } catch (error) {
      console.error('Error updating contact', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/contacts/${id}`);
      if (response.status === 200) {
        onDelete(id);
      } else {
        console.error('Error deleting contact');
      }
    } catch (error) {
      console.error('Error deleting contact', error);
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
                id={contact._id}
              // selectedContacts={selectedContacts}
              // onSelectChange={onSelectChange}
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
                  onClick={() => onDelete(contact._id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center
         text-white bg-blue-600 rounded-full hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-red-500"
                >
                  {/* Edit */}
                  {contact._id}
                </button>
                <button
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center
         text-white bg-red-600 rounded-full hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500"
                  onClick={() => handleDelete(contact._id)}
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