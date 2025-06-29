import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional if you want to style based on theme

function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">TaskMgr</div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/my-tasks">My Tasks</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>

    </nav>
  );
}

export default Navbar;
