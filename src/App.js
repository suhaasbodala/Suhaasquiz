import { Routes, Route } from "react-router-dom";
import StartScreen  from "./components/StartScreen";
import PhotoGame   from "./components/PhotoGame";
import VideoGame   from "./components/VideoGame";
import CompareGame from "./components/CompareGame";

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<StartScreen />} />
      <Route path="/photo"    element={<PhotoGame   />} />
      <Route path="/video"    element={<VideoGame   />} />
      <Route path="/compare"  element={<CompareGame />} />
    </Routes>
  );
}