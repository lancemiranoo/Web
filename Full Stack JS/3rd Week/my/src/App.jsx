import React, { useState } from 'react';
import ToDoList from './ToDoList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask(""); // Clear the input
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do-List</h1>
      <input
        type='text'
        value={newTask}
        onChange={ (e) => setNewTask(e.target.value)}
        placeholder='Enter a task'
        />
        <button onClick={addTask}>Add Task</button>
        <ToDoList tasks={tasks} removeTask ={removeTask} />
    </div>
  );
}

export default App;