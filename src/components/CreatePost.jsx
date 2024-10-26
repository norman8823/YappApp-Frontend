import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from '../services/postService';
import '../styles/CreatePost.css';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await create({ content });
      if (data.error) {
        setError(data.error);
      } else {
        navigate('/landing');
      }
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create Post</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts here..."
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;