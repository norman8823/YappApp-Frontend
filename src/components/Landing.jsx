import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { index } from '../services/postService';
import '../styles/Landing.css';

const Landing = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const data = await index();
        if (data.error) {
          setError(data.error);
        } else {
          setTopics(data);
        }
      } catch (err) {
        setError('Failed to load topics');
      }
    };

    loadTopics();
  }, []);

  return (
    <div className="landing-container">
      <h1>Today's Topics</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="topics-list">
        {topics.map(topic => (
          <Link 
            key={topic._id} 
            to={`/topic/${topic._id}`} 
            className="topic-card"
          >
            <h2>{topic.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Landing;