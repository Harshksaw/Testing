import React from 'react';

function TodoList({ todos, onTodoClick }) {
  const handleTodoClick = (todo) => {
    onTodoClick(todo);
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 border-b border-gray-200"> {/* Scrollable todo list */}
      <ul className=''>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`bg-white   hover:bg-gray-100 p-2 ${todo.selected ? 'bg-gray-200' : ''}`}
            onClick={() => handleTodoClick(todo)}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default TodoList;

