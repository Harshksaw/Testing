import React, { useState } from 'react';
import axios from 'axios';
import EditForm from './EditForm';
import ContactDataCell from './ContactDataCell';
import ActionButtons from './ActionButton';
import SelectCheckbox from './SelectBox';

interface TableProps {
  contacts: any[];
  onDelete: (id: string) => void;
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
    <table className="table w-full mt-10">
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
              <ActionButtons
                id={contact._id}
                handleEditClick={() => handleEditClick(contact._id)}
                handleDelete={() => handleDelete(contact._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;