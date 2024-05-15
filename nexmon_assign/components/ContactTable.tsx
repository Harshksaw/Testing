import React from 'react';
import { Contact } from '../types/Contact';

interface ContactTableProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
  onEdit: (contact: Contact) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({ contacts, onDelete, onEdit }) => {
  return (
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" /></th> {/* Select all checkbox */}
          <th>ID</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Hobbies</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td><input type="checkbox" /></td> {/* Individual select checkbox */}
            <td>{contact.id}</td>
            <td>{contact.name}</td>
            <td>{contact.phoneNumber}</td>
            <td>{contact.email}</td>
            <td>{contact.hobbies}</td>
            <td>
              <button onClick={() => onEdit(contact)}>Edit</button>
              <button onClick={() => onDelete(contact.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;
