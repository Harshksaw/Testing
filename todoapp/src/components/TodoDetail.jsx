
import React, { useState } from 'react';


  function TodoDetail({ todo, onMarkComplete, onDelete, onEditTodo }) {



    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);

  

    const handleEdit = () => {
      setEditing(true);
    };

    const handleSave = () => {
      onEditTodo({
        ...todo,
        title: editedTitle
      });
      setEditing(false);
    };

    const handleCancel = () => {
      setEditing(false);
      setEditedTitle(todo.title);
    };

    if (!todo) return null;

    return (
      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-col items-center justify-center bg-blue-100">
          {editing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <h2>
              <span className="bold">Title:</span> {todo.title}
            </h2>
          )}
          <h2>
            <span className="bold">UserId:</span> {todo.userId}
          </h2>
        </div>
        <div className="flex mt-4 gap-5 justify-center items-center">
          {editing ? (
            <>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => onMarkComplete(todo)}
              >
                {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => onDelete(todo)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleEdit}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

 export default TodoDetail;
