import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';


function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    // Fetch todos from API on component mount
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleTodoClick = async (todo) => {
    // Fetch complete details of the selected todo
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`);
    const detailedTodo = await response.json();
    setSelectedTodo(detailedTodo);
  };

  const handleMarkComplete = async (todo) => {
    // Update todo status to completed
    const updatedTodo = { ...todo, completed: !todo.completed }; 
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedTodo),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {

      setTodos(prevTodos => prevTodos.map(t => (t.id === todo.id ? updatedTodo : t)));
    } else {
      console.error('Error marking todo complete:', response.statusText);

    }
  };

  const handleDeleteTodo = async (todo) => {
    // Delete the selected todo
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {

      setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
    } else {
      console.error('Error deleting todo:', response.statusText);

    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-[80%] h-[80%] overflow-hidden  shadow rounded  border-black border-2 "> 
        <div className="flex flex-row h-full"> {/* Inner box with two columns */}
        <div>

          <TodoList todos={todos} onTodoClick={handleTodoClick} />
        </div>
        <div className="w-1/2 border-l border-#453c3c-200 flex items-center"> {/* Detail view */}

          {selectedTodo && (
            <TodoDetail
            todo={selectedTodo}
            onMarkComplete={handleMarkComplete}
            onDelete={handleDeleteTodo}
            />
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
