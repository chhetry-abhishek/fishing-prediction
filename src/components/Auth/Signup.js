import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../../firebase'; 
import './Signup.css';
import Footer from '../Footer';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={handleSignup}>
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
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <div className="already-member">
          <p>Already a member? <Link to="/login">Login</Link></p>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
