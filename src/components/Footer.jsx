import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="nav-links">
        <span><Link to="/team">Meet the Team</Link></span>
        <span><Link to="/FAQ">How To Yap</Link></span>
      </div>
    </footer>
  );
};

export default Footer;
