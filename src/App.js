 import { Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import PhotoGame from "./components/PhotoGame";
import VideoGame from "./components/VideoGame";
import CompareGame from "./components/CompareGame";
import AscendingGame from "./components/AscendingGame";
import DayQuiz from "./components/DayQuiz";
import ClockQuiz from "./components/ClockQuiz";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/photo" element={<PhotoGame />} />
      <Route path="/video" element={<VideoGame />} />
      <Route path="/compare" element={<CompareGame />} />
      <Route path="/ascending" element={<AscendingGame />} />
      <Route path="/quiz/day" element={<DayQuiz />} />
      <Route path="/quiz/clock" element={<ClockQuiz />} /> 
    </Routes>
  );
}
