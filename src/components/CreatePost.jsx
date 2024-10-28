import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as postService from '../services/postService';
import '../styles/CreatePost.css';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signin, signup, signout, user } = useAuth();
  // Assuming we're getting the prompt ID from the URL or props
  const { promptId } = useParams(); // or pass it as a prop

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const newPost = await postService.createPost({
        owner: user._id,    
        prompt: promptId,   
        text: text.trim()   
      });

      // Navigate to the topic/prompt view with the new post
      navigate(`/topic/${promptId}`);
    } catch (err) {
      setError(err.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-container">
      <div className="header-section">
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your thoughts here..."
            className="post-input"
            disabled={isSubmitting}
          />

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="post-button"
            disabled={isSubmitting || !text.trim()}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;