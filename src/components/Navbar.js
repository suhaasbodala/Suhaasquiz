import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTestClick = () => {
    if (location.pathname.includes("compare")) {
      navigate("/compare-test");
    } else if (location.pathname.includes("ascending")) {
      navigate("/ascending-test");
    } else {
      alert("No test available for this section.");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-title" onClick={() => navigate("/")}>
        🧠  Game
      </div>
      <div className="nav-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={handleTestClick}>Test</button>
      </div>
    </nav>
  );
};

export default Navbar;