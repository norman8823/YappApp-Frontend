import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { user } = await api.profile.get(currentUser._id);
        setProfile(user);
      } catch (err) {
        setError(err.message);
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  const handleUpdateUsername = async (newUsername) => {
    try {
      const { user } = await api.profile.updateUsername(currentUser._id, newUsername);
      setProfile(user);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="profile-info">
        <img src="/api/placeholder/100/100" alt="avatar" className="profile-avatar" />
        <h2>{profile.username}</h2>
        <p>{profile.followers} followers</p>
      </div>
      <div className="profile-actions">
        <button onClick={() => navigate('/edit-profile')} className="edit-button">
          Edit Profile
        </button>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export { SignUp, UserProfile };