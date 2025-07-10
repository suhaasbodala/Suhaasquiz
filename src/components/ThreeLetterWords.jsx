import React, { useState, useEffect } from 'react';
import './PhonicsPage.css'; // Create a CSS file or inline if needed

const wordSets = {
      a:["cat", "bat", "mat", "rat", "sat", "pat", "cap", "map", "tap", "gap",
 "nap", "jam", "man", "fan", "bag", "tag", "wag", "lap", "cab", "dad",
 "pad", "van", "ram", "can", "sap", "had", "bad", "lad", "mad", "yam"],
      e: ["bed", "red", "led", "net", "pet", "ten", "pen", "men", "hen", "den",
 "fed", "bet", "vet", "wet", "peg", "leg", "set", "get", "yet", "met",
 "zed", "jet", "let", "web", "gem", "ned", "hem", "beg", "ken", "lex"]
,
      i: ["big", "dig", "fig", "pig", "wig", "hit", "bit", "kit", "lit", "sit",
 "zip", "tip", "dip", "rip", "lid", "kid", "mid", "fin", "win", "bin",
 "tin", "jib", "nip", "pip", "him", "rim", "sib", "gig", "hip", "vim"]
,
      o: ["cot", "dot", "hot", "lot", "pot", "rot", "top", "hop", "mop", "pop",
 "log", "dog", "bog", "fog", "jog", "sob", "job", "cob", "rob", "nod",
 "pod", "mom", "tom", "rod", "cop", "cod", "don", "got", "pox", "con"]
,
      u: ["cub", "tub", "rub", "hub", "sub", "bug", "dug", "mug", "rug", "jug",
 "sun", "fun", "run", "bun", "gun", "nun", "cut", "nut", "hut", "but",
 "mud", "bud", "pug", "gum", "pup", "lug", "cup", "sup", "tug", "fud"]

    };


const ThreeLetterWords = () => {
  const [selected, setSelected] = useState('a');
  const [rate, setRate] = useState(1);

  const speakWord = (word) => {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = 'en-IN';
    utter.rate = rate;
    speechSynthesis.speak(utter);
  };

  return (
    <div>
      <div className="navbar">
        <span className="hamburger" onClick={() => document.getElementById('sidebar').classList.toggle('show')}>&#9776;</span>
        <div className="nav-center">3-Letter Blending</div>
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

      <div id="sidebar" className="sidebar">
        {Object.keys(wordSets).map(letter => (
          <button
  key={letter}
  onClick={() => {
    setSelected(letter);
    document.getElementById("sidebar").classList.remove("show"); // ✅ close sidebar
    document.querySelector(".overlay")?.classList.remove("show"); // ✅ hide overlay
  }}
>
  {letter}
</button>

        ))}
      </div>

      <div className="overlay" onClick={() => document.getElementById('sidebar').classList.remove('show')}></div>

      <div className="word-grid">
        {wordSets[selected].map((word, idx) => (
          <div key={idx} className="word-box" onClick={() => speakWord(word)}>{word}</div>
        ))}
      </div>
    </div>
  );
};

export default ThreeLetterWords;
