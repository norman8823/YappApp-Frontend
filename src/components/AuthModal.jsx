import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { signin, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [avatarIndex, setAvatarIndex] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (direction) => {
    if (direction === 'next') {
      setAvatarIndex((prev) => (prev + 1) % 5); // Assuming 5 avatars
    } else {
      setAvatarIndex((prev) => (prev - 1 + 5) % 5);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        // Validate signup form
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        const signupData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          avatar: avatarIndex
        };

        await signup(signupData);
      } else {
        // Handle signin
        await signin({
          username: formData.username,
          password: formData.password
        });
      }

      // Clear form and close modal on success
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      onClose();
      navigate('/landing');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>×</button>
        
        <h2 className="auth-modal-title">
          {isSignUp ? 'Create Profile' : 'Sign In'}
        </h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="avatar-section">
              <img 
                src={`/api/placeholder/100/100`} 
                alt="avatar" 
                className="avatar-preview"
              />
              <div className="avatar-controls">
                <button 
                  type="button" 
                  onClick={() => handleAvatarChange('prev')}
                  className="avatar-button"
                >
                  &lt;
                </button>
                <button 
                  type="button"
                  onClick={() => handleAvatarChange('next')}
                  className="avatar-button"
                >
                  &gt;
                </button>
              </div>
              <p className="follower-count">0 followers</p>
            </div>
          )}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>{isSignUp ? 'Create Password' : 'Password'}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="submit-button">
            {isSignUp ? 'Create Profile' : 'Sign In'}
          </button>

          <button
            type="button"
            className="toggle-auth-mode"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
              });
            }}
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : 'Need an account? Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;