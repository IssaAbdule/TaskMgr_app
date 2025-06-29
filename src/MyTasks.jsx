import { useEffect, useState } from 'react';
import './MyTasks.css';

function MyTasks() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser && users[loggedInUser]) {
      const loadedTasks = users[loggedInUser].tasks || [];
      setTasks(loadedTasks);
    }
  }, []);

  const updateUserTasks = (updatedTasks) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser && users[loggedInUser]) {
      users[loggedInUser].tasks = updatedTasks;
      localStorage.setItem('users', JSON.stringify(users));
      setTasks(updatedTasks);
    }
  };

  const addTask = () => {
    if (taskInput.trim() === '') {
      alert("Empty. Please add a task.");
      return;
    }

    const newTask = {
      title: taskInput,
      done: false,
      status: 'Not Started',
      dueDate: dueDate,
      createdAt: new Date().toISOString()
    };

    const updatedTasks = [...tasks, newTask];
    updateUserTasks(updatedTasks);
    setTaskInput('');
    setDueDate('');
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    updateUserTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    updateUserTasks(updatedTasks);
  };

  const updateStatus = (index, status) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = status;
    updatedTasks[index].done = status === 'Completed';
    updateUserTasks(updatedTasks);
  };

 
  const editTask = (index) => {
    const currentTask = tasks[index];

    const newTitle = prompt("Edit task title:", currentTask.title);
    if (newTitle === null || newTitle.trim() === '') return;

    const newDueDate = prompt("Edit due date (YYYY-MM-DD):", currentTask.dueDate || '');
    if (newDueDate === null) return;

    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...currentTask,
      title: newTitle,
      dueDate: newDueDate,
    };

    updateUserTasks(updatedTasks);
};

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.dueDate || '9999-12-31');
    const dateB = new Date(b.dueDate || '9999-12-31');
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="mytasks-container">
      <h2>My Tasks</h2>

      <div className="task-input-area">
        <input
          type="text"
          placeholder="Add new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="sort-controls">
        <span>Sort by Due Date:</span>
        <button onClick={() => setSortOrder('asc')} title="Sort Ascending">🔼</button>
        <button onClick={() => setSortOrder('desc')} title="Sort Descending">🔽</button>
      </div>

      <ul className="task-list">
        {sortedTasks.map((task, index) => (
          <li key={index} className={task.done ? 'done' : ''}>
            <div>
              <span
                onClick={() => toggleTask(index)}
                style={{ border: '1px solid red', color: 'black', fontSize: '16px' }}
              >
                {task.title || 'No title'}
              </span>
              <div className="task-meta">
                <small>Due: {task.dueDate || 'Not set'}</small>
              </div>
            </div>

            <div className="task-controls">
              <button onClick={() => editTask(index)} title="Edit">✏️</button>
              <button onClick={() => deleteTask(index)} title="Delete">🗑️</button>
              <select
                value={task.status}
                onChange={(e) => updateStatus(index, e.target.value)}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyTasks;
