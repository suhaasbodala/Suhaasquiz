import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Core Screens
import StartScreen from "./components/StartScreen";
import NameInput from "./components/NameInput";

// Story/Video Modes
import StoryMode from "./components/StoryMode";
import PhotoGame from "./components/PhotoGame";
import VideoGame from "./components/VideoGame";

// Quiz Flow
import QuizTopicScreen from "./components/QuizTopicScreen";
import QuizGame from "./components/QuizGame";
import DayQuiz from "./components/DayQuiz";
import ClockQuiz from "./components/ClockQuiz";

// Number Games
import CompareGame from "./components/CompareGame";
import CompareTest from "./components/CompareTest";
import AscendingGame from "./components/AscendingGame";
import AscendingTest from "./components/AscendingTest";
import Result from "./components/Result";
import AscendingResult from "./components/AscendingResult";

// Blending Games
import ThreeLetterGame from "./components/ThreeLetterWords";
import FourLetterMenu from "./components/FourLetterCategory";
import FourLetterConsonantBlends from "./pages/FourLetterConsonantBlends";
import FourLetterVowelBlends from "./pages/FourLetterVowelBlends";

// Music App Pages
import CategoryPage from "./pages/music/CategoryPage";
import AllAudiosPage from "./pages/music/AllAudiosPage";
import SearchResultsPage from "./pages/music/SearchResultsPage";
import AudioDetailPage from "./pages/music/AudioDetailPage";

// Navbar (for music only)
import Navbar from "./pages/music/Navbar";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const location = useLocation();

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

  // ✅ Show navbar only for music pages
  const showNavbarForMusic = location.pathname.startsWith("/music") ||
                             location.pathname.startsWith("/search") ||
                             location.pathname.startsWith("/audio");

  return (
    <>
      {showNavbarForMusic && <Navbar />}

      <Routes>
        {/* 🎯 Entry Point: Name or Start Screen */}
        {!playerName ? (
          <Route path="/" element={<NameInput onNameSubmit={handleNameSubmit} />} />
        ) : (
          <Route path="/" element={<StartScreen playerName={playerName} onReset={resetName} />} />
        )}

        {/* 🧠 Quiz Routes */}
        <Route path="/quiz/:subject" element={<QuizTopicScreen />} />
        <Route path="/quiz/:subject/:topic" element={<QuizGame playerName={playerName} />} />
        <Route path="/quiz/day" element={<DayQuiz playerName={playerName} />} />
        <Route path="/quiz/clock" element={<ClockQuiz playerName={playerName} />} />

        {/* 📖 Story & 🎥 Video Games */}
        <Route path="/story/:storyId/:mode" element={<StoryMode playerName={playerName} />} />
        <Route path="/video" element={<VideoGame playerName={playerName} />} />
        <Route path="/photo" element={<PhotoGame playerName={playerName} />} />

        {/* 🔢 Number Games */}
        <Route path="/compare" element={<CompareGame playerName={playerName} />} />
        <Route path="/compare-test" element={<CompareTest />} />
        <Route path="/ascending" element={<AscendingGame playerName={playerName} />} />
        <Route path="/ascending-test" element={<AscendingTest />} />
        <Route path="/result" element={<Result />} />
        <Route path="/ascending-result" element={<AscendingResult />} />

        {/* 🔤 Phonics Blending */}
        <Route path="/blending/3letter" element={<ThreeLetterGame />} />
        <Route path="/blending/4letter" element={<FourLetterConsonantBlends />} />
        <Route path="/blending/4letter/vowels" element={<FourLetterVowelBlends />} />
        <Route path="/blending/4letter/menu" element={<FourLetterMenu />} />

        {/* 🎵 Music App */}
        <Route path="/music" element={<CategoryPage />} />
        <Route path="/music/all-audios" element={<AllAudiosPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/audio/:category/:name" element={<AudioDetailPage />} />
      </Routes>
    </>
  );
}
