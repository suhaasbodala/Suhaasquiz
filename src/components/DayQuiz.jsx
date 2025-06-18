import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./DayQuiz.css";

// Sounds
const sfxRight = new Audio("/sounds/success-1-6297.mp3");
const sfxWrong = new Audio("/sounds/fail-2-277575.mp3");
const voiceRight = new Audio("/sounds/very-good.mp3");
const voiceWrong = new Audio("/sounds/try-again.mp3");

// Questions
const dayQuestions = [
  {
    question: " MONDAY  TARAWATHA  EM DAY VASTADI?",
    options: ["Sunday", "Tuesday", "Wednesday", "Sunday"],
    answer: "Tuesday",
  },
  {
    question: "THURSDAY MUNDU EM DAY VASTADI? ",
    options: ["Monday", "Tuesday", "Wednesday", "Friday"],
    answer: "Wednesday",
  },
  {
    question: " SUNDAY MUNDU EM DAY VASTADI? ",
    options: ["Thursday", "Friday", "Saturday", "Sunday"],
    answer: "Saturday",
  },
  {
    question: "TUESDAY TARAWATHA EM DAY VASTADI?",
    options: ["Monday", "Wednesday", "Thursday", "Friday"],
    answer: "Wednesday",
  },
  {
    question: "WEDNESDAY MUNDU EM DAY VASTADI?",
    options: ["Tuesday", "Thursday", "Friday", "Saturday"],
    answer: "Tuesday",
  },
  {
    question: "FRIDAY TARAWATHA EM DAY VASTADI?",
    options: ["Thursday", "Saturday", "Sunday", "Monday"],
    answer: "Saturday",
  },
  {
    question: "SATURDAY MUNDU EM DAY VASTADI?",
    options: ["Friday", "Sunday", "Monday", "Tuesday"],
    answer: "Friday",
  },
  {
    question: " IVALA THURSDAY. REPU EM DAY?", 
    options: ["Friday", "Saturday", "Sunday", "Monday"],
    answer: "Friday",
  },
  {
    question: " IVALA FRIDAY. NINNA EM DAY?",
    options: ["Thursday", "Saturday", "Sunday", "Monday"],
    answer: "Thursday",
  }
];

export default function DayQuiz() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState("");
  const [feedback, setFeedback] = useState("");

  const question = dayQuestions[quizIndex];

  const handleAnswer = (opt) => {
    if (selectedOpt) return;

    setSelectedOpt(opt);

    if (opt === question.answer) {
      sfxRight.play();
      voiceRight.play();
      setFeedback("🎉 Very good Suhaas!");

      setTimeout(() => {
        confetti({ particleCount: 100, spread: 70 });
        setSelectedOpt("");
        setFeedback("");

        if (quizIndex + 1 < dayQuestions.length) {
          setQuizIndex(quizIndex + 1);
        } else {
          setFeedback("🎊 Quiz Completed!");
        }
      }, 2000);
    } else {
      sfxWrong.play();
      voiceWrong.play();
      setFeedback("❌ Malli try cheyu Suhaas!");
      setTimeout(() => {
        setSelectedOpt("");
        setFeedback("");
      }, 3000);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        <div className="quiz-content">
          <h2 className="quiz-question">{question.question}</h2>

          <div className="quiz-options">
            {question.options.map((opt, i) => {
              const isChosen = selectedOpt === opt;
              const isCorrect = isChosen && opt === question.answer;
              const isWrong = isChosen && opt !== question.answer;

              return (
                <button
                  key={i}
                  className={`quiz-option ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                  disabled={!!selectedOpt}
                  onClick={() => handleAnswer(opt)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {feedback && <p className="quiz-feedback">{feedback}</p>}
        </div>
      </div>
    </div>
  );
}
