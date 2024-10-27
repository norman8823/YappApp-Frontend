import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getProfile } from '../services/profileService';
import { show } from '../services/postService';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile(user._id);
        if (data.error) {
          setError(data.error);
        } else {
          setProfile(data.user);
        }
      } catch (err) {
        setError('Failed to load profile');
      }
    };

    const loadUserPosts = async () => {
      try {
        const data = await show(user._id);
        if (data.error) {
          setError(data.error);
        } else {
          setUserPosts(data);
        }
      } catch (err) {
        setError('Failed to load posts');
      }
    };

    if (user) {
      loadProfile();
      loadUserPosts();
    }
  }, [user]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src="/api/placeholder/100/100"
          alt="avatar"
          className="profile-avatar"
        />
        <h1>{profile?.username}</h1>
        <p>{profile?.followers || 0} followers</p>
        <button 
          onClick={() => navigate('/edit-profile')}
          className="edit-profile-button"
        >
          Edit Profile
        </button>
      </div>

      <div className="user-posts">
        <h2>User's Posts</h2>
        {userPosts.map(post => (
          <div key={post._id} className="post-card">
            <p>{post.content}</p>
            <div className="post-footer">
              <span>Posted {new Date(post.createdAt).toLocaleDateString()}</span>
              <button 
                onClick={() => navigate(`/post/${post._id}/edit`)}
                className="edit-post-button"
              >
                ✏️
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default UserProfile;
