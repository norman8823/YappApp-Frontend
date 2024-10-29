import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as postService from "../services/postService";
import { Pencil, Trash2 } from 'lucide-react';
import "../styles/ViewDetailPrompt.css";

const ViewDetailPrompt = () => {
  const { promptId } = useParams();
  const [posts, setPosts] = useState([]);
  const [promptTitle, setPromptTitle] = useState('')
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPrompt = location.state?.prompt;

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

  console.log(location.state)

  const handleEdit = (postId) => {
    navigate(`/post/${postId}/edit`);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(postId);
        setPosts(posts.filter(post => post._id !== postId));
      } catch (err) {
        setError('Failed to delete post');
      }
    }
  };

  if (isLoading) return <div className="loading">Loading posts...</div>;

  return (
    <div className="prompt-container">
      <div className="header-section">
        <h1 className="prompt-title">Today's Topic</h1>
        {currentPrompt && <p className="prompt-text">{currentPrompt.title}</p>}
      </div>

      <div className="posts-feed">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <div className="post-owner">
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
                    onClick={() => handleEdit(post._id)}
                    className="edit-button"
                    title="Edit post"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="delete-button"
                    title="Delete post"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            <p className="post-text">{post.text}</p>

            <div className="post-stats">
              <Link to={`/post/${post._id}`}>
                {post.comments?.length || 0} comments
              </Link>
              <span>{post.countUp?.length || 0} likes</span>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}
      {posts.length === 0 && !isLoading && (
        <div className="no-posts">No posts yet for this topic</div>
      )}
    </div>
  );
};

export default ViewDetailPrompt;