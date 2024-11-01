//EditPostModal is handling update function

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as postService from '../services/postService';
import '../styles/UpdatePost.css';

const UpdatePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { signin, signup, signout, user } = useAuth();
  
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await postService.show(postId);
        // Verify post belongs to current user
        if (post.author._id !== user._id) {
          navigate('/landing');
          return;
        }
        setContent(post.content);
      } catch (err) {
        setError('Failed to load post');
      }
    };

    loadPost();
  }, [postId, user._id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    try {
      const updatedPost = await postService.update(postId, { content });
      navigate(`/topic/${updatedPost.topic}`);
    } catch (err) {
      setError('Failed to update post');
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await postService.deletePost(postId);
      navigate('/landing');
    } catch (err) {
      setError('Failed to delete post');
      setIsDeleting(false);
    }
  };

  return (
    <div className="update-post-container">
      <div className="post-header">
        <h1 className="topic-title">Past Topic</h1>
      </div>

      <div className="post-form-container">
        <div className="user-info">
          <img 
            src="/api/placeholder/40/40"
            alt="avatar"
            className="user-avatar"
          />
          <span className="username">{user?.username}</span>
        </div>

        <form onSubmit={handleUpdate} className="post-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="post-input"
            rows={6}
          />

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="cancel-button"
            >
              Cancel
            </button>
            
            <div className="action-buttons">
              <button
                type="button"
                onClick={handleDelete}
                className="delete-button"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
              
              <button 
                type="submit" 
                className="update-button"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;