import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as postService from '../services/postService';
import '../styles/CreatePost.css';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    try {
      const newPost = await postService.create({
        content,
        author: user._id,
      });

      navigate(`/topic/${newPost.topic}`);
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <div className="create-post-container">
      <div className="post-header">
        <h1 className="topic-title">Today's Topic</h1>
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

        <form onSubmit={handleSubmit} className="post-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts here..."
            className="post-input"
            rows={6}
          />

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="post-button">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;