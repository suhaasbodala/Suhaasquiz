import React, { useState } from "react";
import "./PhonicsPage.css";

const wordSets = {
  ai: ["bait", "pail", "nail", "fail", "tail"],
  oa: ["oats", "boat", "coat", "moan", "loan"],
  ie: ["died", "tied", "lies", "pier", "tier"],
  ee: ["beef", "need", "seed", "meet", "feet"],
  or: ["lord", "fork", "cord", "born", "torn"],
  oo: ["wood", "foot", "book", "cook", "look"],
};

const FourLetterVowel = () => {
  const [selectedSet, setSelectedSet] = useState("ai");
  const [rate, setRate] = useState(1);

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-IN";
    utterance.rate = rate;
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <div className="navbar">
        <span className="hamburger" onClick={() => document.getElementById("sidebar").classList.toggle("show")}>&#9776;</span>
        <div className="nav-center">4-Letter Vowel Blends</div>
        <div className="nav-right">
          <label htmlFor="rate">Speed:</label>
          <select id="rate" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))}>
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
          <button key={key} onClick={() => setSelectedSet(key)}>{key}</button>
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
};

export default FourLetterVowel;
