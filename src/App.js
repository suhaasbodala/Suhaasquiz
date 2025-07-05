import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import NameInput from "./components/NameInput";
import PhotoGame from "./components/PhotoGame";
import VideoGame from "./components/VideoGame";
import CompareGame from "./components/CompareGame";
import AscendingGame from "./components/AscendingGame";
import DayQuiz from "./components/DayQuiz";
import ClockQuiz from "./components/ClockQuiz";
import QuizGame from "./components/QuizGame";
import StoryMode from "./components/StoryMode";
import AscendingTest from "./components/AscendingTest"; // ✅ Add StoryMode
import Result from "./components/Result";
import AscendingResult from "./components/AscendingResult";
import CompareTest from "./components/CompareTest";
export default function App() {
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    if (savedName) setPlayerName(savedName);
  }, []);

  const handleNameSubmit = (name) => {
    setPlayerName(name);
    localStorage.setItem("playerName", name);
  };

  const resetName = () => {
    localStorage.removeItem("playerName");
    setPlayerName("");
  };

  return (
    <Routes>
      {!playerName && (
        <Route path="/" element={<NameInput onNameSubmit={handleNameSubmit} />} />
      )}
      {playerName && (
        <Route
          path="/"
          element={<StartScreen playerName={playerName} onReset={resetName} />}
        />
      )}

      {/* ✅ Static Routes */}
      <Route path="/photo" element={<PhotoGame playerName={playerName} />} />
      <Route path="/video" element={<VideoGame playerName={playerName} />} />
      <Route path="/compare" element={<CompareGame playerName={playerName} />} />
       <Route path="/compare-test" element={<CompareTest />} />
      <Route path="/ascending" element={<AscendingGame playerName={playerName} />} />
      <Route path="/quiz/day" element={<DayQuiz playerName={playerName} />} />
      <Route path="/quiz/clock" element={<ClockQuiz playerName={playerName} />} />
      <Route path="/quiz/game" element={<QuizGame playerName={playerName} />} />
      <Route path="/ascending-test" element={<AscendingTest />} />
      <Route path="/ascending-test" element={<AscendingTest />} />
      <Route path="/result" element={<Result />} />
        <Route path="/ascending-result" element={<AscendingResult />} />
      {/* ✅ Dynamic Story Mode Route */}
      <Route
        path="/story/:storyId/:mode"
        element={<StoryMode playerName={playerName} />}
      />
    </Routes>
  );
}
