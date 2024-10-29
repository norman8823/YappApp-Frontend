import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react'; // This is just for the icon
import '../styles/NavBar.css';

const NavBar = () => {
    const { signout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [previousPath, setPreviousPath] = useState('');

    useEffect(() => {
        const currentPath = location.pathname;
        return () => {
            setPreviousPath(currentPath);
        };
    }, [location]);

    const handleLogout = () => {
        signout();
        navigate('/');
    };
    
    const handleBack = () => {
        navigate(previousPath || '/'); // Fallback to home if no previous path
    };

    // Check if we are on the landing page
    const isLandingPage = location.pathname === '/landing';

    return (
        <nav className="navbar">
            {!isLandingPage && (
                <button onClick={handleBack} className="back-button">
                    {previousPath ? `Back to ${previousPath.replace('/', '')}` : 'Back'}
                </button>
            )}
            {user ? (
                <div className="nav-links">
                    {location.pathname === "/landing" ? (
                        <Link to="/profile">Profile</Link>
                    ) : location.pathname === "/profile" ? (
                        <Link to="/landing">Home</Link>
                    ) : (
                        <>
                            <Link to="/profile">Profile</Link>
                            <Link to="/landing">Home</Link>
                        </>
                    )}
                    <button onClick={handleLogout} className="logout-button">
                        <LogOut size={18} />
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
