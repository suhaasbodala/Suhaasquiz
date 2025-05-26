import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartScreen.css";

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="start-screen animated-bg">
      <h1 className="start-title">🎮 Welcome Suhaas!</h1>
      <p className="start-subtitle">Choose your game type</p>
      <div className="button-group">
        <button onClick={() => navigate("/photo")} className="start-btn">
          🖼️ Photo Sequence
        </button>
        <button onClick={() => navigate("/video")} className="start-btn">
          🎬 Video Sequence
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
