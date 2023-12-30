// src/App.js

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: uuidv4(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (taskId, text) => {
    setEditingTask(taskId);
    setEditedText(text);
  };

  const finishEditing = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedText("");
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={task.id} className={`todo-item ${task.id === editingTask ? "editing" : ""}`}>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)}
              />
              <span>{`${index + 1}. ${task.text}`}</span>
            </div>
            {task.id === editingTask ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => finishEditing(task.id)} className="edit-button">
                  Save
                </button>
              </>
            ) : (
              <div>
                <button onClick={() => startEditing(task.id, task.text)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)} className="delete-button">
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
