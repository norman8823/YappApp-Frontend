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
        // Get all posts and filter for the current user
        // You might want to add a dedicated endpoint for this
        const response = await postService.getPosts();
        const filteredPosts = response.filter(post => post.owner._id === user._id);
        setUserPosts(filteredPosts);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadUserPosts();
    }
  }, [user]);

  const handleEditPost = (postId) => {
    navigate(`/post/${postId}/edit`);
  };

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src="/img/placeholderavatar.png"
          alt="avatar"
          className="profile-avatar"
        />
        <h1>{user?.username}</h1>
        <p>{user?.followers || 0} followers</p>
      </div>

      <div className="user-posts">
        <h2>Your Posts</h2>
        {error && <div className="error-message">{error}</div>}
        
        {userPosts.length === 0 ? (
          <p className="no-posts">No posts yet</p>
        ) : (
          userPosts.map(post => (
            <div key={post._id} className="post-card">
              <p className="post-text">{post.text}</p>
              <div className="post-footer">
                <span className="post-date">
                  Posted {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleEditPost(post._id)}
                  className="edit-button"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;