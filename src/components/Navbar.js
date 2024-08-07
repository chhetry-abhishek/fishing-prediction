import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();
  const logo = `${process.env.PUBLIC_URL}/icon/logo.png`; 

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Fishing Prediction" />
      </div>
      <ul>
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/fishing-conditions" className={location.pathname === '/fishing-conditions' ? 'active' : ''}>Fishing Conditions</Link></li>
        
            <li><button onClick={onLogout}>Sign Out</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link></li>
            <li><Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
