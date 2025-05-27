import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import PhotoGame from "./components/PhotoGame";
import VideoGame from "./components/VideoGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/photo" element={<PhotoGame />} />
        <Route path="/video" element={<VideoGame />} />
      </Routes>
    </Router>
  );
}

export default App;
