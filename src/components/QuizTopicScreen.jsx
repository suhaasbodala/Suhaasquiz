// src/components/QuizTopicScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizTopicScreen.css";

const topics = [
  { id: "howmany", label: "🔢 How Many?" },
  { id: "prepositions", label: "📍 Prepositions" },
  { id: "adjectives", label: "🎨 Adjectives" },
  { id: "misc", label: "🧠 Miscellaneous" }
];

const QuizTopicScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="topic-screen">
      {/* Back to home screen */}
      <button className="back-button-top-left" onClick={() => navigate("/")}>🏠</button>

      {/* Title with animation */}
      <h1 className="animated-title">🎯 Choose a Topic</h1>

      {/* Dynamic grid of topic buttons */}
      <div className="topic-grid">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className="topic-btn"
            onClick={() => navigate(`/quiz/${topic.id}`)}
          >
            {topic.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizTopicScreen;
