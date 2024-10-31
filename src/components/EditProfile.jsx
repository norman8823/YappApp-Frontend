import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import "../styles/EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const isGoogleUser = Boolean(user?.googleId)

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [avatar, setAvatar] = useState(user?.avatar || 0);
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

    // Only validate passwords if user is trying to change password
    if (formData.newPassword || formData.currentPassword) {
      if (!formData.currentPassword) {
        setError("Current password is required to set new password");
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        setError("New passwords do not match");
        return;
      }
    }

    try {
      // Only include fields that have changed
      const updates = {};
      if (formData.username !== user.username) updates.username = formData.username;
      if (formData.email !== user.email) updates.email = formData.email;
      if (avatar !== user.avatar) updates.avatar = avatar;
      if (formData.newPassword) {
        updates.currentPassword = formData.currentPassword;
        updates.newPassword = formData.newPassword;
      }

      // If no changes were made
      if (Object.keys(updates).length === 0) {
        setError("No changes to save");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_EXPRESS_BACKEND_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      // Update local user data and navigate back
      updateUser(data.user);
      navigate('/profile');

    } catch (err) {
      setError(err.message || "Failed to update profile");
    }
  };

  return (
    <div className="signup-container">
      <h2>Edit Profile</h2>

      {isGoogleUser && (
        <p className="text-sm text-gray-500 mb-4">Logged in with Google</p>
      )}

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
        <p>{user?.followers || 0} followers</p>
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
            disabled={isGoogleUser}
            className={isGoogleUser ? "bg-gray-100" : ""}
          />
          {isGoogleUser && (
            <small className="text-gray-500">Cannot change username when logged in with Google</small>
          )}
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
        
        {!isGoogleUser && (
          <div className="password-section">
            <h3>Change Password</h3>
            <p className="password-note">Leave blank to keep current password</p>

            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                disabled={!formData.currentPassword}
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={formData.confirmNewPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmNewPassword: e.target.value })
                }
                disabled={!formData.currentPassword}
              />
            </div>
          </div>
        )}

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/profile')} 
            className="cancel-button"
          >
            Cancel
          </button>
          <button type="submit" className="create-profile-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;