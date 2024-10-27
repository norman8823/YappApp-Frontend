import React, { useState } from 'react';
import { Flame, MessageCircle } from 'lucide-react';
import AuthModal from './AuthModal';
import '../styles/HomePage.css';

const HomePage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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

  const handleTopicClick = (e) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
  };

  return (
    <div className="home-container">
      {/* Only the header section and content */}
      <div className="header-section">
        <div className="logo-container">
          <MessageCircle size={40} className="app-icon" color="#f97316" />
        </div>
        <h1 className="app-title">YapApp</h1>
        <p className="app-subtitle">Join the Discussion</p>
        
        <button 
          onClick={() => setIsAuthModalOpen(true)} 
          className="login-button"
        >
          Login
        </button>
      </div>

      <div className="topics-section">
        <div className="browse-topics-label">Browse Past Topics</div>
        <div className="topics-list">
          {topics.map((topic) => (
            <div 
              key={topic.id} 
              className="topic-bubble-container"
              onClick={handleTopicClick}
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
            </div>
          ))}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;