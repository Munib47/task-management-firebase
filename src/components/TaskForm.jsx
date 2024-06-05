import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ addTask }) => {
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ description, completed });
    setDescription('');
    setCompleted(false);
  };

  return (
    <form className="task-form" onKeyDown={(e)=> e.code == "Enter" ? {handleSubmit}: ''} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
