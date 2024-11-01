import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flame, MessageCircle } from "lucide-react";
import axios from "axios";
import "../styles/Landing.css";
import * as postService from "../services/postService";

const Landing = () => {
  const navigate = useNavigate();
  const [currentPrompt, setCurrentPrompt] = useState(null); // Changed to null initially
  const [prompts, setPrompts] = useState([]);
  const [userPosts, setUserPosts] = useState([]); // State to track user posts

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

      // Fetch user posts (You might need to implement this endpoint)
      const userPostsResponse = await axios.get(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts` // Adjust this URL as needed
      );
      setUserPosts(userPostsResponse.data); // Set user posts
    } catch (error) {
      console.error("Error fetching prompts:", error);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const hasUserPostedToday = () => {
    return userPosts.some((post) => post.promptId === currentPrompt?._id); // Check if user has posted today's prompt
  };

  const handleCreatePost = () => {
    navigate(`/prompt/${currentPrompt._id}/create`, {
      state: { prompt: currentPrompt },
    });
  };

  return (
    <div className="landing-container">
      <div className="header-section">
        <div className="prompt-header">
          {/* <h3 className="prompt-of-day">Today's Topic</h3> */}
          {currentPrompt && hasUserPostedToday() ? (
            <>
              <div className="current-prompt-bubble">
                {currentPrompt.prompt}
              </div>
              <button
                onClick={() => navigate(`/prompt/${currentPrompt._id}/yaps`)}
                className="view-yaps-button"
              >
                View Yaps
              </button>
            </>
          ) : (
            <>
              <div className="no-prompt-message">
                Click to see today's prompt!
              </div>
              <button onClick={handleCreatePost} className="yap-button">
                Yap
              </button>
            </>
          )}
        </div>
      </div>
      <div className="content-section">
      <div className="prompts-section">
  {prompts.map((prompt) => (
    <Link
      key={prompt._id}
      to={`/prompt/${prompt._id}`}
      style={{ textDecoration: 'none' }}  
      state={{ prompt: prompt }}
      onClick={() => setCurrentPrompt(prompt)}
    >
      <p className="bubble thought">
        {prompt.prompt}
      </p>
      {prompt.isHot && (
        <Flame 
          size={24} 
          className="hot-indicator" 
          color="#ef4444" 
          style={{ marginLeft: '10px' }}
        />
      )}
    </Link>
  ))}
</div>
    </div>
    </div>
  );
};

export default Landing;
