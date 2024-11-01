import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogOut } from "lucide-react"; // This is just for the icon
import "../styles/NavBar.css";

const NavBar = () => {
  const { signout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signout();
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const currentPath = location.pathname;

  const renderLinks = () => {
    if (user) {
      return (
        <div className="nav-links">
          {currentPath !== "/profile" && (
            <Link to="/profile" className="nav-button secondary-button">
              Profile
            </Link>
          )}
          {currentPath !== "/landing" && (
            <Link to="/landing" className="nav-button secondary-button">
              Home
            </Link>
          )}
        </div>
      );
    } else {
      return (
        <div className="nav-links">
          <Link to="/signup" className="nav-button primary-button">
            Sign Up
          </Link>
          <Link to="/signin" className="nav-button primary-button">
            Sign In
          </Link>
        </div>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {!currentPath.includes("/landing") && (
          <button onClick={handleBack} className="back-button">
            Back
          </button>
        )}
        {renderLinks()}
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
