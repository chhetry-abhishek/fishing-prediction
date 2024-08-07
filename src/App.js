
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { auth } from './firebase';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home';
import FishingConditions from './components/FishingConditions';
import Weather from './components/Weather';
import Navbar from './components/Navbar';

const App = () => {
  const { user } = useAuth(); 

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <Router>
      <Navbar isAuthenticated={!!user} onLogout={handleSignOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path="/fishing-conditions" element={user ? <FishingConditions /> : <Navigate to="/login" />} />
        <Route path="/weather" element={user ? <Weather /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
