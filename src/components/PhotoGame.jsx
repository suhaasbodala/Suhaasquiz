import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./PhotoGame.css";

const levels = [
  ["IMG-20250520-WA0002.jpg", "IMG-20250520-WA0003.jpg", "IMG-20250520-WA0001.jpg", "IMG-20250520-WA0005.jpg"],
  ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg"],
  [
    "scene1.jpg", "scene2.jpg", "scene3.jpg",
    "scene4.jpg", "scene5.jpg", "scene6.jpg",
    "scene7.jpg", "scene8.jpg", "scene9.jpg"
  ]
];

const successSound = new Audio("/sounds/success-1-6297.mp3");
const failSound = new Audio("/sounds/fail-2-277575.mp3");
const voiceSuccess = new Audio("/sounds/very-good.mp3");
const voiceFail = new Audio("/sounds/try-again.mp3");

const levelDescriptions = [
  "✂️ Cutting Story!",
  "🏖️ Beach Story!",
  "🚽 Potty Story!"
];

const PhotoGame = () => {
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem("photo-level");
    return saved ? parseInt(saved) : 1;
  });

  const [selectedId, setSelectedId] = useState(null);
  const [images, setImages] = useState([]);
  const [correctOrder, setCorrectOrder] = useState([]);
  const [targets, setTargets] = useState([]);
  const [message, setMessage] = useState("");
  const [showLevelComplete, setShowLevelComplete] = useState(false);

  useEffect(() => {
    const levelData = levels[level - 1];
    if (!levelData) {
      alert("🎉 All levels completed!");
      return;
    }

    const imgs = levelData.map((file, i) => ({
      id: `img-${i}`,
      src: `/images/level${level}/${file}`
    }));

    setImages(shuffleArray(imgs));
    setCorrectOrder(imgs.map((img) => img.id));
    setTargets(new Array(imgs.length).fill(null));
    setSelectedId(null);
    setMessage("");
  }, [level]);

  const shuffleArray = (arr) => [...arr].sort(() => 0.5 - Math.random());
  const getImageById = (id) => images.find((img) => img.id === id)?.src;

  const handleSlotClick = (index) => {
    if (!targets[index] && selectedId) {
      const newTargets = [...targets];
      newTargets[index] = selectedId;
      setTargets(newTargets);
      setSelectedId(null);
    }
  };

  const checkAnswer = () => {
    if (targets.includes(null)) {
      setMessage("🚫 Please complete all slots.");
      return;
    }

    const isCorrect = targets.join() === correctOrder.join();
    if (isCorrect) {
      successSound.play();
      voiceSuccess.play();
      confetti({ particleCount: 150, spread: 60, origin: { y: 0.6 } });
      setShowLevelComplete(true);
    } else {
      failSound.play();
      voiceFail.play();
      setMessage("❌ Malli try cheyu Suhaas!");
      setTargets(new Array(images.length).fill(null));
    }
  };

  const resetProgress = () => {
    setLevel(1);
    localStorage.setItem("photo-level", 1);
    setMessage("🔁 Level reset to 1.");
  };

  const removeFromSlot = (index) => {
    const updated = [...targets];
    updated[index] = null;
    setTargets(updated);
  };

  if (showLevelComplete) {
    return (
      <div className="photo-container">
        <h2> Level {level} Completed! 🎉 Veru good suhaas! 🎉</h2>
        <button
          className="check-btn"
          onClick={() => {
            setShowLevelComplete(false);
            const next = level + 1;
            setLevel(next);
            localStorage.setItem("photo-level", next);
          }}
        >
          ➡️ Go to Level {level + 1}
        </button>
      </div>
    );
  }

  return (
    <div className="photo-container animated-bg">
      <h2 className="story-title">{levelDescriptions[level - 1]}</h2>

      <select
        className="level-select"
        value={level}
        onChange={(e) => {
          const selected = parseInt(e.target.value);
          setLevel(selected);
          localStorage.setItem("photo-level", selected);
        }}
      >
        {levels.map((_, i) => (
          <option key={i} value={i + 1}>Level {i + 1}</option>
        ))}
      </select>

      <div className="photo-row">
        {images
          .filter((img) => !targets.includes(img.id))
          .map((img) => (
            <div
              key={img.id}
              className={`photo-box ${selectedId === img.id ? "selected" : ""}`}
              onClick={() => setSelectedId(img.id)}
            >
              <img
                src={img.src}
                alt=""
                className="photo-img"
                onError={(e) => {
                  e.target.src = "/images/fallback.jpg";
                }}
              />
            </div>
          ))}
      </div>

      <div className="target-row">
        {targets.map((id, index) => (
          <div
            key={index}
            className="drop-slot"
            onClick={() => handleSlotClick(index)}
          >
            {id ? (
              <div className="slot-with-remove">
                <img
                  src={getImageById(id)}
                  alt=""
                  className="photo-img small"
                  onError={(e) => {
                    e.target.src = "/images/fallback.jpg";
                  }}
                />
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromSlot(index);
                  }}
                >
                  ❌
                </button>
              </div>
            ) : (
              <div className="placeholder">{index + 1}</div>
            )}
          </div>
        ))}
      </div>

      <button onClick={checkAnswer} className="check-btn">✅ Check Answer</button>
      <button onClick={resetProgress} className="reset-btn">🔁 Reset Progress</button>
      <p className="message">{message}</p>
    </div>
  );
};

export default PhotoGame;
