import React, { useState, useEffect, useRef } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import "./ClockQuiz.css";
import { useNavigate } from "react-router-dom";
import { generateClockWorksheet } from "../utils/generateClockWorksheet";

// Static sound effects
const sfxRight = new Audio("/sounds/success-1-6297.mp3");
const sfxWrong = new Audio("/sounds/fail-2-277575.mp3");

// Cartoon-style static voices (ONLY for Suhaas)
const voiceRightSuhaas = new Audio("/sounds/very-good.mp3");
const voiceWrongSuhaas = new Audio("/sounds/try-again.mp3");

// Dynamic voice for other names
const speak = (text) => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  if (!voices.length) {
    synth.onvoiceschanged = () => speak(text);
    return;
  }

  const voice =
    voices.find((v) => v.lang === "en-IN") ||
    voices.find((v) => v.name.toLowerCase().includes("female")) ||
    voices[0];

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = "en-IN";
  utterance.pitch = 0.8;  // childlike pitch
  utterance.rate = 0.45;  // playful speed
  utterance.volume = 1;
  synth.cancel();
  synth.speak(utterance);
};

const formatTime = (date) => {
  let h = date.getHours();
  if (h === 0) h = 12;
  if (h > 12) h %= 12;
  const m = date.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
};

const generateRandomTime = (level) => {
  const hour = Math.floor(Math.random() * 12) + 1;
  const minute = level === 1
    ? Math.floor(Math.random() * 12) * 5
    : Math.floor(Math.random() * 60);
  return new Date(2023, 1, 1, hour, minute);
};

const generateOptions = (correctTime) => {
  const options = new Set([correctTime]);
  while (options.size < 4) {
    let h = Math.floor(Math.random() * 12) + 1;
    let m = Math.floor(Math.random() * 60);
    options.add(`${h}:${m.toString().padStart(2, "0")}`);
  }
  return Array.from(options).sort(() => 0.5 - Math.random());
};

const generateQuestion = (level) => {
  const time = generateRandomTime(level);
  const correct = formatTime(time);
  const options = generateOptions(correct);
  return { time, options, answer: correct };
};

export default function ClockQuiz({ playerName = "Suhaas" }) {
  const navigate = useNavigate();
  const [level] = useState(1);
  const [selectedMinutes, setSelectedMinutes] = useState(5);
  const [started, setStarted] = useState(false);

  const [question, setQuestion] = useState(generateQuestion(level));
  const [selected, setSelected] = useState("");
  const [msg, setMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  const timerRef = useRef(null);
  const minuteOptions = Array.from({ length: 59 }, (_, i) => i + 1);

  useEffect(() => {
    if (started && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [started]);

  useEffect(() => {
    if (timeLeft === 0 && started) {
      clearInterval(timerRef.current);
    }
  }, [timeLeft]);

  const startQuiz = () => {
    const seconds = selectedMinutes * 60;
    setTimeLeft(seconds);
    setStarted(true);
    setQuestion(generateQuestion(level));
  };

  const handleAnswer = (opt) => {
    setSelected(opt);
    setTotal((t) => t + 1);
    const isSuhaas = playerName.toLowerCase() === "suhaas";

    if (opt === question.answer) {
      sfxRight.play();
      if (isSuhaas) {
        voiceRightSuhaas.currentTime = 0;
        voiceRightSuhaas.play();
      } else {
        speak(`Very good ${playerName}`);
      }
      setCorrect((c) => c + 1);
      setMsg(`✅ Very good ${playerName}!`);
      setTimeout(() => {
        setMsg("");
        setSelected("");
        setQuestion(generateQuestion(level));
      }, 2000);
    } else {
      sfxWrong.play();
      if (isSuhaas) {
        voiceWrongSuhaas.currentTime = 0;
        voiceWrongSuhaas.play();
      } else {
        speak(`Malli try cheeyyu ${playerName}`);
      }
      setWrong((w) => w + 1);
      setMsg(`❌ Malli try cheyu ${playerName}!`);
      setTimeout(() => {
        setMsg("");
        setSelected("");
      }, 5000);
    }
  };

  const resetQuiz = () => {
    clearInterval(timerRef.current);
    setStarted(false);
    setTimeLeft(0);
    setTotal(0);
    setCorrect(0);
    setWrong(0);
    setSelected("");
    setMsg("");
    setQuestion(generateQuestion(level));
  };

  const formatTimer = () => {
    const min = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const sec = (timeLeft % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const getFeedbackEmoji = () => {
    const percentage = total === 0 ? 0 : (correct / total) * 100;
    if (percentage >= 90) return "🌟 Excellent!";
    if (percentage >= 70) return "😊 Great Job!";
    if (percentage >= 50) return "🙂 Good Try!";
    return "💪 Keep Practicing!";
  };

  const handlePDF = () => {
    const count = parseInt(prompt("How many clock images do you want? (max 50)"), 10);
    if (!isNaN(count) && count > 0 && count <= 50) {
      generateClockWorksheet(count, 4);
    } else {
      alert("Please enter a number between 1 and 50");
    }
  };

  if (timeLeft === 0 && started) {
    return (
      <div className="clock-container">
        <button className="back-btn" onClick={() => navigate("/")}>🔙</button>
        <h2 className="title">⏰ Time's Up {playerName}!</h2>
        <div className="score-boxes">
          <p className="clock-msg">📊 Total: {total}</p>
          <p className="clock-msg">✅ Correct: {correct}</p>
          <p className="clock-msg">❌ Wrong: {wrong}</p>
          <p className="clock-msg">🎯 {getFeedbackEmoji()}</p>
          <button className="opt-btn" onClick={resetQuiz}>🔁 Start Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="clock-container">
      <button className="back-btn" onClick={() => navigate("/")}>🔙</button>
      <button className="pdf-btn" onClick={handlePDF}>📝 PDF</button>
      <h2 className="title">🕒 TIME ENTHA AVUTUNDHI {playerName.toUpperCase()}?</h2>

      {!started ? (
        <div style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span role="img" aria-label="alarm">⏰</span>
            <label style={{ fontSize: "18px" }}>Select Timer:</label>
            <select
              value={selectedMinutes}
              onChange={(e) => setSelectedMinutes(Number(e.target.value))}
              className="timer-select"
            >
              {minuteOptions.map((min) => (
                <option key={min} value={min}>
                  {min} Minute{min > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <button className="opt-btn" onClick={startQuiz}>▶️ Start Quiz</button>
        </div>
      ) : (
        <p className="clock-msg">⏳ Time Left: {formatTimer()}</p>
      )}

      <div className="quiz-layout">
        <div className="clock-box">
          <Clock
            value={question.time}
            renderNumbers={true}
            size={250}
          />
        </div>

        <div className="option-group">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`opt-btn ${selected === opt
                ? (opt === question.answer ? "correct" : "wrong") : ""}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {msg && <p className="clock-msg">{msg}</p>}
    </div>
  );
}
