import React, { useState } from 'react';
import '../styles/EditPostModal.css';

const EditPostModal = ({ isOpen, onClose, post, onUpdate }) => {
  const [text, setText] = useState(post.text);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="edit-textarea"
            disabled={isSubmitting}
            required
          />
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="button-group">
            <button 
              type="button" 
              onClick={onClose}
              className="cancel-button"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="update-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;