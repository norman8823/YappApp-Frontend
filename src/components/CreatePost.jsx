import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as postService from '../services/postService';
import '../styles/CreatePost.css';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { promptId } = useParams(); // Get the current prompt ID from URL
  const location = useLocation();
  const currentPrompt = location.state?.prompt;

  useEffect(() => {
    console.log('Current user:', user);
    console.log('Prompt ID:', promptId);
    console.log('Current prompt:', currentPrompt);
    
    if (!promptId || promptId === 'undefined') {
      navigate('/landing');
    }
  }, [promptId, navigate]); // Added proper dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('Creating post with:', {
        owner: user._id,
        prompt: promptId,
        text: text.trim()
      });

      const newPost = await postService.createPost({
        owner: user._id,
        prompt: promptId,
        text: text.trim()
      });

      navigate(`/prompt/${promptId}`, {
        state: { prompt: currentPrompt }
      });
      
    } catch (err) {
      console.error('Post creation error:', err);
      setError(err.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add check for required data
  if (!user || !promptId) {
    return <div className="error-message">Missing required data to create post</div>;
  }

  return (
    <div className="create-post-container">
      <div className="header-section">
        <h1 className="prompt-title">Today's Topic</h1>
        {currentPrompt && <p className="prompt-text">{currentPrompt.title}</p>}
      </div>

      <div className="post-form-container">
        <div className="user-info">
          <img 
            src="/img/placeholderavatar.png"
            alt="avatar"
            className="user-avatar"
          />
          <span className="username">{user.username}</span>
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your thoughts here..."
            className="post-input"
            disabled={isSubmitting}
            required
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