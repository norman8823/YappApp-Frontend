import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import { Flame } from 'lucide-react';
import '../styles/Landing.css';

const Landing = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "Pizza is overrated",
      isHot: false
    },
    {
      id: 2,
      title: "Bitcoin to 100k by end of year",
      isHot: true
    },
    {
      id: 3,
      title: "Government is behind hurricane",
      isHot: false
    },
    {
      id: 4,
      title: "We got self driving Teslas before GTA6",
      isHot: false
    },
    {
      id: 5,
      title: "The rent is too damn high",
      isHot: true
    }
  ]);

  const handleYapClick = () => {
    navigate('/post/create');
  };

  return (
    <div className="landing-container">
      <div className="header-section">
        <div className="topic-header">
          <h1 className="topic-of-day">Today's Topic</h1>
        </div>
        <button 
          onClick={handleYapClick}
          className="yap-button"
        >
          Yap
        </button>
      </div>

      <div className="topics-section">
        {topics.map((topic) => (
          <Link 
            key={topic.id} 
            to={`/topic/${topic.id}`}
            className="topic-bubble-container"
          >
            <div className="topic-bubble">
              {topic.title}
            </div>
            {topic.isHot && (
              <Flame 
                size={24}
                className="hot-indicator"
                color="#ef4444"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Landing;
