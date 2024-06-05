import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, editTask, deleteTask }) => {
  const { id, description, completed } = task;

  const handleCheckboxChange = (e) => {
    editTask(id, { completed: e.target.checked });
  };

  return (
    <div className="task-item">
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <span className={completed ? "completed" : ""}>{description}</span>
      </div>
      <div style={{display: 'flex', justifyContent: 'end', width: '30%'}}>
        <button onClick={() => deleteTask(id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
