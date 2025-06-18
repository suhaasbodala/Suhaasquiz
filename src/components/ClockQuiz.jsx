import React, { useState, useEffect, useRef } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import "./ClockQuiz.css";

const sfxRight = new Audio("/sounds/success-1-6297.mp3");
const sfxWrong = new Audio("/sounds/fail-2-277575.mp3");
const voiceRight = new Audio("/sounds/very-good.mp3");
const voiceWrong = new Audio("/sounds/try-again.mp3");

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

export default function ClockQuiz() {
  const [level, setLevel] = useState(1); // Default to level 1
  const [selectedMinutes, setSelectedMinutes] = useState(5);
  const [duration, setDuration] = useState(null);
  const [started, setStarted] = useState(false);

  const [question, setQuestion] = useState(generateQuestion(1));
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
    setDuration(seconds);
    setTimeLeft(seconds);
    setStarted(true);
    setQuestion(generateQuestion(level));
  };

  const handleAnswer = (opt) => {
    setSelected(opt);
    setTotal((t) => t + 1);
    if (opt === question.answer) {
      sfxRight.play();
      voiceRight.play();
      setCorrect((c) => c + 1);
      setMsg("✅ Very Good Suhaas!");
      setTimeout(() => {
        setMsg("");
        setSelected("");
        setQuestion(generateQuestion(level));
      }, 2000);
    } else {
      sfxWrong.play();
      voiceWrong.play();
      setWrong((w) => w + 1);
      setMsg("❌ Malli try cheyu Suhaas!");
      setTimeout(() => {
        setMsg("");
        setSelected("");
      }, 3000);
    }
  };

  const resetQuiz = () => {
    clearInterval(timerRef.current);
    setStarted(false);
    setDuration(null);
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

  if (timeLeft === 0 && started) {
    return (
      <div className="clock-container">
        <h2 className="title">⏰ Time's Up Suhaas!</h2>
        <p className="clock-msg">📊 Total: {total}</p>
        <p className="clock-msg">✅ Correct: {correct}</p>
        <p className="clock-msg">❌ Wrong: {wrong}</p>
        <button className="opt-btn" onClick={resetQuiz}>🔁 Start Again</button>
      </div>
    );
  }

  return (
    <div className="clock-container">
      <h2 className="title">🕒 TIME ANTHA AVUTUNDHI SUHAAS?</h2>

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
    <label style={{ fontSize: "18px" }}>Select Timer (1–59 mins):</label>
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

  <button className="opt-btn" onClick={startQuiz}>
    ▶️ Start Quiz
  </button>
</div>

      ) : (
        <p className="clock-msg">⏳ Time Left: {formatTimer()}</p>
      )}

      <div className="quiz-layout">
        <div className="clock-box">
          <Clock value={question.time} renderNumbers={true} size={250} />
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
