import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./VideoGame.css";
import { useNavigate } from "react-router-dom";

const levels = [
  ["vid1.mp4","vid2.mp4","vid3.mp4","vid4.mp4","vid5.mp4","vid6.mp4","vid7.mp4","vid8.mp4","vid9.mp4"],
  ["scene1.mp4","scene2.mp4","scene3.mp4","scene4.mp4","scene5.mp4","scene6.mp4","scene7.mp4"],
  ["video1.mp4","video2.mp4","video3.mp4","video4.mp4","video6.mp4","video5.mp4","video7.mp4"],
  ["video1.mp4","video2.mp4","video3.mp4","video4.mp4","video5.mp4","video6.mp4"]
];

const youtubeLinks = [
  "https://youtu.be/Qzi1-J_shSc1",
  "https://youtu.be/Qzi1-J_shSc",
  "https://youtu.be/Qzi1-J_shSc",
  "https://youtu.be/Qzi1-J_shSc"
];

const levelDescriptions = ["💧 Potty Story", "🍎 Field Story", "Phone Story", "Item Story"];

const successSound = new Audio("/sounds/success-1-6297.mp3");
const failSound = new Audio("/sounds/fail-2-277575.mp3");
const voiceSuccess = new Audio("/sounds/very-good.mp3");
const voiceFail = new Audio("/sounds/try-again.mp3");

export default function VideoGame() {
  const navigate = useNavigate();

  const [level, setLevel] = useState(() => parseInt(localStorage.getItem("video-level")) || 1);
  const [clips, setClips] = useState([]);
  const [correctOrder, setCorrect] = useState([]);
  const [targets, setTargets] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");
  const [showLevelComplete, setDone] = useState(false);

  useEffect(() => {
    const files = levels[level - 1];
    if (!files) {
      alert("🎉 All levels finished!");
      return;
    }

    const items = files.map((f, i) => ({
      id: `clip-${i}`,
      src: `/videos/level${level}/${f}`
    }));

    setClips(shuffle(items));
    setCorrect(items.map(v => v.id));
    setTargets(new Array(items.length).fill(null));
    setSelectedId(null);
    setMessage("");
    setDone(false);
  }, [level]);

  const shuffle = a => [...a].sort(() => 0.5 - Math.random());
  const srcById = id => clips.find(c => c.id === id)?.src;

  const clickSlot = i => {
    if (!selectedId || targets[i]) return;
    const next = [...targets];
    next[i] = selectedId;
    setTargets(next);
    setSelectedId(null);
    setMessage("");
  };

  const checkOrder = () => {
    if (targets.includes(null)) {
      setMessage("🚫 Please complete all slots.");
      return;
    }
    if (targets.join() === correctOrder.join()) {
      successSound.play();
      voiceSuccess.play();
      confetti({ particleCount: 150, spread: 60, origin: { y: 0.6 } });
      setDone(true);
    } else {
      failSound.play();
      voiceFail.play();
      setMessage("❌ Malli try cheyu Suhaas!");
      setTargets(new Array(clips.length).fill(null));
    }
  };

  if (showLevelComplete) {
    return (
      <div className="photo-container">
        <h2>Level {level} Complete! 🎉 Very good Suhaas!</h2>
        <button className="check-btn" onClick={() => {
          const next = level + 1;
          setLevel(next);
          localStorage.setItem("video-level", next);
        }}>
          ➡️ Next Level
        </button>
      </div>
    );
  }

  return (
    <div className="photo-container animated-bg">
      <button className="back-btn" onClick={() => navigate("/")}>🔙</button>

      <div className="top-bar">
        <h2 className="story-title">{levelDescriptions[level - 1]}</h2>
      </div>

      <a href={youtubeLinks[level - 1]} target="_blank" rel="noopener noreferrer" className="youtube-link">
        ▶️ Watch Story
      </a>

      <select className="level-select" value={level} onChange={e => {
        const nxt = +e.target.value;
        setLevel(nxt);
        localStorage.setItem("video-level", nxt);
      }}>
        {levels.map((_, i) => (
          <option key={i} value={i + 1}>Level {i + 1}</option>
        ))}
      </select>

      <div className="photo-row">
        {clips.filter(c => !targets.includes(c.id)).map(c => (
          <div key={c.id} className={`video-box ${selectedId === c.id ? "selected" : ""}`} onClick={() => setSelectedId(c.id)}>
            <video src={c.src} autoPlay muted loop playsInline className="video-player" />
          </div>
        ))}
      </div>

      <div className="target-row">
        {targets.map((id, i) => (
          <div key={i} className="drop-slot" onClick={() => clickSlot(i)}>
            {id ? (
              <div className="slot-with-remove">
                <video src={srcById(id)} autoPlay muted loop playsInline className="photo-img small" />
                <button className="remove-btn" onClick={e => {
                  e.stopPropagation();
                  const t = [...targets];
                  t[i] = null;
                  setTargets(t);
                }}>❌</button>
              </div>
            ) : (
              <div className="placeholder">{i + 1}</div>
            )}
          </div>
        ))}
      </div>

      <button onClick={checkOrder} className="check-btn">✅ Check Answer</button>
      <button onClick={() => {
        setLevel(1);
        localStorage.setItem("video-level", 1);
        setMessage("🔁 Level reset.");
      }} className="reset-btn">🔁 Reset</button>

      <p className="message">{message}</p>
    </div>
  );
}
