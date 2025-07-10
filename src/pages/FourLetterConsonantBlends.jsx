import React, { useState } from "react";
import "../components/PhonicsPage.css";
import { useNavigate } from "react-router-dom";
const wordSets = {
      con_l_vow_c: ["clap", "clog", "club", "clam", "clip", "clad", "clop", "clot", "clue", "clay", "clew", "clag", "clan", "claw", "clef", "clop", "clog", "clum", "clim", "clib", "clen", "cled", "clit", "clun", "clab", "clep", "clom", "clux", "claz", "claf", "clup", "clow", "clid", "clor", "clat", "clex", "cled", "clag", "clix", "clav"],
      con_vow_con_s: ["bats", "cuts", "dips", "gaps", "hops", "lips", "maps", "naps", "pits", "rips", "tops", "vets", "zips", "wets", "jots", "kegs", "mops", "nuts", "wigs", "yaks", "hats", "hips", "cups", "mats", "taps", "tips", "yaps", "pats", "kips", "zaps", "laps", "sips", "wags", "buns", "bins", "rugs", "bugs", "nips", "cogs", "logs"],
      con_vow_m_t: ["bent", "mint", "pant", "rant", "sent", "tent", "went", "lent", "kent", "cent", "hint", "lint", "tint", "vent", "font", "hunt", "punt", "dent", "zest", "cost", "last", "cast", "vast", "pest", "rest", "nest", "fest", "jest", "test", "best", "mast", "bust", "must", "dust", "lust", "list", "mist", "gist", "fist", "wist"],
      con_vow_m_t_d: ["damp", "dent", "dump", "lamp", "band", "land", "send", "bend", "fund", "hand", "lend", "tend", "wind", "bond", "pond", "kind", "mind", "mend", "sand", "bind", "find", "wand", "fond", "bold", "cold", "gold", "hold", "told", "fold", "sold", "wild", "mild", "rend", "meld", "peld", "zeld", "cend", "gild", "lend"],
      s_k_vow_con: ["skit", "skip", "skid", "skin", "skan", "skun", "skat", "skop", "skud", "skep", "skib", "skot", "skeg", "skam", "skil", "skab", "skaf", "skum", "skaz", "skex", "skir", "skup", "skod", "skov", "skew", "skyl", "skor", "skon", "skap", "skag", "skad", "skub", "sket", "skil", "skax", "skav", "skas", "skew", "skox", "skur"],
      con_vow_m_k: ["bark", "bank", "bulk", "funk", "honk", "junk", "lank", "link", "pink", "rink", "sank", "tank", "wink", "yank", "zonk", "monk", "bonk", "bunk", "dunk", "punk", "gunk", "hunk", "junk", "kink", "mink", "sink", "zink", "vink", "zunk", "nunk", "runk", "cank", "rank", "lunk", "munk", "bork", "lork"],
      s_c_vow_con: ["scan", "scar", "scab", "scam", "scud", "scum", "scop", "scot", "scat", "scap", "scag", "scow", "scog", "scub", "scob", "scil", "scav", "scad", "scet", "scel", "scaf", "scod", "scok", "scul", "scux", "scer", "scir", "scit", "scep", "scut", "scis", "scek", "scuv", "scax", "scem", "scog", "scol", "scow", "scil", "scir"],
      con_r_vow_con: ["brat", "brag", "bred", "crib", "crop", "trap", "drip", "grip", "grab", "grim", "gram", "crab", "drop", "frog", "from", "trot", "trod", "trip", "tram", "drag", "drab", "drug", "drum", "trim", "prim", "pram", "brog", "brim", "grog", "grub", "grin", "brim", "brad", "trop", "tron", "trug", "braw", "grap", "trig", "brux"],
      con_vow_s_k: ["bask", "desk", "disk", "mask", "risk", "task", "tusk", "husk", "cask", "dusk", "mosk", "zask", "lusk", "pask", "nusk", "rusk", "wisk", "gask", "jusk", "vask", "kask", "fisk", "yask", "bisk", "qisk", "zusk", "vusk", "musk", "susk", "sisk", "sosk", "bosk", "fosk", "nask", "losk", "kusk"],
      con_vow_n_k: ["bank", "bonk", "bunk", "dunk", "honk", "junk", "monk", "tank", "yank", "zonk", "wink", "sank", "lank"],
      con_vow_f_t: [ "left", "loft", "gift", "waft", "haft", "lift", "rift", "soft", "daft", "tuft","heft", "pift", "nift", "cift", "bift", "toft", "deft", "zift", "kift", "wift", "mift", "yift", "xift", "sift", "gaft", "vift", "hilt", "raft", "zift", "lapt"],
      s_p_vow_con: [
  "spin", "span", "spot", "spit", "sped", "spam", "spun", "spat", "spog", "spak",
  "span", "spod", "spol", "spel", "spom", "spug", "spun", "spet", "spix", "spop",
  "spum", "spit", "spad", "spun", "spug", "spom", "spiv", "spik", "spen", "spud"
],
      p_l_vow_con: [
  "plan", "plot", "plug", "plop", "plod", "play", "plea", "plow", "plum", "plak",
  "plet", "plim", "plog", "pluf", "plas", "plop", "plak", "pliz", "plex", "plin",
  "plab", "plaz", "plam", "plen", "plax", "pleb", "plor", "pluk", "plem", "plik"
],    con_vow_m_p: [
  "jump", "lamp", "temp", "bump", "dump", "camp", "comp", "ramp", "hump", "limp",
  "damp", "gimp", "wimp", "romp", "simp", "tamp", "yomp", "zump", "nump", "kump",
  "lomp", "fump", "bamp", "vamp", "jomp", "mump", "pimp", "hamp", "bomp", "gump"
]



    }; 

export default function FourLetterConsonantBlends() {
  const [selectedSet, setSelectedSet] = useState("con_l_vow_c");
  const [rate, setRate] = useState(1);

  const speakWord = (word) => {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "en-IN";
    utter.rate = rate;
    speechSynthesis.speak(utter);
  };
  const navigate = useNavigate();

  return (
    <div>

      <div className="navbar">
        <div className="nav-left">
          <span
            className="hamburger"
            onClick={() => document.getElementById("sidebar").classList.toggle("show")}
          >
            &#9776;
          </span>
          <button
  onClick={() => navigate("/")}
  style={{
    position: "fixed", // change from absolute to fixed
    top: "20px",
    left: "100px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#f5f0f5",
    cursor: "pointer",
    zIndex: 1000 // increase z-index
  }}
>
  Home
</button>
        </div>

        <div className="nav-center">4-Letter Consonant Blends</div>

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
              document.getElementById("sidebar").classList.remove("show");
              document.querySelector(".overlay")?.classList.remove("show");
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