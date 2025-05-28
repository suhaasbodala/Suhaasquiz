import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartScreen.css";

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="start-container">
      <div className="floating-clouds" />

      <h1 className="start-title bounce">🌟 Welcome Suhaas! 🌟</h1>
      <p className="start-subtitle">Pick a fun game to begin your journey 🚀</p>

      <div className="button-group">
        <button className="start-btn photo" onClick={() => navigate("/photo")}>
  🖼️ Photo Story Mode
</button>


        <button
          className="start-btn video"
          onClick={() => {
            console.log("Video Mode Clicked");
            navigate("/video");  // ✅ Navigates to VideoGame
          }}
        >
          🎬 Video Story Mode
        </button>
        <button
          className="start-btn compare"
          onClick={() => {
            console.log("Comapre Mode Clicked");
            navigate("/compare");  // ✅ Navigates to ComapreGame
          }}
        >
          🍎 Compare Numbers
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
