import React, { useState } from 'react';


const EditModal = ({ defaultData, handleEdit }: any) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(defaultData);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    const handleSubmit = () => {
        handleEdit(data);
        handleClose();
    };
    return (
        <div className='rounded-md'>
           

                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Edit Data</h2>
                        <input
                            autoFocus
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        <input
                            name="phonenumber"
                            type="number"
                            value={data.phoneNumber}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        <input
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        <input
                            name="hobbies"
                            type="text"
                            value={data.hobbies}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        {/* Add more fields as needed */}
                        <div className="flex justify-end">
                            <button onClick={handleClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Cancel
                            </button>
                            <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>

        </div>
    );
};
export default EditModal;

