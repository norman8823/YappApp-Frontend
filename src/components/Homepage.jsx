import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Discussion Forum</h1>
      <div className="auth-buttons">
        <Link to="/signup" className="signup-button">Sign Up</Link>
        <Link to="/signin" className="signin-button">Sign In</Link>
      </div>
    </div>
  );
};

export default HomePage;
