import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartScreen.css";

const storyList = [
  { id: 1, name: "🚽 Potty Story" },
  { id: 2, name: "🍎 Field Story" },
  { id: 3, name: "📱 Phone Story" },
  { id: 4, name: "🧩 Items Story" },
];

export default function StartScreen({ playerName, onReset }) {
  const [showStories, setShowStories] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="start-container">
      <button className="name-btn" onClick={onReset}>
       Reset
      </button>

      {/* Show top-right Back to Menu button only in story view */}
      {showStories && (
        <button
          className="back-btn-topright"
          onClick={() => setShowStories(false)}
        >
          🔙 
        </button>
      )}

      <h1 className="start-title">🌟 Welcome {playerName || "Suhaas"}! 🌟</h1>
      <p className="start-subtitle">Pick a fun game to begin your journey 🚀</p>

      <div className="button-group">
        {/* STORY MODE block */}
        {!showStories ? (
          <>
            <button
              className="start-btn story"
              onClick={() => setShowStories(true)}
            >
              📖 Story Mode
            </button>
            <button
              className="start-btn compare"
              onClick={() => navigate("/compare")}
            >
              🍎 Compare Numbers
            </button>
            <button
              className="start-btn ascending"
              onClick={() => navigate("/ascending")}
            >
              🔢 Ascending Order
            </button>
            <button
              className="start-btn dayquiz"
              onClick={() => navigate("/quiz/day")}
            >
              🗓️ Day Quiz
            </button>
            <button
              className="start-btn clockquiz"
              onClick={() => navigate("/quiz/clock")}
            >
              ⏰ Clock Quiz
            </button>
            <button
              className="start-btn quiz"
              onClick={() => navigate("/quiz/game")}
            >
              Quiz Game
            </button>
          </>
        ) : (
          storyList.map((story) => (
            <button
              key={story.id}
              className="start-btn story"
              onClick={() => navigate(`/story/${story.id}/photo`)}
            >
              {story.name}
            </button>
          ))
        )}
      </div>

     
    </div>
  );
}
