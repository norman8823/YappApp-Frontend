import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as postService from "../services/postService";
import "../styles/ViewDetailPrompt.css";

const ViewDetailPrompt = () => {
  const { promptId } = useParams(); // this should be promptId to match backend
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await postService.getPostsByPrompt(promptId);
        setPosts(fetchedPosts);
      } catch (err) {
        setError("Failed to load posts");
        // } finally {
        //   setIsLoading(false);
      }
    };

    loadPosts();
  }, [promptId]);

  const handleGenerateAISummary = async () => {
    try {
      // Implement AI summary generation
      console.log("Generating AI summary...");
    } catch (err) {
      setError("Failed to generate summary");
    }
  };

  console.log(posts);

  return (
    <div className="prompt-container">
      <div className="prompt-header">
        <h1 className="prompt-title">{prompt?.title}</h1>
        <button
          onClick={handleGenerateAISummary}
          className="generate-summary-btn"
        >
          Generate AI Summary
        </button>
      </div>

      <div className="posts-feed">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <div className="post-owner">
              <img
                src="/api/placeholder/40/40"
                alt="avatar"
                className="owner-avatar"
              />
              <span>{post.owner.username}</span>
            </div>

            <p className="post-text">{post.text}</p>

            <div className="post-stats">
              <Link to={`/post/${post._id}`}>
                {post.comments.length} comments
              </Link>
              <span>{post.likes} likes</span>
            </div>
          </div>
        ))}
      </div>

      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
  );
};

export default ViewDetailPrompt;
