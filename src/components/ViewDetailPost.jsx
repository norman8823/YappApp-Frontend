//viewDetailPost.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as postService from "../services/postService";
import * as commentService from "../services/commentService.js"
import "../styles/ViewDetailPost.css";
import EditPostModal from '../components/EditPostModal';
import { Pencil, Trash2 } from "lucide-react";

const ViewDetailPost = () => {
  const { postId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [editingPost, setEditingPost] = useState(null);


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
  
    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    try {
      const data = await commentService.createComment({
        owner: user._id,
        postId: postId,
        text: newComment.trim(),
      });

      console.log(data)

      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, data],
      }));

      setNewComment("");
    } catch (err) {
      console.error('Comment error:', err)
      setError("Failed to add comment");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await postService.deletePost(postId);
        navigate('/landing');
      } catch (err) {
        setError("Failed to delete post");
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);
      setPost(prevPost => ({
        ...prevPost,
        comments: prevPost.comments.filter(c => c._id !== commentId)
      }));
    } catch (err) {
      setError("Failed to delete comment");
    }
  };

  const handleUpdate = async (newText) => {
    try {
      const updatedPost = await postService.updatePost(postId, {
        text: newText,
      });
      setPost(prevPost => ({
        ...prevPost,
        text: newText
      }));
    } catch (err) {
      throw new Error("Failed to update");
    }
  };

  const handleLike = async (type) => {
    try {

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

    navigator.clipboard.writeText(window.location.href);

  };

  if (!post) return <div className="error-message"> Post Not Found</div>;

  console.log({
    'User exists': !!user,
    'User ID': user?._id,
    'Post owner ID': post?.owner?._id,
    'Do IDs match?': user?._id === post?.owner?._id
  });

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <h1 className="topic-title">{post.prompt?.title || "Topic"}</h1>
      </div>

  <div className="post-text">
    <div className="post-owner">
      <div className="user-info">
     <img
      src="/img/placeholderavatar.png"
      alt="avatar"
      className="owner-avatar"
    />
      <span>{post.owner.username}</span>
      </div>
    
    {user && post.owner._id === user._id && (
      <div className="post-actions">
        <button
          onClick={() => {setEditingPost(post)}}
          className="edit-button"
          title="Edit post"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={handleDelete}
          className="delete-button"
          title="Delete post"
        >
          <Trash2 size={16} />
        </button>
      </div>
    )}
  </div>

  <p className="post-text">{post.text}</p>

  <div className="post-meta">
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
              {user && comment.owner._id === user._id && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="delete-button"
                  title="Delete comment"
                  >
                    <Trash2 size={16} />
                  </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {editingPost && (
        <EditPostModal
          isOpen={!!editingPost}
          onClose={() => setEditingPost(null)}
          post={editingPost}
          onUpdate={handleUpdate}
        />
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ViewDetailPost;
