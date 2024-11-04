import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { updateUserProfile } from "../services/profileService";
import "../styles/EditProfile.css";

const avatarImages = [
  "/img/avatar1.png",
  "/img/avatar2.png",
  "/img/avatar3.png",
  "/img/avatar4.png",
  "/img/avatar5.png",
  "/img/avatar6.png",
];
const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const isGoogleUser = Boolean(user?.googleId);

  console.log('Initial user data:', user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const [avatar, setAvatar] = useState(user?.avatar || 0);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePasswords = (newPass, confirmPass) => {
    if (newPass && newPass !== confirmPass) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleAvatarChange = (direction) => {
    if (direction === "next") {
      setAvatar((prev) => (prev + 1) % 5); // Assuming 5 avatars
    } else {
      setAvatar((prev) => (prev - 1 + 5) % 5);
    }
  };


  // EditProfile.jsx - Simplify handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setPasswordError("");

  if (formData.newPassword && !validatePasswords()) {
    return;
  }

  console.log("Current user:", user);

  try {
    const updates = {};
    if (formData.username !== user.username) updates.username = formData.username;
    if (formData.email !== user.email) updates.email = formData.email;
    if (avatar !== user.avatar) updates.avatar = avatar;
    if (formData.newPassword) {
      updates.currentPassword = formData.currentPassword;
      updates.newPassword = formData.newPassword;
    }

    if (Object.keys(updates).length === 0) {
      setError("No changes to save");
      return;
    }

    console.log('Sending updates:', updates);
    const data = await updateUserProfile(user._id, updates);
    console.log('Received response:', data);

    updateUser(data.user);
    navigate("/profile");
  } catch (err) {
    console.error("Update error:", err);
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
          src="{avatarImages[avatar]}"
          alt="avatar"
          className="avatar-preview"
        />
        <div className="avatar-controls">

    <button 
      onClick={(e) => {
        e.preventDefault(); // Prevent form submission
        handleAvatarChange("prev");
      }}
      className="avatar-button"
    >
      &lt;
    </button>
    <button 
      onClick={(e) => {
        e.preventDefault(); // Prevent form submission
        handleAvatarChange("next");
      }}
      className="avatar-button"
    >
      &gt;
    </button>
  </div>
  <h3 className="text-center mt-2">{user?.username}</h3> 
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
            <small className="text-gray-500">
              Cannot change username when logged in with Google
            </small>
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
            <p className="password-note">
              Leave blank to keep current password
            </p>

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
                onChange={(e) => {
                  setFormData({ ...formData, newPassword: e.target.value });
                  validatePasswords(); // Validate on change
                }}
                disabled={!formData.currentPassword}
              />
            </div>


            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={formData.confirmNewPassword}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormData(prev => ({ ...prev, confirmNewPassword: newValue }));
                  validatePasswords(formData.newPassword, newValue);
                }}
                disabled={!formData.currentPassword}
              />
            </div>
            {passwordError && <div className="error-message">{passwordError}</div>} {/* Add this line */}
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="form-button cancel-button"
          >
            Cancel
          </button>
          <button type="submit" 
          className="form-button create-profile-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
