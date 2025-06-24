import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartScreen.css";

const StartScreen = ({ playerName, onReset }) => {
  const navigate = useNavigate();

  return (
    <div className="start-container">
      <div className="floating-clouds" />

      <button className="name-btn" onClick={onReset}>
        🔙 
      </button>

      <h1 className="start-title bounce">
        🌟 Welcome {playerName || "Suhaas"}! 🌟
      </h1>
      <p className="start-subtitle">Pick a fun game to begin your journey 🚀</p>

      <div className="button-group">
        <button className="start-btn photo" onClick={() => navigate("/photo")}>
          🖼️ Photo Story Mode
        </button>
        <button className="start-btn video" onClick={() => navigate("/video")}>
          🎬 Video Story Mode
        </button>
        <button className="start-btn compare" onClick={() => navigate("/compare")}>
          🍎 Compare Numbers
        </button>
        <button className="start-btn ascending" onClick={() => navigate("/ascending")}>
          🔢 Ascending Order
        </button>
        <button className="start-btn dayquiz" onClick={() => navigate("/quiz/day")}>
          🗓️ Day Quiz
        </button>
        <button className="start-btn clockquiz" onClick={() => navigate("/quiz/clock")}>
          ⏰ Clock Quiz
        </button>
        <button className="start-btn quiz" onClick={() => navigate("/quiz/game")}>
          Quiz Game
        </button>
      </div>

      <img
        src="/images/boy-waving.png"
        alt="Suhaas cartoon"
        className="start-boy"
      />
    </div>
  );
};

export default StartScreen;
