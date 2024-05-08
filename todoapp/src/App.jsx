import React, { useContext, useState } from 'react';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';

import { TodoContext, TodoProvider } from './TodoProvider';

function App() {
  const { todos, setTodos, handleMarkComplete, handleDeleteTodo, handleEditTodo } = useContext(TodoContext);

  const [selectedTodo, setSelectedTodo] = useState(null);
  
  const handleTodoClick = async (todo) => {
    // Fetch complete details of the selected todo
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`);
    const detailedTodo = await response.json();
    setSelectedTodo(detailedTodo);
  };

  return (
    <TodoProvider>
      <div className="flex h-screen justify-center items-center">
        <div className="w-[80%] h-[80%] overflow-hidden  shadow rounded  border-black border-2 "> 
          <div className="flex flex-row h-full"> 
          <div>
          
            <TodoList todos={todos} onTodoClick={handleTodoClick} />
          </div>
          <div className="w-1/2 border-l border-#453c3c-200 flex items-center"> {/* Detail view */}

            {selectedTodo && (
              <TodoDetail
              todo={selectedTodo}
              onMarkComplete={handleMarkComplete}
              onDelete={handleDeleteTodo}
              onEditTodo={handleEditTodo}
              />
            )}
          </div>
        </div>
      </div>
      </div>
    </TodoProvider>
  );
}

export default App;
