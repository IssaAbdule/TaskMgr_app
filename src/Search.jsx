import { useEffect, useState } from 'react';
import './Search.css';

function Search() {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser && users[loggedInUser]) {
      const tasks = users[loggedInUser].tasks || [];
      setAllTasks(tasks);
      setFilteredTasks(tasks);
    }
  };

  const saveTasks = (updatedTasks) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser && users[loggedInUser]) {
      users[loggedInUser].tasks = updatedTasks;
      localStorage.setItem('users', JSON.stringify(users));
      setAllTasks(updatedTasks);
      applyFilter(updatedTasks);
    }
  };

  const applyFilter = (tasksToFilter = allTasks) => {
    const results = tasksToFilter.filter(task => {
      const titleMatch = task.title.toLowerCase().includes(searchTitle.toLowerCase());
      const statusMatch = searchStatus ? task.status === searchStatus : true;
      const dateMatch = searchDate ? task.dueDate === searchDate : true;
      return titleMatch && statusMatch && dateMatch;
    });
    setFilteredTasks(results);
  };

  const filterTasks = () => {
    applyFilter();
  };

  const editTask = (index) => {
    const taskToEdit = filteredTasks[index];

    const newTitle = prompt('Edit task title:', taskToEdit.title);
    if (newTitle === null || newTitle.trim() === '') return;

    const newDueDate = prompt('Edit due date (YYYY-MM-DD):', taskToEdit.dueDate || '');
    if (newDueDate === null) return;

    const originalIndex = allTasks.findIndex(t => t.createdAt === taskToEdit.createdAt);
    if (originalIndex !== -1) {
      const updatedTasks = [...allTasks];
      updatedTasks[originalIndex] = {
        ...updatedTasks[originalIndex],
        title: newTitle,
        dueDate: newDueDate,
      };
      saveTasks(updatedTasks);
    }
  };
  
  const deleteTask = (index) => {
    const taskToDelete = filteredTasks[index];
    const updatedTasks = allTasks.filter(t => t.createdAt !== taskToDelete.createdAt);
    saveTasks(updatedTasks);
  };

  const updateStatus = (index, newStatus) => {
    const taskToUpdate = filteredTasks[index];
    const originalIndex = allTasks.findIndex(t => t.createdAt === taskToUpdate.createdAt);
    if (originalIndex !== -1) {
      const updatedTasks = [...allTasks];
      updatedTasks[originalIndex].status = newStatus;
      saveTasks(updatedTasks);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Tasks</h2>
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <select value={searchStatus} onChange={(e) => setSearchStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={filterTasks}>Search</button>
      </div>

      <ul className="task-results">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">No matching tasks found.</p>
        ) : (
          filteredTasks.map((task, index) => (
            <li
              key={task.createdAt}
              className={`task-item ${task.status.replace(' ', '-').toLowerCase()}`}
            >
              <div className="task-header">
                <strong>{task.title}</strong>
                <div className="task-icons">
                  <button onClick={() => editTask(index)} title="Edit" className="icon-button">✏️</button>
                  <button onClick={() => deleteTask(index)} title="Delete" className="icon-button">🗑️</button>
                </div>
              </div>

              <p>
                Status:{' '}
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(index, e.target.value)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </p>
              <p>Due: {task.dueDate || 'Not set'}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Search;
