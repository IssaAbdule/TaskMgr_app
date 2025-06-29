import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [notStartedTasks, setNotStartedTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser && users[loggedInUser]) {
      const tasks = users[loggedInUser].tasks || [];
      setTotalTasks(tasks.length);

      setCompletedTasks(tasks.filter(task => task.status === 'Completed').length);
      setNotStartedTasks(tasks.filter(task => task.status === 'Not Started').length);
      setInProgressTasks(tasks.filter(task => task.status === 'In Progress').length);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>
        <div className="stat-card completed">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>
        <div className="stat-card in-progress">
          <h3>In Progress</h3>
          <p>{inProgressTasks}</p>
        </div>
        <div className="stat-card not-started">
          <h3>Not Started</h3>
          <p>{notStartedTasks}</p>
        </div>
      </div>
      <button className="go-to-tasks-btn" onClick={() => navigate('/my-tasks')}>
        Go to My Tasks
      </button>
    </div>
  );
}

export default Dashboard;
