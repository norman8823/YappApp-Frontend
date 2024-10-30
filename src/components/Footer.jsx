import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <nav className="footer">
      <div className="nav-links">
        <Link to="/team">Meet the Team</Link>
      </div>
    </nav>
  );
};

export default Footer;
