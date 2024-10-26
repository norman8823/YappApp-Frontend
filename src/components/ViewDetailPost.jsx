import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { show, createComment } from '../services/postService';
import '../styles/ViewDetailPost.css';

const ViewDetailPost = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const { postId } = useParams();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await show(postId);
        if (data.error) {
          setError(data.error);
        } else {
          setPost(data);
        }
      } catch (err) {
        setError('Failed to load post');
      }
    };

    loadPost();
  }, [postId]);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const data = await createComment(postId, { content: comment });
      if (data.error) {
        setError(data.error);
      } else {
        setComment('');
        // Refresh post data to include new comment
        const updatedPost = await show(postId);
        setPost(updatedPost);
      }
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-container">
      <div className="post-content">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>

      <div className="comments-section">
        <form onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Comment</button>
        </form>

        <div className="comments-list">
          {post.comments?.map(comment => (
            <div key={comment._id} className="comment">
              <p>{comment.content}</p>
              <small>By {comment.author}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDetailPost;