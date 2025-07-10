import React, { useState } from "react"; // ✅ Add this
import "../components/PhonicsPage.css";


const wordSets = {
      ai: ["aid", "aim", "bait", "pail", "nail", "fail", "tail", "gain", "rain", "vain", "pain", "main"],
      oa: ["oats", "boat", "coat", "moan", "loan", "foam", "roam", "toad", "goat", "soap"],
      ie: ["died", "tied", "lies", "pier", "tier", "fier", "mien", "lief", "sies"],
      ee: ["beef", "need", "seed", "meet", "feet", "jeep", "peel", "reed", "heel", "seen"],
      or: ["lord", "fork", "cord", "born", "torn", "port", "sort", "word", "horn", "form"],
      oo: ["wood", "foot", "book", "cook", "look", "good", "hood", "moon", "roof", "boot"]
    };

export default function FourLetterVowelBlends() {
  const [selectedSet, setSelectedSet] = useState("ai");
  const [rate, setRate] = useState(1);

  const speakWord = (word) => {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "en-IN";
    utter.rate = rate;
    speechSynthesis.speak(utter);
  };

  return (
    <div>
      <div className="navbar">
        <span className="hamburger" onClick={() => document.getElementById("sidebar").classList.toggle("show")}>&#9776;</span>
        <div className="nav-center">4-Letter Vowel Blends</div>
        <div className="nav-right">
          <label>Speed:</label>
          <select value={rate} onChange={(e) => setRate(parseFloat(e.target.value))}>
            <option value="0.05">0.05x</option>
            <option value="0.25">0.25x</option>
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
          </select>
          </div>
      </div>

      <div className="sidebar" id="sidebar">
  {Object.keys(wordSets).map((key) => (
    <button
      key={key}
      onClick={() => {
        setSelectedSet(key);
        document.getElementById("sidebar").classList.remove("show"); // ✅ hide sidebar
        document.querySelector(".overlay")?.classList.remove("show"); // ✅ hide overlay
      }}
    >
      {key}
    </button>
  ))}
</div>


      <div className="overlay" onClick={() => document.getElementById("sidebar").classList.remove("show")}></div>

      <div className="word-grid">
        {wordSets[selectedSet].map((word, index) => (
          <div className="word-box" key={index} onClick={() => speakWord(word)}>
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}