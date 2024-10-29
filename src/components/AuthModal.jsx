import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/AuthModal.css";
import { signinWithGoogle } from "../services/authService";
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_EXPRESS_BACKEND_URL || "http://localhost:3000";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Google Sign-In
  useEffect(() => {
    if (isOpen && window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Ensure this is set in Vite's .env
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
      );
    }
  }, [isOpen]); // Runs when isOpen changes
  // Effect runs only once on component mount

  // Google Sign-In
  const handleGoogleResponse = async (response) => {
    setIsLoading(true);
    setError("");
    try {
      // Check if response.credential is valid
      if (!response.credential) {
        throw new Error("No credential received from Google");
      }

      // Send Google ID token to backend
      const googleUser = { token: response.credential };

      const backendResponse = await axios.post(
        `${BASE_URL}/auth/google/callback`,
        googleUser
      );

      // Assuming backend returns the token directly
      localStorage.setItem("token", backendResponse.data.token); // Store the token
      onClose();
      navigate("/landing");
    } catch (err) {
      console.error("Google Sign-In error:", err);
      setError(err.message || "Google authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Regular sign-in form submit handler
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

  // Toggle to Sign-Up page
  const handleSignUpClick = () => {
    onClose();
    navigate("/signup");
  };

  // Return null if modal is closed
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

        {/* Google Sign-In Button */}
        <div id="google-signin-button" className="google-signin"></div>
      </div>
    </div>
  );
};

export default AuthModal;
