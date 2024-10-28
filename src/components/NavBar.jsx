// src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react'; // This is just for the icon
import '../styles/NavBar.css';

const NavBar = () => {
    const { signout, user } = useAuth(); // We only need signout from auth
    const navigate = useNavigate();

    const handleLogout = () => {
        signout(); // Use the signout function from AuthContext
        navigate('/');
    };

    return (
        <nav className="navbar">
            {user ? (
                <div className="nav-links">
                    <Link to="/landing">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout} className="logout-button">
                        <LogOut size={18} /> {/* Use LogOut as an icon component */}
                        <span>Logout</span>
                    </button>
                </div>
            ) : (
                <div className="nav-links">
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/signin">Sign In</Link>
                </div>
            )}
        </nav>
    );
};

export default NavBar;

