import React, { useState, useEffect } from "react";
import questions from "../data/questions";
import "./QuizGame.css";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import generateQuizPDF from "../utils/generateQuizPDF";

export default function QuizGame() {
  const [selectedTime, setSelectedTime] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [quizIndex, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [score, setScore] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [numPdfQuestions, setNumPdfQuestions] = useState(6);
  const navigate = useNavigate();

  const currentQuestion = questions[quizIndex];
  const successSound = new Audio("/sounds/success-1-6297.mp3");
  const failSound = new Audio("/sounds/fail-2-277575.mp3");
  const quizCorrectSound = new Audio("/sounds/very-good.mp3");
  const quizWrongSound = new Audio("/sounds/try-again.mp3");

  const playPair = (a, b) => {
    a.currentTime = 0;
    b.currentTime = 0;
    a.play().catch(() => {});
    b.play().catch(() => {});
  };

  const startTimer = () => {
    if (selectedTime) {
      setTimeLeft(Number(selectedTime));
      setTimerActive(true);
    }
  };

  useEffect(() => {
    if (!timerActive || timeLeft === null || quizDone || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setQuizDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, quizDone, isPaused]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const handleAnswer = (opt) => {
    setSelectedOpt(opt);
    if (opt === currentQuestion.correctAnswer) {
      setScore(score + 1);
      playPair(successSound, quizCorrectSound);
      setFeedbackMsg("🎉 Very good Suhaas!");

      setTimeout(() => {
        setSelectedOpt(null);
        setFeedbackMsg("");
        if (quizIndex + 1 === questions.length) {
          confetti({ particleCount: 100, spread: 70 });
          setQuizDone(true);
        } else {
          setQuizIdx((i) => i + 1);
        }
      }, 2000);
    } else {
      playPair(failSound, quizWrongSound);
      setFeedbackMsg("❌ Malli try cheyu Suhaas!");
      setTimeout(() => {
        setSelectedOpt(null);
        setFeedbackMsg("");
      }, 4000);
    }
  };

  return (
    <div className="quiz-container">
      <button className="back-btn" onClick={() => navigate("/")}>🔙</button>

      <div className="top-bar">
        <h1 className="quiz-title">Quiz Game</h1>

        <div className="top-controls">
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">-- Optional Timer --</option>
            {[...Array(59)].map((_, i) => {
              const minutes = i + 1;
              return (
                <option key={minutes} value={minutes * 60}>
                  {minutes} minute{minutes > 1 ? "s" : ""}
                </option>
              );
            })}
          </select>

          <button className="start-btn" onClick={startTimer}>Start Quiz</button>

          {timerActive && timeLeft !== null && (
            <>
              <p className="timer">Time Left: {formatTime(timeLeft)}</p>
              <button className="pause-btn" onClick={() => setIsPaused(!isPaused)}>
                {isPaused ? "Resume" : "Pause"}
              </button>
            </>
          )}

          {/* PDF Controls */}
          <input
            type="number"
            min="1"
            max={questions.length}
            value={numPdfQuestions}
            onChange={(e) => setNumPdfQuestions(Number(e.target.value))}
            placeholder="No. of Qs"
            style={{ padding: "6px", width: "80px" }}
          />
          <button
            className="start-btn"
            onClick={() => generateQuizPDF(questions, numPdfQuestions)}
          >
            📄 Generate PDF
          </button>
        </div>
      </div>

      <div className="main-content">
        {quizDone ? (
          <div className="result">
            <h2>Quiz Completed 🎉</h2>
            <p>Your Score: {score} / {questions.length}</p>
          </div>
        ) : (
          <div className="quiz-box">
            <h3>{currentQuestion.question}</h3>
            <div className="options">
              {currentQuestion.options.map((opt, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    selectedOpt === opt
                      ? opt === currentQuestion.correctAnswer
                        ? "correct"
                        : "wrong"
                      : ""
                  }`}
                  onClick={() => handleAnswer(opt)}
                  disabled={selectedOpt !== null}
                >
                  {opt}
                </button>
              ))}
            </div>
            {feedbackMsg && <p className="feedback-msg">{feedbackMsg}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
