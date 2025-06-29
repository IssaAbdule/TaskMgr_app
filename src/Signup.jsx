import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';



function Signup(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email]) {
        alert('User with this email already exists.');
        return;
    }

    users[email] = {
        password: password,
        tasks: []  // start with empty task list
    };

    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful. You can now log in.');
    navigate('/');
    };

    return(
        <div className="form-container">
            <h2>Sign up</h2>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button onClick={handleSignup}>Sign up</button>
            <p>Already have an acount? <Link to="/">Log in</Link></p>


        </div>
    );

}

export default Signup;