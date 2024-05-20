const EditForm = ({ editData, handleChange, handleSave, handleCancel }:any) => {
    return (
      <div className="rounded-md">
        <div className="fixed inset-0 flex   items-center justify-center z-50 ">
          <div className="bg-white rounded-lg p-8 flex flex-col min-w-96  ">
            <h2 className="text-2xl font-bold mb-4">Edit Data</h2>
            <input
              autoFocus
              
              name="name"
              
              type="text"
              value={editData?.name || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 mb-4"
            />
            <input
              
              name="phoneNumber"

              type="tel"
              value={editData?.phoneNumber || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 mb-4"
            />
            {/* ... Add more fields as needed ... */}
            <div className="flex justify-end">
              <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
                Cancel
              </button>
              <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default EditForm;