const ActionButtons = ({ id, handleEditClick, handleDelete }) => (
    <div className="flex space-x-2">
      <button
        onClick={() => handleEditClick(id)}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center
         text-white bg-blue-600 rounded-full hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-red-500"
      >
        Edit
      </button>
      <button
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center
         text-white bg-red-600 rounded-full hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );

  export default ActionButtons;