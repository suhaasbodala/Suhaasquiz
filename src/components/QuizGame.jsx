import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./QuizGame.css";

// Audio helpers
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

// All quiz data grouped by topic
const quizData = {
  howmany: [
  {
    image: "/images/Howmany/pic1.jpg",
    questions: [
      { question: "IKKADA ENNI ITEMS UNNAYI?", options: ["2", "3", "4", "9"], answer: "9" },
      { question: "IKKADA EMI UNNAYI?", options: ["Persons", "Items", "Animals", "Birds"], answer: "Items" },
      { question: "IKKADA ENNI RED BALLS UNNAYI?", options: ["2", "3", "4", "5"], answer: "2" },
      { question: "IKKADA ENNI CARS UNNAYI?", options: ["2", "3", "4", "5"], answer: "5" },
      { question: "IKKADA ENNI ROBOTS UNNAYI?", options: ["2", "3", "4", "5"], answer: "2" }
    ]
  },
  {
    image: "/images/Howmany/pic2.jpg",
    questions: [
      { question: "IKKADA ENNI ANIMALS UNNAYI?", options: ["2", "3", "8", "5"], answer: "8" },
      { question: "IKKADA EMI UNNAYI?", options: ["Animals", "Birds", "Items", "Persons"], answer: "Animals" },
      { question: "IKKADA ENNI MONKEYS UNNAYI?", options: ["2", "3", "4", "5"], answer: "2" },
      { question: "IKKADA ENNI ELEPHANTS UNNAYI?", options: ["2", "3", "4", "5"], answer: "4" },
      { question: "IKKADA ENNI GIRAFFES UNNAYI?", options: ["2", "3", "4", "5"], answer: "2" },
      { question: "IKKADA ENNI SMAKES UNNAYI?", options: ["2", "3", "1", "5"], answer: "1" }
    ]
  },
  {
    image: "/images/Howmany/pic3.jpg",
    questions: [
      { question: "IKKADA EVARU UNNARU?", options: ["Persons", "Items", "Animals", "Birds"], answer: "persons" },
      { question: "IKKADA ENTHA MANDHI GIRLS UNNARU?", options: ["2", "3", "4", "5"], answer: "2" },
      { question: "IKKADA ENTHA MANDHI BOYS UNNARU?", options: ["2", "3", "4", "5"], answer: "3" }
    ]
  },
  {
    image: "/images/Howmany/pic4.jpg",
    questions: [
      { question: "IKKADA ENTHA MANDHI PERSONS UNNARU?", options: ["2", "3", "4", "5"], answer: "2" },
      { question: "IKKADA ENNI ANIMALS UNNAYI?", options: ["0", "2", "1", "4"], answer: "1" },
      { question: "IKKADA ENNI ITEMS UNNAYI?", options: ["2", "3", "4", "5"], answer: "4" },
      { question: "IKKADA ENNI GREEN CARS UNNAYI?", options: ["2", "1", "4", "5"], answer: "1" }
    ]
  }
],
  prepositions: [
    {
      image: "/images/prepositions/pic1.png",
      questions: [
        { question: " CAT CHAIR ______________UNDI.", options: ["Lopala", "Paina", "Kinda"], answer: "Kinda" }
      ]
    },
    {
      image: "/images/prepositions/pic2.png",
      questions: [
        { question: "BOOK TABLE ______________UNDI.", options: ["Lopala", "Paina", "Kinda"], answer: "Paina" }
      ]
    },
    {
      image: "/images/prepositions/pic3.png",
      questions: [
        { question: "FRUITS BASKET ______________UNNAYI.", options: ["Lopala", "Paina", "Kinda"], answer: "Lopala" }
      ]
    },
    {
      image: "/images/prepositions/pic4.png",
      questions: [
        { question: "PIGEON CHETHI  ______________UNDI.", options: ["Lopala", "Paina", "Kinda"], answer: "Paina" }
      ]
    },
    {
      image: "/images/prepositions/pic5.png",
      questions: [
        { question: "APPLE TABLE ______________UNDI.", options: ["Lopala", "Paina", "Kinda"], answer: "Paina" }
      ]
    },
    {
      image: "/images/prepositions/pic6.png",
      questions: [
        { question: "BOX ______________ BALL UNDI.", options: ["Lopala", "Paina", "Kinda"], answer: "Lopala" }
      ]
    },
    {
      image: "/images/prepositions/pic7.png",
      questions: [
        { question: "DOG SOFA ______________UNDI.", options: ["Lopala", "Paina", "Kinda"], answer: "Paina" }
      ]
    },
    {
      image: "/images/prepositions/pic8.png",
      questions: [
        { question: "BALL TABLE ______________UNDI.", options: ["Lopala", "Paina", "Kinda"], answer: "Kinda" }
      ]
    },
    {
      image: "/images/prepositions/pic9.png",
      questions: [
        { question: "CAT SOFA ______________UNDI.", options: ["Lopala", "Paina", "Kinda"], answer: "Kinda" }
      ]
    },
    {
      image: "/images/prepositions/pic10.png",
      questions: [
        { question: "BAG CHAIR ______________UNDI.", options: ["Lopala", "Paina", "Kinda"], answer: "Paina" }
      ]
    }
  ],
  adjectives: [
    {
      image: "/images/adjectives/pic1.png",
      questions: [
        { question: "APPLE EE COLOUR LO UNDI", options: ["Green", "Blue", "Red", "Yellow"], answer: "Red" }
      ],
    },
    { 
    image: "/images/adjectives/pic2.png",
      questions: [
        { question: "Dog ee colour lo undhi?", options: ["Green", "Blue", "Black", "Yellow"], answer: "Black" }
      ]
    },
    {
      image: "/images/adjectives/pic3.png",
      questions: [
        { question: "BOX ______ BALL UNDI.", options: ["Lopala", "paina", "Kinda"], answer: "Lopala" },
        { question: "BALL EE COLOUR LO UNDI?", options: ["Green", "Blue", "Black", "Yellow"], answer: "Yellow" }
      ]
    },
    
    {
      image: "/images/adjectives/pic5.png",
      questions: [
        { question: "ELEPHANT _________GA UNDI.", options: ["Big", "Small"], answer: "Big" },
        { question: "CAT _________GA UNDI.", options: ["Big", "Small"], answer: "Small" }
      ]
    },
    {
      image: "/images/adjectives/pic6.png",
      questions: [
        { question: "BAG _________GA UNDI.", options: ["Big", "Small"], answer: "Big" },
        { question: "BOTTLE _________GA UNDI.", options: ["Big", "Small"], answer: "Small" }
      ] 
    }
  ],
  misc: [
    {
      image: "/images/misc/pic1.png",
      questions: [
        { question: "Ikkada evaru unanru?", options: ["Riya", "Amma", "Nanna"], answer: "Riya" },
        { question: "Ikkada emi animal undi", options: ["Cat", "Rabbit", "Elephant"], answer: "Rabbit" },
        { question: "Idi eppudu?", options: ["Day", "Night"], answer: "Day" }
      ]
    },
    {
      image: "/images/misc/pic2.png",
      questions: [
        { question: "LAPTOP TABLE __________UNDI. ", options: ["Lopala", "paina", "Kinda"], answer: "paina" }
      ]
    },
    {
      image: "/images/misc/pic3.png",
      questions: [
        { question: "MONKEY _________GA UNDI. ", options: ["Big", "Small"], answer: "Small" },
        { question: "GIRAFFE_________GA UNDI. ", options: ["Big", "Small"], answer: "Big" }
      ]
    },
    {
      image: "/images/misc/pic4.png",
      questions: [
        { question: " BALL BOX _________ UNDI. ", options: ["Lopala", "paina", "Kinda"], answer: "Lopala" },
        { question: " BALL EMI COLOUR LO UNDI? ", options: ["Red", "Blue", "Black"], answer: "Red" }
      ]
    },
    {
      image: "/images/misc/pic5.png",
      questions: [
        { question: "Ikkada evaru unnaaru?", options: ["Person", "Animal"], answer: "Person" },
        { question: "BOY CHAIR __________ KURCHONI UNNADU. ", options: ["Lopala", "Kinda", "Paina"], answer: "Paina" }
      ]
    },
    {
      image: "/images/misc/pic6.png",
      questions: [
        { question: "IDI EPPUDU? ", options: ["Day", "Night"], answer: "Night" },
        { question: " IKKADA EVARU UNNARU?", options: ["Person", "Animal"], answer: "Person" }
      ]
    },
    {
      image: "/images/misc/pic7.png",
      questions: [
        { question: "DOG SOFA ________ UNDI. ", options: ["Lopala", "Paina", "Kinda"], answer: "Paina"},
        { question: "Ikkada emi unnai", options: ["Person", "Items", "Animal"], answer: "Animal" }
      ]
    },
    {
      image: "/images/misc/pic8.png",
      questions: [
        { question: "BALL TABLE __________UNDI. ", options: ["Lopala", "paina", "Kinda"], answer: "Kinda" }
      ]
    },
    {
      image: "/images/misc/pic9.png",
      questions: [
        { question: "IDI EPPUDU?", options: ["Day", "Night"], answer: "Day" }
      ]
    },
    {
      image: "/images/misc/pic10.png",
      questions: [
        { question: "Ikkada evaru unnaaru?", options: ["Surya", "Riya"], answer: "Surya" },
        { question: "Ikkada emi animal undhi?", options: ["Rabbit", "Dog"], answer: "Dog" }
      ]
    }
  ]
};

const QuizGame = ({ playerName }) => {
  const { topic } = useParams();
  const navigate = useNavigate();

  const originalQuizData = quizData[topic] || [];

  const [imageIndex, setImageIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showStar, setShowStar] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);

  const currentSet = originalQuizData[imageIndex];
  const currentQuestion = currentSet?.questions[questionIndex];

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

  const goBack = () => {
    navigate("/quiz");
  };

  // 🔐 Invalid topic or no question
  if (!currentQuestion) {
    return (
      <div className="quiz-container">
        <h2>No questions found for topic: {topic}</h2>
        <button className="restart-btn" onClick={goBack}>🔙 Back</button>
      </div>
    );
  }

  // 🎉 Final screen
  if (quizFinished) {
    return (
      <div className="quiz-container final-screen">
        <h2>🎉 Shabash {playerName || "Suhaas"}! You completed the quiz!</h2>
        <button className="restart-btn" onClick={restartQuiz}>🔁 Play Again</button>
        <button className="restart-btn" onClick={goBack}>🏠 Back to Topics</button>
      </div>
    );
  }

  // 🧠 Main Quiz Screen
  return (
    <div className="quiz-container">
      <button className="back-button-top-left" onClick={goBack}>🏠</button>

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