import React, { useState } from 'react';
import './login.css';  // Optional for styling
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  // State for handling form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    // e.preventDefault();

    // // Simple validation
    // if (!email || !password) {
    //   setErrorMessage('Please fill out both fields');
    //   return;
    // }

    // // Example of login logic (replace with actual API call if needed)
    // if (email === 'user@example.com' && password === 'password123') {
    //   alert('Login successful');
    //   // Redirect to another page or update app state here
    // } else {
    //   setErrorMessage('Invalid credentials, please try again');
    // }

    navigate("/dashboard")
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {errorMessage && <div className="error">{errorMessage}</div>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
