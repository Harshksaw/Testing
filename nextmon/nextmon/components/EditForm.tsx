import { useState } from 'react';

const EditForm = ({ handleEdit, editData, handleSave }:any) => {
  const [formData, setFormData] = useState(editData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveClick = () => {
    handleSave(formData);
  };

  return (
    <div className="rounded-md">
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="bg-white rounded-lg p-8 flex flex-col min-w-96">
          <h2 className="text-2xl font-bold mb-4">Edit Data</h2>

          <label htmlFor="name" className="text-white font-medium">
            Name
          </label>
          <input
            autoFocus
            name="name"
            type="text"
            value={formData.name || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 mb-4"
          />

          <label htmlFor="phoneNumber" className="text-white font-medium">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 mb-4"
          />

          <label htmlFor="email" className="text-white font-medium">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 mb-4"
          />

          <label htmlFor="hobbies" className="text-white font-medium">
            Hobbies
          </label>
          <input
            name="hobbies"
            type="text"
            value={formData.hobbies || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 mb-4"
          />

          <div className="flex justify-end">
            <button onClick={()=> handleEdit()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button onClick={()=> handleSave(formData)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;