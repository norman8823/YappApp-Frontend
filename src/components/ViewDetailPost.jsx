import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as postService from "../services/postService";
import "../styles/ViewDetailPost.css";

const ViewDetailPost = () => {
  const { postId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await postService.getPostById(postId);
        setPost(data);
      } catch (err) {
        setError("Failed to load post");
      }
    };

    loadPost();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const data = await postService.createComment(postId, {
        content: newComment,
      });
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, data],
      }));
      setNewComment("");
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  const handleLike = async (type) => {
    try {
      // Implement like/dislike functionality
      const response = await postService.likePost(postId, type);
      setPost((prevPost) => ({
        ...prevPost,
        likes: response.likes,
        dislikes: response.dislikes,
      }));
    } catch (err) {
      setError("Failed to update like");
    }
  };

  const handleShare = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.href);
    // Show success message
  };

  if (!post) return <div className="error-message"> Post Not Found</div>;

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <h1 className="topic-title">{post.prompt?.title || "Topic"}</h1>
      </div>

      <div className="post-text">
        <div className="post-owner">
          <img
            src="/img/placeholderavatar.png"
            alt="avatar"
            className="owner-avatar"
          />
          <span>{post.owner.username}</span>
        </div>

        <p className="post-text">{post.text}</p>

        <div className="post-meta">
          <div className="post-actions">
            <div className="like-buttons">
              <button onClick={() => handleLike("like")} className="like-btn">
                👍 {post.countUp?.length || 0}
              </button>
              <button
                onClick={() => handleLike("dislike")}
                className="dislike-btn"
              >
                👎 {post.countDown?.length || 0}
              </button>
            </div>
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
          {post.comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-owner">
                <img
                  src="/img/placeholderavatar.png"
                  alt="avatar"
                  className="owner-avatar"
                />
                <span>{comment.owner.username}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ViewDetailPost;
