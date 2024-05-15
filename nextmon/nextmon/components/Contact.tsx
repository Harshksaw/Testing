import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  hobbies: string;
}

interface ContactTableProps {
  contacts: Contact[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  selectedContacts: string[]; // Array of selected contact IDs
  onSelectChange: (id: string, checked: boolean) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  onEdit,
  onDelete,
  selectedContacts,
  onSelectChange,
}) => {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/contacts/${id}/edit`); // Navigate to edit form
  };

  const handleDelete = async (id: string) => {
    // Implement API call to delete the contact
    const response = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
    if (response.ok) {
      onDelete(id); // Update state after successful deletion
    } else {
      console.error('Error deleting contact');
    }
  };

  const columns = [
    {
      title: 'Select',
      dataIndex: 'id',
      render: (id: string) => (
        <input
          type="checkbox"
          checked={selectedContacts.includes(id)}
          onChange={(event) => onSelectChange(id, event.target.checked)}
          className="text-blue-600 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      ),
    },
    { title: 'ID', dataIndex: 'id', className: 'text-left px-6' },
    { title: 'Name', dataIndex: 'name', className: 'text-left px-6' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', className: 'text-left px-6' },
    { title: 'Email', dataIndex: 'email', className: 'text-left px-6' },
    { title: 'Hobbies', dataIndex: 'hobbies', className: 'text-left px-6' },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (id: string) => (
        <div className="flex space-x-2">
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500"
            onClick={() => handleEdit(id)}
          >
            Edit
          </button>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-full hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <table className="table w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.dataIndex} className="text-left px-6 py-3 bg-gray-100">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id} className="border-b border-gray-200">
            {columns.map((column) => (
              <td key={column.dataIndex} className={column.className || ''}>
                {column.render ? column.render(contact[column.dataIndex]) : contact[column.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;
