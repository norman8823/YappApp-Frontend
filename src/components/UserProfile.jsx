import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as postService from '../services/postService';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserPosts = async () => {
      try {
        const response = await postService.getPosts();
        const filteredPosts = response.filter(post => post?.owner?._id === user?._id);
        setUserPosts(filteredPosts);
        setError('');
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Failed to load your posts');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadUserPosts();
    }
  }, [user]);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src={user.avatar || "/img/placeholderavatar.png"}
          alt="Profile avatar"
          className="profile-avatar"
          onError={(e) => {
            e.target.src = "/img/placeholderavatar.png";
          }}
        />
        <div className="profile-info">
          <h3>{user.username}</h3>
          <p>{user.followers || 0} followers</p>
          <button 
            onClick={handleEditProfile}
            className="edit-profile-button"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="user-posts">
        <h2>Your Posts</h2>
        
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
        
        {!error && userPosts.length === 0 ? (
          <p className="no-posts">You haven't made any posts yet</p>
        ) : (
          <div className="posts-grid">
            {userPosts.map(post => (
              <div 
                key={post._id} 
                className="post-card"
                onClick={() => handlePostClick(post._id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handlePostClick(post._id);
                  }
                }}
              >
                <div className="post-content">
                  <p className="post-text">{post.text}</p>
                  <div className="post-footer">
                    <span className="post-date">
                      Posted {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;