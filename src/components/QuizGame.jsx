import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizGame.css";

const play = (a) => {
  a.currentTime = 0;
  a.play().catch(() => {});
};
const twin = (a, b) => {
  play(a);
  play(b);
};

const sfxRight = new Audio("/sounds/success-1-6297.mp3");
const sfxWrong = new Audio("/sounds/fail-2-277575.mp3");
const voiceRight = new Audio("/sounds/very-good.mp3");
const voiceWrong = new Audio("/sounds/try-again.mp3");
const tapSound = new Audio("/sounds/tap.mp3");

const originalQuizData = [
  {
    image: "/images/pic1.jpg",
    questions: [
      {
        question: "Babu em chestunadu?",
        options: ["Padukunadu", "Thintunadu", "TV chustunadu", "Aadukuntadu"],
        answer: "Padukunadu"
      },
      {
        question: "Evaru unnaru?",
        options: ["Amma", "Nanna", "Babu", "Akka"],
        answer: "Babu"
      },
      {
        question: "Babu ekkada padukunadu?",
        options: ["Bed paina", "Bed kinda", "Bed pakkana", "Bed lopala"],
        answer: "Bed paina"
      },
      {
        question: "Babu pakana em undhi?",
        options: ["Pillow", "Blanket", "Teddy bear", "Book"],
        answer: "Teddy bear"
      },
      {
        question: "Table paina em undhi?",
        options: ["Mobile", "Lamp", "Book", "Pen"],
        answer: "Lamp"
      }
    ]
  },
  {
    image: "/images/pic2.jpg",
    questions: [
      {
        question: "Students entha unnaru?",
        options: ["3", "4", "5", "6"],
        answer: "6"
      },
      {
        question: "Eppudu jarigindhi?",
        options: ["Morning", "Afternoon", "Evening", "Night"],
        answer: "Morning"
      },
      {
        question: "Students yela unnaru?",
        options: ["Happy", "Sad", "Angry", "Confused"],
        answer: "Happy"
      },
      {
        question: "Students yela kalisi unnaru?",
        options: ["Sitting", "Standing", "Running", "Jumping"],
        answer: "Sitting"
      },
      {
        question: "Ekkada jarigindhi?",
        options: ["Classroom", "Playground", "Library", "Canteen"],
        answer: "Classroom"
      },
      {
        question: "Students yela kalisi chustunnaru?",
        options: ["Reading", "Writing", "Talking", "Playing"],
        answer: "Talking"
      },
      {
        question: "Students yela dress pettukunnaru?",
        options: ["Uniform", "Casual", "Traditional", "Sportswear"],
        answer: "Uniform"
      }
    ]
  }
];

const QuizGame = () => {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showStar, setShowStar] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);

  const currentSet = originalQuizData[imageIndex];
  const currentQuestion = currentSet.questions[questionIndex];

  const currentGlobalIndex = originalQuizData
    .slice(0, imageIndex)
    .reduce((sum, q) => sum + q.questions.length, 0) + questionIndex;

  const handleAnswer = (option) => {
    play(tapSound);
    const newHistory = [...answerHistory];

    if (option === currentQuestion.answer) {
      setFeedback("✅ Correct!");
      twin(sfxRight, voiceRight);
      setShowStar(true);

      newHistory[currentGlobalIndex] = newHistory[currentGlobalIndex] === "wrong" ? "wrong" : "right";
      setAnswerHistory(newHistory);

      setTimeout(() => {
        setShowStar(false);
        setFeedback("");
        if (questionIndex < currentSet.questions.length - 1) {
          setQuestionIndex(questionIndex + 1);
        } else if (imageIndex < originalQuizData.length - 1) {
          setImageIndex(imageIndex + 1);
          setQuestionIndex(0);
        } else {
          setQuizFinished(true);
        }
      }, 1200);
    } else {
      setFeedback("❌ Wrong, try again!");
      twin(sfxWrong, voiceWrong);
      newHistory[currentGlobalIndex] = "wrong";
      setAnswerHistory(newHistory);
    }
  };

  const restartQuiz = () => {
    setImageIndex(0);
    setQuestionIndex(0);
    setQuizFinished(false);
    setFeedback("");
    setAnswerHistory([]);
  };

  const goToStart = () => {
    navigate("/");
  };

  if (quizFinished) {
    return (
      <div className="quiz-container final-screen">
        <h2>🎉 Shabash Suhaas! You completed the quiz!</h2>
        <button className="restart-btn" onClick={restartQuiz}>🔁 Play Again</button>
        <button className="restart-btn" onClick={goToStart}>🏠 Back to Start</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <button className="back-button-top-left" onClick={goToStart}>🏠</button>

      <div className="progress-bar">
        {currentSet.questions.map((_, idx) => {
          const globalIndex = originalQuizData
            .slice(0, imageIndex)
            .reduce((sum, q) => sum + q.questions.length, 0) + idx;
          const status = answerHistory[globalIndex];
          return (
            <span key={idx} className={`dot ${status || "pending"}`}>
              {status === "right" ? "🟢" : status === "wrong" ? "🔴" : "⚪"}
            </span>
          );
        })}
      </div>

      <div className="quiz-content">
        <img src={currentSet.image} alt="Quiz" className="quiz-image" />
        <div className="question-box">
          <h2>{currentQuestion.question}</h2>
          <div className="options">
            {currentQuestion.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(opt)}>
                {opt}
              </button>
            ))}
          </div>
          <p className="feedback">{feedback}</p>
        </div>
      </div>

      {showStar && <div className="star-animation">🌟</div>}
    </div>
  );
};

export default QuizGame;
