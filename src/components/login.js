import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === '1234') {
      setError('');
      onLogin(); // calls the login function from App.js
    } else {
      setError('❌ Invalid username or password');
    }
  };

  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#f8f8f8',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h2>🔐 Smart Home Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '10px', margin: '10px', width: '200px' }}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', margin: '10px', width: '200px' }}
        /><br />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0077ff',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
