import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../firebase';
import './Login.css';
import Footer from '../Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
      })
      .catch((error) => {
        setError('Failed to login. Please check your credentials.');
      });
  };

  return (
    <div>
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <div className="not-member">
          <p>Not a member? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default Login;
