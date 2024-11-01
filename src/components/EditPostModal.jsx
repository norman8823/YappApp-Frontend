//editpostmodal.jsx
import React, { useState } from 'react';
import '../styles/EditPostModal.css';

const EditPostModal = ({ isOpen, onClose, post, onUpdate }) => {
  const [text, setText] = useState(post.text);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onUpdate(text.trim());
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="post-header">
          <h2 className="topic-title">Edit Post</h2>
        </div>

        <div className="post-form-container">
          <div className="user-info">
            <img 
              src="/img/placeholderavatar.png"
              alt="avatar"
              className="user-avatar"
            />
            <span className="username">{post.owner.username}</span>
          </div>

          <form onSubmit={handleSubmit} className="post-form">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="post-input"
              rows={6}
              disabled={isSubmitting}
              required
            />
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="button-group">
              <button 
                type="button" 
                onClick={onClose}
                className="cancel-button"
                disabled={isSubmitting || isDeleting}
              >
                Cancel
              </button>
              
              <div className="action-buttons">
                <button 
                  type="submit" 
                  className="update-button"
                  disabled={isSubmitting || isDeleting}
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;