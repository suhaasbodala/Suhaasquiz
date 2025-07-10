import React, { useState, useEffect } from "react";
import "./PhonicsPage.css";

const wordSets = {
  con_l_vow_c: ["clap", "clog", "club", "clam", "clip"],
  con_vow_con_s: ["bats", "cuts", "dips", "gaps", "hops"],
  con_vow_m_t: ["bent", "mint", "pant", "rant", "sent"],
  con_vow_m_t_d: ["damp", "dent", "dump", "lamp", "band"],
  s_k_vow_con: ["skit", "skip", "skid", "skin", "skan"],
  con_vow_m_k: ["bark", "bank", "bulk", "funk", "honk"],
  s_c_vow_con: ["scan", "scar", "scab", "scam", "scud"],
  con_r_vow_con: ["brat", "brag", "bred", "crib", "crop"],
  con_vow_s_k: ["bask", "desk", "disk", "mask", "risk"],
  con_vow_n_k: ["bank", "bonk", "bunk", "dunk", "honk"],
  con_vow_f_t: ["left", "loft", "gift", "waft", "haft"],
  s_p_vow_con: ["spin", "span", "spot", "spit", "sped"],
  p_l_vow_con: ["plan", "plot", "plug", "plop", "plod"],
  con_vow_m_p: ["jump", "lamp", "temp", "bump", "dump"],
};

const FourLetterConsonant = () => {
  const [selectedSet, setSelectedSet] = useState("con_l_vow_c");
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
        <div className="nav-center">4-Letter Consonant Blends</div>
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

export default FourLetterConsonant;
