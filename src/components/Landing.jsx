import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import '../styles/Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [currentPrompt, setCurrentPrompt] = useState({
    _id: "65f38b998428a2d7c37c2750",
    title: "Trump or Kamala",
    isHot: false
  });

  const [prompts, setPrompts] = useState([
    {
      _id: "65f38b998428a2d7c37c2751", 
      title: "Pizza is overrated",
      isHot: false
    },
    {
      _id: "65f38b998428a2d7c37c2752",
      title: "Bitcoin to 100k by end of year",
      isHot: true
    },
    {
      _id: "65f38b998428a2d7c37c2753",
      title: "Government is behind hurricane",
      isHot: false
    },
    {
      _id: "65f38b998428a2d7c37c2754",
      title: "We got self driving Teslas before GTA6",
      isHot: false
    },
    {
      _id: "65f38b998428a2d7c37c2755",
      title: "The rent is too damn high",
      isHot: true
    }
  ]);

  const handleCreatePost = () => {
    navigate(`/prompt/${currentPrompt._id}/create`, {
      state: { prompt: currentPrompt }
    });
  };

  return (
    <div className="landing-container">
      <div className="header-section">
        <div className="prompt-header">
          <h3 className="prompt-of-day">Today's Topic</h3>
          <div className="current-prompt-bubble">
            {currentPrompt.title}
          </div>
        </div>
        <button 
          onClick={handleCreatePost}
          className="yap-button"
        >
          Yap
        </button>
      </div>

      <div className="prompts-section">
        {prompts.map((prompt) => (
          <Link 
            key={prompt._id} 
            to={`/prompt/${prompt._id}`}
            className="prompt-bubble-container"
            onClick={() => setCurrentPrompt(prompt)}
          >
            <div className="prompt-bubble">
              {prompt.title}
            </div>
            {prompt.isHot && (
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
