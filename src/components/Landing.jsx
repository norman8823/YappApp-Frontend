import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";
import axios from "axios"; // Importing axios
import "../styles/Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const [currentPrompt, setCurrentPrompt] = useState({
    _id: "65f38b998428a2d7c37c2750",
    prompt: "Trump or Kamala",
    isHot: false,
  });

  const [prompts, setPrompts] = useState([]);

  // Function to fetch today's and previous prompts
  const fetchPrompts = async () => {
    try {
      const todayResponse = await axios.get(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/prompts/today`
      );
      const previousResponse = await axios.get(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/prompts/previous`
      );

      // Set current prompt as today's prompt
      setCurrentPrompt(todayResponse.data);

      // Assuming previous prompts is an array of prompt objects
      setPrompts(previousResponse.data);
    } catch (error) {
      console.error("Error fetching prompts:", error);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const handleCreatePost = () => {
    navigate(`/prompt/${currentPrompt._id}/create`, {
      state: { prompt: currentPrompt },
    });
  };

  return (
    <div className="landing-container">
      <div className="header-section">
        <div className="prompt-header">
          <h3 className="prompt-of-day">Today's Topic</h3>
          <div className="current-prompt-bubble">{currentPrompt.prompt}</div>
        </div>
        <button onClick={handleCreatePost} className="yap-button">
          Yap
        </button>
      </div>

      <div className="prompts-section">
        {prompts.map((prompt) => (
          <Link
            key={prompt._id}
            to={`/prompt/${prompt._id}`}
            className="prompt-bubble-container"
            state={{ prompt: prompt }}
            onClick={() => setCurrentPrompt(prompt)}
          >
            <div className="prompt-bubble">{prompt.prompt}</div>
            {prompt.isHot && (
              <Flame size={24} className="hot-indicator" color="#ef4444" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Landing;
