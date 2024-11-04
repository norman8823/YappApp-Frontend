import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogOut } from "lucide-react"; // This is just for the icon
import "../styles/NavBar.css";

const NavBar = () => {
  const { signout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = async () => {
    await signout();
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="nav-wrapper">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="left-side">
            {!currentPath.includes("/landing") && (
              <button onClick={handleBack} className="back-button">
                Back
              </button>
            )}
            {user && currentPath !== "/profile" && (
              <Link to="/profile" className="nav-button profile-button">
                Profile
              </Link>
            )}
          </div>
          
          <div className="right-side">
            {user && currentPath !== "/landing" && !currentPath.includes("/create") && (
              <Link to="/landing" className="nav-button landing-button">
                Home
              </Link>
            )}
            {user && (
              <button onClick={handleLogout} className="logout-button">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
