import React, { useState } from 'react';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', status: 'todo' },
    { id: 2, text: 'Build Task Board', status: 'todo' },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, status: 'todo' }]);
    setNewTask('');
  };

  const completeTask = (id) => {
    // TODO: Implement task completion logic
    // Find the task with the given id and change its status to 'done'
  };

  return (
    <div className="container">
      <h1>Task Board</h1>
      <form onSubmit={addTask}>
        <input 
          data-testid="task-input"
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="New Task"
        />
        <button type="submit" data-testid="add-task-btn">Add</button>
      </form>

      <div className="board">
        <div className="column" data-testid="todo-column">
          <h2>To Do</h2>
          {tasks.filter(t => t.status === 'todo').map(t => (
            <div key={t.id} className="task" data-testid={`task-${t.id}`}>
              <span>{t.text}</span>
              <button onClick={() => completeTask(t.id)} data-testid={`complete-btn-${t.id}`}>
                Done
              </button>
            </div>
          ))}
        </div>
        
        <div className="column" data-testid="done-column">
          <h2>Completed</h2>
          {tasks.filter(t => t.status === 'done').map(t => (
            <div key={t.id} className="task completed" data-testid={`task-${t.id}`}>
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
