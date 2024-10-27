import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as postService from '../services/postService';
import '../styles/ViewDetailTopic.css';

const ViewDetailTopic = () => {
  const { topicId } = useParams();
  const { user } = useAuth();
  const [topic, setTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTopicAndPosts = async () => {
      try {
        const data = await postService.getTopicPosts(topicId);
        setTopic(data.topic);
        setPosts(data.posts);
      } catch (err) {
        setError('Failed to load topic');
      }
    };

    loadTopicAndPosts();
  }, [topicId]);

  const handleGenerateAISummary = async () => {
    try {
      // Implement AI summary generation
      console.log('Generating AI summary...');
    } catch (err) {
      setError('Failed to generate summary');
    }
  };

  return (
    <div className="topic-container">
      <div className="topic-header">
        <h1 className="topic-title">{topic?.title}</h1>
        <button 
          onClick={handleGenerateAISummary}
          className="generate-summary-btn"
        >
          Generate AI Summary
        </button>
      </div>

      <div className="posts-feed">
        {posts.map(post => (
          <div key={post._id} className="post-card">
            <div className="post-author">
              <img 
                src="/api/placeholder/40/40"
                alt="avatar"
                className="author-avatar"
              />
              <span>{post.author.username}</span>
            </div>

            <p className="post-content">{post.content}</p>

            <div className="post-stats">
              <Link to={`/post/${post._id}`}>
                {post.comments.length} comments
              </Link>
              <span>{post.likes} likes</span>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ViewDetailTopic;