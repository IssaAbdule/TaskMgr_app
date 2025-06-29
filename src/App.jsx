import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './Dashboard'; // you'll create this component
import Login from './Login';
import Logout from './Logout';
import MyTasks from './MyTasks';
import Navbar from './Navbar';
import Search from './Search';
import Signup from './Signup';
import './index.css';


function App() {
  return(
    <Router>
      {/* Navbar stays visible across routes */}
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/logout" element={<Logout/>} />

      </Routes>
    </Router>
  );
}

export default App
