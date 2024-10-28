import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as postService from '../services/postService';
import '../styles/ViewDetailPost.css';

const ViewDetailPost = () => {
  const { postId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await postService.show(postId);
        setPost(data);
      } catch (err) {
        setError('Failed to load post');
      }
    };

    loadPost();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const data = await postService.createComment(postId, {
        content: newComment
      });
      setPost(prevPost => ({
        ...prevPost,
        comments: [...prevPost.comments, data]
      }));
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  const handleLike = async (type) => {
    try {
      // Implement like/dislike functionality
      const response = await postService.likePost(postId, type);
      setPost(prevPost => ({
        ...prevPost,
        likes: response.likes,
        dislikes: response.dislikes
      }));
    } catch (err) {
      setError('Failed to update like');
    }
  };

  const handleShare = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.href);
    // Show success message
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <h1 className="topic-title">{post.topic.title}</h1>
      </div>

      <div className="post-content">
        <div className="post-author">
          <img 
            src="/api/placeholder/40/40"
            alt="avatar"
            className="author-avatar"
          />
          <span>{post.author.username}</span>
        </div>

        <p className="post-text">{post.content}</p>

        <div className="post-meta">
          <div className="post-actions">
            <div className="like-buttons">
              <button onClick={() => handleLike('like')} className="like-btn">
                👍 {post.likes}
              </button>
              <button onClick={() => handleLike('dislike')} className="dislike-btn">
                👎 {post.dislikes}
              </button>
            </div>
            <button onClick={handleShare} className="share-btn">
              Share Post
            </button>
          </div>
          <span>Posted {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="comments-section">
        <form onSubmit={handleAddComment} className="comment-form">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="comment-input"
          />
          <button type="submit" className="comment-btn">
            Comment
          </button>
        </form>

        <div className="comments-list">
          {post.comments.map(comment => (
            <div key={comment._id} className="comment">
              <div className="comment-author">
                <img 
                  src="/api/placeholder/30/30"
                  alt="avatar"
                  className="author-avatar"
                />
                <span>{comment.author.username}</span>
              </div>
              <p className="comment-text">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ViewDetailPost;