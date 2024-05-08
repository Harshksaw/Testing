
import React, { createContext, useState, useEffect, useContext } from 'react';

const TodoContext = createContext({
  todos: [],
  setTodos: () => {},
  handleMarkComplete: () => {},
  handleDeleteTodo: () => {},
  handleEditTodo: () => {},
});

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from API on component mount
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);



  const handleEditTodo = async (todo) => {
    

    const title = todo.title;
    console.log(title)

    if (title) {  
      const updatedTodo = { ...todos, title };
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedTodo),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setTodos(prevTodos => prevTodos.map(t => (t.id === todo.id ? updatedTodo : t)));
        // setSelectedTodo(updatedTodo); // Update selectedTodo state
      } else {
        console.error('Error updating todo:', response.statusText);
      }
    }
  }
  const handleMarkComplete = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed }; 
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedTodo),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {

      setTodos(prevTodos => prevTodos.map(t => (t.id === todo.id ? updatedTodo : t)));
      console.log('Todo marked complete:', updatedTodo);
      console.log(todo)
      console.log(todos)
    } else {
      console.error('Error marking todo complete:', response.statusText);

    }
  };

  const handleDeleteTodo = async (todo) => {

    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {

      setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
    } else {
      console.error('Error deleting todo:', response.statusText);

    }
  };

  const value = {
    todos,
    setTodos,
    handleMarkComplete,
    handleDeleteTodo,
    handleEditTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export { TodoContext, TodoProvider };
