import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as postService from "../services/postService";
import { Pencil, Trash2 } from "lucide-react";
import EditPostModal from "./EditPostModal";
import "../styles/ViewDetailPrompt.css";

const ViewDetailPrompt = () => {
  const { promptId } = useParams();
  const [posts, setPosts] = useState([]);
  const [promptTitle, setPromptTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPrompt = location.state?.prompt;
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await postService.getPostsByPrompt(promptId);

        setPosts(fetchedPosts);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [promptId]);

  console.log(location.state);
  console.log(posts);

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleUpdate = async (newText) => {
    try {
      const updatedPost = await postService.updatePost(editingPost._id, {
        text: newText,
      });
      setPosts(
        posts.map((post) =>
          post._id === editingPost._id ? { ...post, text: newText } : post
        )
      );
      setEditingPost(null);
    } catch (err) {
      throw new Error("Failed to update");
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await postService.deletePost(postId);
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (err) {
        setError("Failed to delete post");
      }
    }
  };

  if (isLoading) return <div className="loading">Loading posts...</div>;

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`, {
      state: { prompt: location.state?.prompt },
    });
  };

  return (
    <div className="page-container">
      <div className="header-section">
        <h1 className="prompt-title">
        {currentPrompt?.isToday ? "Today's Topic" : "Past Topic"}
          </h1>
        {currentPrompt && <p className="prompt-text">{currentPrompt.prompt}</p>}
      </div>

      <div className="posts-feed">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bubble bubble-bottom-left"
            onClick={() => handlePostClick(post._id)}
          >
      <div className="post-header">
  <div className="post-owner">
    <div className="owner-info">
      <img
        src="/img/placeholderavatar.png"
        alt="avatar"
        className="owner-avatar"
      />
      <span>
        {(post.owner && post.owner.username) || "Unknown User"}
      </span>
    </div>
    
    {user && post.owner && post.owner._id === user._id && (
      <div className="post-actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(post);
          }}
          className="edit-button"
          title="Edit post"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(post._id);
          }}
          className="delete-button"
          title="Delete post"
        >
          <Trash2 size={16} />
        </button>
      </div>
    )}
  </div>
</div>
            <p className="post-text">{post.text}</p>

            <div className="post-stats">
              <span>
                {post.commentLength}{" "}
                {post.commentLength !== 1 ? "comments" : "comment"}
              </span>
              <span>{post.voteCounts?.upvotes} Likes</span>
              <span>{post.voteCounts?.downvotes} Dislikes</span>
            </div>
          </div>
        ))}
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

export default ViewDetailPrompt;
