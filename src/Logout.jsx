import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session/localStorage
    localStorage.removeItem('loggedInUser');
    // Optionally clear all
    // localStorage.clear();

    setMessage('✅ Successfully Logged out.');

    // Redirect after 2 seconds
    const timer = setTimeout(() => {
      navigate('/'); // change this if your login path differs
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.message}>{message}</h2>
    </div>
  );
}

const styles = {
  container: {
    padding: '60px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginTop: '100px',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
  },
  message: {
    color: 'green',
    fontSize: '22px',
  },
};

export default Logout;
