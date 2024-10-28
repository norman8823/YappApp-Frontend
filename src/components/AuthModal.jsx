import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signin(formData);
      onClose();
      navigate("/landing");
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    onClose(); // Close the modal first
    navigate("/signup"); // Then navigate to signup page
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <h2 className="auth-modal-title">Sign In</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Please wait..." : "Login"}
          </button>

          <button
            type="button"
            className="toggle-auth-mode"
            onClick={handleSignUpClick}
            disabled={isLoading}
          >
            Need an account? Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
export default AuthModal;
