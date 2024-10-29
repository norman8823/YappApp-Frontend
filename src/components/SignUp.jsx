import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signup } from "../services/authService";
import "../styles/SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState(0); // For avatar selection
  const [error, setError] = useState("");

  const handleAvatarChange = (direction) => {
    if (direction === "next") {
      setAvatar((prev) => (prev + 1) % 5); // Assuming 5 avatars
    } else {
      setAvatar((prev) => (prev - 1 + 5) % 5);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        avatar,
      });

      if (response.token) {
        navigate("/landing");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Profile</h2>

      <div className="avatar-selector">
        <img
          src="/img/placeholderavatar.png"
          alt="avatar"
          className="avatar-preview"
        />
        <div className="avatar-controls">
          <button onClick={() => handleAvatarChange("prev")}>&lt;</button>
          <button onClick={() => handleAvatarChange("next")}>&gt;</button>
        </div>
        <p>0 followers</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Create Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="create-profile-button">
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default SignUp;
