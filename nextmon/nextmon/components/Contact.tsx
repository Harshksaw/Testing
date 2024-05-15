import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import EditModal from './EditModal';

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
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);


  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get('http://localhost:3000/api/contacts');
      if (response.status === 200) {
        console.log('Contacts:', response.data);


      } else {
        console.error('Error fetching contacts');
      }
    };

    fetchContacts();
  }, [refresh]);
  const handleEditClick = (id) => {
    const contactToEdit = contacts.find(contact => contact._id === id);
    setEditData(contactToEdit);
    setOpen(true);
  };
  const handleEdit = async() => {
    // Update the contact in your state or backend
    // ...

    const res = await axios.put(`http://localhost:3000/api/contacts/${editData._id}`, editData);
    if (res.status === 200) {
      setOpen(false);
      onDelete()
      setRefresh(!refresh); // Refresh the contact list
    } else {
      console.error('Error updating contact');
    }
    setOpen(false);
  };



  const handleDelete = async (id: string) => {
    // Implement API call to delete the contact
    const response = await axios.delete(`http://localhost:3000/api/contacts/${id}`);
    if (response.status === 200) {
      onDelete()


      setRefresh(!refresh); // Refresh the contact list
    } else {
      console.error('Error deleting contact');
    }
  };

  const handleChange = (event) => {
    setEditData({ ...editData, [event.target.name]: event.target.value });
  };

  const columns = [
    {
      title: 'Select',
      dataIndex: '_id',
      render: (id: string) => (
        <input
          type="checkbox"
          checked={selectedContacts.includes(id)}
          onChange={(event) => onSelectChange(id, event.target.checked)}
          className="text-blue-600 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      ),
    },
    { title: 'ID', dataIndex: '_id', className: 'text-left px-6 py-4' },
    { title: 'Name', dataIndex: 'name', className: 'text-left px-6 py-4' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', className: 'text-left px-6 py-4' },
    { title: 'Email', dataIndex: 'email', className: 'text-left px-6 py-4' },
    { title: 'Hobbies', dataIndex: 'hobbies', className: 'text-left px-6 py-4' },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id: string) => (
        <div className="flex space-x-2">

          <div>
            {/* ... */}
            <button onClick={() => handleEditClick(id)} 
            className="inline-flex items-center px-3 py-2 
            text-sm font-medium text-center text-white bg-blue-600 rounded-full hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-red-500"
            >Edit</button>

            {
              open &&(
                <div className='rounded-md'>


                <div className="fixed inset-0 flex   items-center justify-center z-50 ">
                  <div className="bg-white rounded-lg p-8 flex flex-col min-w-96 bg-gray-300  ">
                    <h2 className="text-2xl font-bold mb-4">Edit Data</h2>
                    <input
                      autoFocus
                      margin="dense"
                      name="name"
                      label="Name"
                      type="text"
                      value={editData?.name || ''}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 mb-4"
                    />
                    <input
                      margin="dense"
                      name="phoneNumber"
                      label="Phone Number"
                      type="tel"
                      value={editData?.phoneNumber || ''}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 mb-4"
                    />
                    <input
                      margin="dense"
                      name="email"
                      label="Email"
                      type="email"
                      value={editData?.email || ''}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 mb-4"
                    />
                    <input
                      margin="dense"
                      name="hobbies"
                      label="Hobbies"
                      type="text"
                      value={editData?.hobbies || ''}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 mb-4"
                    />
                    {/* Add more fields as needed */}
                    <div className="flex justify-end">
                      <button onClick={() => setOpen(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Cancel
                      </button>
                      <button onClick={handleEdit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
  
              </div>

              )
            }
          


            {/* ... */}

            <button
              className="inline-flex items-center px-3 py-2 
              text-sm font-medium text-center text-white bg-red-600 rounded-full hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <table className="table w-full ">
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
          <tr key={contact.id} className="border-b border-gray-200 py-4">
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
