import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email and password
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length === 0) {
      setError('Please enter a password');
      return;
    }

    // Send login request to the REST service
    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the REST service
        console.log(data);
        setError(`Result: ${data.token}`);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Assessment-Login</h3>
        <label>
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            data-testid="email"
          />
        </label>
        <br />
        <label>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            data-testid="password"
          />
        </label>
        <br />
        {error && <p data-testid="error-msg">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;