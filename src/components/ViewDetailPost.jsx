import { useState, useEffect } from "react";
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
  const [vote, setVote] = useState({})
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false)
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await postService.getPostById(postId);
        const voteData = await postService.getVote(postId);
        setPost(data);
        setVote(voteData)
      } catch (err) {
        setError("Failed to load post");
      }
    };
    loadPost();
  }, [postId, toggle])

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const data = await commentService.createComment({
        owner: user._id,
        postId: postId,
        text: newComment.trim(),
      });

      console.log(data);

      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, data],
      }));

      setNewComment('');
    } catch (err) {
      console.error('Comment error:', err);
      setError('Failed to add comment');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(postId);
        navigate('/landing');
      } catch (err) {
        setError('Failed to delete post');
      }
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter((c) => c._id !== commentId),
      }));
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  const handleUpdate = async (newText) => {
    try {
      const updatedPost = await postService.updatePost(postId, {
        text: newText,
      });
      setPost((prevPost) => ({
        ...prevPost,
        text: newText,
      }));
    } catch (err) {
      throw new Error('Failed to update');
    }
  };

  const handleLike = async (voteType) => {
    try {
      // Implement like/dislike functionality
      await postService.likePost(postId, {voteType});
      setToggle(prev => !prev)
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

  const upvoteClass = () => {
    if (vote?.type === "upvote" && vote?.type !== null){
      return "highlight-vote"
    } else {
      return ""
    }
  }

  const downvoteClass = () => {
    if (vote?.type === "downvote" && vote?.type !== null){
      return "highlight-vote"
    } else {
      return ""
    }
  }

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
                onClick={() => setEditingPost(post)}
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
          <div className="post-actions">
            <div className="like-buttons">
              <button onClick={() => handleLike("upvote")} className={`like-btn ${upvoteClass()}`}>
                👍 {post.voteCounts?.upvotes}
              </button>
              <button
                onClick={() => handleLike("downvote")}
                className={`dislike-btn ${downvoteClass()}`}
              >
                👎 {post.voteCounts?.downvotes}
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
                <div className="owner-info">
                  <img
                    src="/img/placeholderavatar.png"
                    alt="avatar"
                    className="owner-avatar"
                  />
                  <span>{comment.owner.username}</span>
                </div>
                {user && comment.owner._id === user._id && (
                  <div className="comment-actions">
                    <button
                      onClick={() => handleCommentDelete(comment._id)}
                      className="deletecomment-button"
                      title="Delete comment"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              <p className="comment-text">{comment.text}</p>
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