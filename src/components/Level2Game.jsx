import React, { useState } from "react";
import "./TensOnesGame.css";
import TensOnesGame from "./TensOnesGame";

const sfxRight = new Audio("/sounds/success-1-6297.mp3");
const sfxWrong = new Audio("/sounds/fail-2-277575.mp3");
const voiceRight = new Audio("/sounds/very-good.mp3");
const voiceWrong = new Audio("/sounds/try-again.mp3");
const tapSound = new Audio("/sounds/tap.mp3");

function Level2Game() {
  const [level, setLevel] = useState("level2");
  const generateNumber = () => Math.floor(Math.random() * 90) + 10;

  const [target, setTarget] = useState(generateNumber());
  const [tensCount, setTensCount] = useState(0);
  const [onesCount, setOnesCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const handleAddTen = () => {
    tapSound.play();
    setTensCount(prev => prev + 1);
  };

  const handleAddOne = () => {
    tapSound.play();
    setOnesCount(prev => prev + 1);
  };

  const handleReset = () => {
    setTensCount(0);
    setOnesCount(0);
    setSelected(null);
    setResult(null);
  };

  const handleSubmit = () => {
    const total = tensCount * 10 + onesCount;
    setSelected(total);

    if (total === target) {
      sfxRight.play();
      voiceRight.play();
      setResult("correct");
      setScore(prev => prev + 1);
      setTimeout(() => {
        setTarget(generateNumber());
        handleReset();
      }, 2000);
    } else {
      sfxWrong.play();
      voiceWrong.play();
      setResult("wrong");
    }
  };

  if (level === "level1") return <TensOnesGame />;

  return (
    <div className="quiz-container">
      <div className="top-bar">
        <h2 className="score">✓ {score}</h2>
        <label className="level-toggle">
          <select
            className="level-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="level1">Level 1: Choose the Number</option>
            <option value="level2">Level 2: Build the Number</option>
          </select>
        </label>
      </div>

      <h2 className="target">Build the number: {target}</h2>

      <div className="quiz-content">
        <div className="visual-box">
          <div className="block-section card">
            <h3>Tens Blocks</h3>
            <div className="grid-tens">
              {[...Array(tensCount)].map((_, ti) => (
                <div key={ti} className="grid-strip">
                  {[...Array(10)].map((_, ui) => (
                    <div key={ui} className="grid-block ten-block" />
                  ))}
                </div>
              ))}
            </div>
            <button className="option-btn" onClick={handleAddTen}>
              ➕ Add Ten
            </button>
          </div>

          <div className="block-section card">
            <h3>Ones Blocks</h3>
            <div className="ones-display">
              {[...Array(onesCount)].map((_, oi) => (
                <div key={oi} className="one-with-label">
                  <div className="grid-block" />
                </div>
              ))}
            </div>
            <button className="option-btn" onClick={handleAddOne}>
              ➕ Add One
            </button>
          </div>
        </div>

        <div className="options-box">
          <button className="submit-btn" onClick={handleSubmit}>
            ✅ Submit
          </button>
          <button className="reset-btn" onClick={handleReset}>
            🔄 Reset
          </button>

          {result === "correct" && (
            <p className="result-message">🎉 Correct!</p>
          )}
          {result === "wrong" && (
            <p className="result-message">❌ Try again!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Level2Game;