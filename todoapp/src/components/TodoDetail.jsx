import React from 'react';

function TodoDetail({ todo, onMarkComplete, onDelete }) {
  if (!todo) return null;

  console.log(todo);

  return (
    <div className="flex flex-col gap-10 w-full  ">

        <div className='flex flex-col items-center justify-center  bg-blue-100'>

        <h2><span className='bold'>Title:</span>  {todo.title}</h2>
        <h2><span className='bold'>UserId:</span> {todo.userId}</h2>
        </div>
      <div className="flex  mt-4 gap-5 justify-center items-center">
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
      </div>
    </div>
  );
}

export default TodoDetail;
