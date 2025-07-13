import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UOISystemLevelPage.css";

// Sound effects
const sfxRight = new Audio("/sounds/success-1-6297.mp3");
const sfxWrong = new Audio("/sounds/fail-2-277575.mp3");
const voiceRight = new Audio("/sounds/very-good.mp3");
const voiceWrong = new Audio("/sounds/try-again.mp3");
const tapSound = new Audio("/sounds/tap.mp3");

// Set volume
[sfxRight, sfxWrong, voiceRight, voiceWrong, tapSound].forEach((sfx) => {
  sfx.volume = 1;
});

// Play helper
const play = (audio) => {
  audio.currentTime = 0;
  audio.play().catch(() => {});
};

// Twin sound helper (sound + voice)
const twin = (a, b) => {
  play(a);
  setTimeout(() => play(b), 300);
};

const quizData = {
  skeletal: {
    video: "/videos/skeletal-intro.mp4",
    level1: [
  {
    question: "🦴 Which part protects your brain?",
    video: "/videos/skull-question.mp4",
    options: ["Ribs", "Skull", "Spine", "Legs"],
    answer: "Skull",
  },
  {
    question: "🦴 Which bone is in your chest?",
    video: "/videos/ribs-question.mp4",
    options: ["Ribs", "Skull", "Jaw", "Spine"],
    answer: "Ribs",
  }
],

    level2: [
      {
        question: "🦴 Identify this bone.",
        image: "/images/skull.jpg",
        options: ["Skull", "Spine", "Ribs", "Jaw"],
        answer: "Skull",
      },
    ],
    level3: [
      {
        question: "The longest bone in the human body is?",
        options: ["Femur", "Tibia", "Humerus", "Fibula"],
        answer: "Femur",
      },
    ],
  },
  respiratory: {
    video: "/videos/respiratory-intro.mp4",
    level1: [
      {
        question: "🫁 Which organ helps you breathe?",
        options: ["Heart", "Liver", "Lungs", "Kidney"],
        answer: "Lungs",
      },
    ],
    level2: [],
    level3: [],
  },
};

export default function UOISystemPage() {
  const { system } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [level, setLevel] = useState("level0");
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const systems = Object.keys(quizData);
  const systemData = quizData[system] || {};
  const questions = systemData[level] || [];
  const current = questions[currentQ];

  const handleLevelChange = (e) => {
    const newLevel = e.target.value;
    setLevel(newLevel);
    setCurrentQ(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  const handleOptionClick = (opt) => {
  tapSound.play();
  setSelectedOption(opt);
  setShowFeedback(true);

  if (opt === current.answer) {
    twin(sfxRight, voiceRight);
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setIsFinished(true);
      }
    }, 800);
  } else {
    twin(sfxWrong, voiceWrong);
  }
};


  return (
    <div className="uoi-layout">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="uoi-sidebar">
          <h3>🧠 Systems</h3>
          {systems.map((sys) => (
            <button
              key={sys}
              className="sidebar-btn"
              onClick={() => navigate(`/uoi/${sys}`)}
            >
              {sys.charAt(0).toUpperCase() + sys.slice(1)} System
            </button>
          ))}
          <button className="sidebar-close-btn" onClick={toggleSidebar}>
            ⬅️
          </button>
        </div>
      )}

      {/* Main Page */}
      <div className="uoi-level-page">
        <div className="top-bar">
          {!sidebarOpen && (
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              📂 Menu
            </button>
          )}
          <button className="back-btn right" onClick={() => navigate(-1)}>🔙</button>
        </div>

        <h2 className="uoi-heading">🌍 {system?.toUpperCase()} SYSTEM</h2>

        {level === "level0" && (
          <video src={systemData.video} controls className="uoi-video" />
        )}

        {/* Show video only for level1 and if current question has a video */}
{level === "level1" && current?.video && (
  <video
    src={current.video}
    controls
    className="uoi-video"
  />
)}


        <select value={level} onChange={handleLevelChange} className="level-select">
          <option value="level0">📽️ Level 0 (Intro Video)</option>
          <option value="level1">🎬 Level 1 (Video Quiz)</option>
          <option value="level2">🖼️ Level 2 (Image Quiz)</option>
          <option value="level3">📝 Level 3 (Text Quiz)</option>
        </select>

        {level !== "level0" && !isFinished && current && (
          <div className="question-block">
            <h3 className="question">{current.question}</h3>

            {level === "level2" && current.image && (
              <img
                src={current.image}
                alt="visual"
                style={{ width: "200px", borderRadius: "12px", marginBottom: "10px" }}
              />
            )}

            <div className="options">
              {current.options.map((opt, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    showFeedback
                      ? opt === current.answer
                        ? "correct"
                        : opt === selectedOption
                        ? "wrong"
                        : ""
                      : ""
                  }`}
                  onClick={() => handleOptionClick(opt)}
                  disabled={showFeedback}
                >
                  {opt}
                </button>
              ))}
            </div>

            {showFeedback && (
              <p className="feedback">
                {selectedOption === current.answer ? "✅ Correct!" : "❌ Try again!"}
              </p>
            )}
          </div>
        )}

        {isFinished && (
          <p className="completion-message">
            🎉 You completed {level.toUpperCase()}!
          </p>
        )}
      </div>
    </div>
  );
}
