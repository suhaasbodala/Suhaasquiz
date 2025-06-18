// src/components/ClockQuiz.jsx
// src/components/ClockQuiz.jsx
import React, { useState } from "react";
import Clock from "react-clock";
import 'react-clock/dist/Clock.css';
import './ClockQuiz.css';

const quizData = [
  { time: new Date(2023, 1, 1, 7, 15), options: ["7:03", "7:15", "8:15", "6:45"], answer: "7:15" },
  { time: new Date(2023, 1, 1, 10, 5), options: ["10:05", "10:30", "9:45", "10:15"], answer: "10:05" },
  { time: new Date(2023, 1, 1, 12, 0), options: ["12:12", "1:00", "12:00", "11:59"], answer: "12:00" },
  { time: new Date(2023, 1, 1, 3, 15), options: ["3:10", "3:15", "3:25", "3:20"], answer: "3:15" },
  { time: new Date(2023, 1, 1, 6, 45), options: ["6:30", "6:45", "7:00", "6:50"], answer: "6:45" },
  { time: new Date(2023, 1, 1, 1, 5), options: ["1:00", "1:10", "1:05", "1:15"], answer: "1:05" },
  { time: new Date(2023, 1, 1, 11, 35), options: ["11:30", "11:25", "11:35", "12:00"], answer: "11:35" },
  { time: new Date(2023, 1, 1, 9, 20), options: ["9:10", "9:25", "9:30", "9:20"], answer: "9:20" },
  { time: new Date(2023, 1, 1, 4, 50), options: ["4:45", "4:50", "5:00", "4:55"], answer: "4:50" },
  { time: new Date(2023, 1, 1, 8, 30), options: ["8:20", "8:30", "8:40", "8:25"], answer: "8:30" }
];

const sfxRight = new Audio("/sounds/success-1-6297.mp3");
const sfxWrong = new Audio("/sounds/fail-2-277575.mp3");
const voiceRight = new Audio("/sounds/very-good.mp3");
const voiceWrong = new Audio("/sounds/try-again.mp3");

export default function ClockQuiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [msg, setMsg] = useState("");

  const current = quizData[index];

  const handleAnswer = (opt) => {
    setSelected(opt);
    if (opt === current.answer) {
      sfxRight.play();
      voiceRight.play();
      setMsg("✅ Very Good Suhaas!");
      setTimeout(() => {
        setSelected("");
        setMsg("");
        setIndex((prev) => (prev + 1) % quizData.length);
      }, 2000);
    } else {
      sfxWrong.play();
      voiceWrong.play();
      setMsg("❌ Malli try cheyu Suhaas!");
      setTimeout(() => {
        setSelected("");
        setMsg("");
      }, 3000);
    }
  };

  return (
    <div className="clock-container">
      <h2 className="title">🕒 TIME ANTHA AVUTUNDHI SUHAAS?</h2>
      <div className="quiz-layout">
        <div className="clock-box">
          <Clock value={current.time} renderNumbers={true} size={250} />
        </div>

        <div className="option-group">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`opt-btn ${selected === opt
                ? (opt === current.answer ? "correct" : "wrong") : ""}`}
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
