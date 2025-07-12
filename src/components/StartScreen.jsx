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
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showEnglishOptions, setShowEnglishOptions] = useState(false);
  const navigate = useNavigate();

  const gamesBySubject = {
    Telugu: [
      {
        label: "📖 Story Mode",
        action: () => setSelectedSubject("StoryList"),
        className: "story",
      },
      {
        label: "🧠 Quiz Game",
        action: () => navigate("/quiz/telugu"),
        className: "quiz",
      },
      {
        label: "📚 Story Quiz",
        action: () => navigate("/storyquiz"),
        className: "storyquiz",
      },
    ],
    Maths: [
      {
        label: "🍎 Compare Numbers",
        action: () => navigate("/compare"),
        className: "compare",
      },
      {
        label: "🔢 Ascending Order",
        action: () => navigate("/ascending"),
        className: "ascending",
      },
      {
        label: "⏰ Clock Quiz",
        action: () => navigate("/quiz/clock"),
        className: "clockquiz",
      },
      {
        label: "🎯 Level 1 Bundle Game",
        action: () => navigate("/TensOnesGame"),
        className: "bundlegame",
      },
      {
  label: "🎯 Level 0 Bundle Game",
  action: () => navigate("/Level1Game"),
  className: "bundlegame",
}

    ],
    UOI: [
      {
        label: "🗓️ Day Quiz",
        action: () => navigate("/quiz/day"),
        className: "dayquiz",
      },
    ],
    Music: [
      {
        label: "🎵 Music Player",
        action: () => navigate("/music"),
        className: "music",
      },
    ],
  };

  return (
    <div className="start-container">
      <button className="name-btn" onClick={onReset}>
        Reset
      </button>

      {(selectedSubject || selectedSubject === "StoryList") && (
        <button
          className="back-btn-topright"
          onClick={() => {
            setSelectedSubject(null);
            setShowEnglishOptions(false);
          }}
        >🔙</button>
      )}

      <h1 className="start-title">🌟 Welcome {playerName || "Suhaas"}! 🌟</h1>
      <p className="start-subtitle">Pick a subject to begin your journey 🚀</p>

      <div className="button-group">
        {/* SUBJECT SELECTION */}
        {!selectedSubject && (
          <>
            <button
              className="start-btn telugu"
              onClick={() => setSelectedSubject("Telugu")}
            >
              📘 Telugu
            </button>
            <button
              className="start-btn english"
              onClick={() => setSelectedSubject("English")}
            >
              📗 English
            </button>
            <button
              className="start-btn maths"
              onClick={() => setSelectedSubject("Maths")}
            >
              🧮 Maths
            </button>
            <button
              className="start-btn uoi"
              onClick={() => setSelectedSubject("UOI")}
            >
              🌍 UOI
            </button>
            <button
              className="start-btn music"
              onClick={() => setSelectedSubject("Music")}
            >
              🎵 Music
            </button>
          </>
        )}

        {/* ENGLISH STORY + PHONICS */}
        {selectedSubject === "English" && !showEnglishOptions && (
          <>
            <button
              className="start-btn story"
              onClick={() => navigate("/story/1/photo")}
            >
              📖 Story Mode
            </button>
            <button
              className="start-btn quiz"
              onClick={() => setShowEnglishOptions(true)}
            >
              🔤 Phonics Game
            </button>
          </>
        )}

        {/* PHONICS SUB-OPTIONS */}
        {selectedSubject === "English" && showEnglishOptions && (
          <div className="phonics-group">
            <button
              className="start-btn blending"
              onClick={() => navigate("/blending/3letter")}
            >
              🔤 3-Letter Blending
            </button>
            <button
              className="start-btn blend"
              onClick={() => navigate("/blending/4letter")}
            >
              🔤 4-Letter Consonant Blends
            </button>
            <button
              className="start-btn blends"
              onClick={() => navigate("/blending/4letter/vowels")}
            >
              🔤 4-Letter Vowel Blends
            </button>
          </div>
        )}

        {/* TELUGU STORY LIST */}
        {selectedSubject === "StoryList" && (
          <>
            {storyList.map((story) => (
              <button
                key={story.id}
                className="start-btn story"
                onClick={() => navigate(`/story/${story.id}/photo`)}
              >
                {story.name}
              </button>
            ))}
          </>
        )}

        {/* SUBJECT GAME OPTIONS */}
        {selectedSubject &&
          selectedSubject !== "StoryList" &&
          selectedSubject !== "English" &&
          gamesBySubject[selectedSubject]?.map((game, index) => (
            <button
              key={index}
              className={`start-btn ${game.className}`}
              onClick={game.action}
            >
              {game.label}
            </button>
          ))}
      </div>
    </div>
  );
}
