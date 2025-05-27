import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./VideoGame.css";

/* -------------  GAME DATA ------------- */
const levels = [
  /* Level 1  */ ["vid1.mp4","vid2.mp4","vid3.mp4","vid4.mp4","vid5.mp4","vid6.mp4","vid7.mp4","vid8.mp4","vid9.mp4"],
  /* Level 2  */ ["scene1.mp4","scene2.mp4","scene3.mp4","scene4.mp4","scene5.mp4","scene6.mp4","scene7.mp4"],
  /* Level 3  */ ["video1.mp4","video2.mp4","video3.mp4","video4.mp4","video6.mp4","video5.mp4","video7.mp4"],
];

const levelDescriptions = ["💧 Potty Story","🍎 Field Story", "Phone Story"];

/* Quiz questions grouped by level number */
const quizByLevel = {
  1: [
    { question:"Rohit ekkadiki veltunnadu?", options:["Mam intiki","school ki","bath room ki", "ammamma valla intki"], answer:"Mam intiki",   video:"/videos/level1/vid1.mp4" },
    { question:"Rohit em ekkutunnadu?",      options:["Car", "Auto", "Bus","Aeroplane"],       answer:"Auto",  video:"/videos/level1/vid1.mp4" },
    { question:"Rohit and shalom m chestunaru?",  options:["Carroms aadutunaru","Cricket aadutunaru","Padukunaru","TV chustunaru"],          answer:"Carroms aadutunaru", video:"/videos/level1/vid2.mp4" },
    { question:"Rohit and shalom m chestunaru?",  options:["Carroms aadutunaru","Cricket aadutunaru","Padukunaru","TV chustunaru"],          answer:"Padukunaru",  video:"/videos/level1/vid3.mp4" },
    { question:"Rohit and shalom eppudu padukunaru?",  options:["night ayaka", "Sun vachaka"],          answer:"night ayaka", video:"/videos/level1/vid3.mp4" },
    { question:"ee scene eppudu ayindhi?",  options:["night", "morning"],          answer:"morning", video:"/videos/level1/vid4.mp4" },
    { question:"Rohit em chestunadu?",  options:["edustunadu", "navvutunadu", "aadutunadu", "padukunadu"],          answer:"edustunadu", video:"/videos/level1/vid6.mp4" },
    { question:"Rohit enduku edustunadu?",  options:["akali vestundi", "mam kottaru", "potty vastundi", "amma thittindi"],          answer:"potty vastundi", video:"/videos/level1/vid6.mp4" },
    { question:"Doctor em chestunaru?",  options:["aadtunaru",  "injection istunaru","thidutunaru", "ointment rastunaru"],          answer:"injection istunaru", video:"/videos/level1/vid7.mp4" },
    { question:"Moral of the story enti?",  options:["potty vachinapdu vellali", "potty vellakudadhu"],          answer:"potty vachinapdu vellali", video:"/videos/level1/vid9.mp4" }
    ],
  2: [
    { question:"Field-story first scene?", options:["Run","Eat fruit","Dance","Sleep"], answer:"Eat fruit", video:"/videos/level2/scene1.mp4" },
    { question:"Ramu eats ___ ?",          options:["Chocolate","Fruit","Ice-cream","Chips"], answer:"Fruit", video:"/videos/level2/scene2.mp4" }
  ],
  3: [
    { question:"Phone story first scene nti?", options:["Balu aadutunadu","Balu bed paina nundi lechadu","Balu song padutunadu","Balu dance chestunadu"], answer:"Balu bed paina nundi lechadu", video:"/videos/level3/video1.mp4" },
    { question:"Balu phone lo em chestunadu?", options:["Subway aadutunadu","Call chestunadu","Songs vintunadu","Drawing videos chustunadu"], answer:"Subway aadutunadu", video:"/videos/level3/video2.mp4" },
    { question:"Balu eyes ala ayayi?", options:["red ayayi","emi avaledhu"], answer:"red ayayi", video:"/videos/level3/video3.mp4" },
    { question:"Balu eyes enduku red ayayi?", options:["Adukunadu kabatti","Amma thittindi kabatii","Phone chusadu kabatti","Thammu tho adukunadu kabatti"], answer:"Phone chusadu kabatti", video:"/videos/level3/video3.mp4" },
    { question:"Doctor em chestunaru ee scene lo?", options:["injection vestuanru", "ointment rastunaru", "matladutunaru", "silent ga unaru"], answer:"injection vestuanru", video:"/videos/level3/video4.mp4" },
    { question:"Balu em chptunadu?", options:["Phone battery charge chesukovali kabatti chudanu", "sorry, Phone akuva chudanu","Phone chustanu"], answer:"sorry, Phone akuva chudanu", video:"/videos/level3/video5.mp4" },
    { question:"ee story moral enti?", options:["Phone chudali","Doctor dagariki vellakudadhu","Phone akuva sepu chudakudadhu","Akuva games adukovali phone lo"], answer:"Phone akuva sepu chudakudadhu", video:"/videos/level3/video7.mp4" }
  ]
};

/* -------------  SOUND EFFECTS ------------- */
const successSound      = new Audio("/sounds/success-1-6297.mp3");
const failSound         = new Audio("/sounds/fail-2-277575.mp3");
const voiceSuccess      = new Audio("/sounds/very-good.mp3");
const voiceFail         = new Audio("/sounds/try-again.mp3");
const quizCorrectSound  = new Audio("/sounds/very-good.mp3");
const quizWrongSound    = new Audio("/sounds/try-again.mp3");

/* -------------  COMPONENT ------------- */
export default function VideoGame() {
  /* ---------- main-game state ---------- */
  /* ---------- main-game state ---------- */
const [level,            setLevel]     = useState(() => parseInt(localStorage.getItem("video-level")) || 1);
const [clips,            setClips]     = useState([]);
const [correctOrder,     setCorrect]   = useState([]);
const [targets,          setTargets]   = useState([]);
const [selectedId,       setSelectedId]= useState(null);
const [message,          setMessage]   = useState("");
const [showLevelComplete,setDone]      = useState(false);

/* NEW ► flag that shows “Very good…” popup */
//const [correctPop,       setCorrectPop]= useState(false);   //  ← add this line
const [selectedOpt,      setSelectedOpt]= useState(null);   // (already present)
;

  /* ---------- quiz state ---------- */
  const [showQuiz, setShowQuiz]     = useState(false);
  const [quizIndex, setQuizIdx]     = useState(0);
  const [quizComplete, setQuizDone] = useState(false);
  const [quizFeedback, setQMsg]     = useState("");

  const quizList   = quizByLevel[level] || [];
  const quizItem   = quizList[quizIndex];

  /* ---------- load level ---------- */
  useEffect(() => {
    const files = levels[level-1];
    if (!files) { alert("🎉 All levels finished!"); return; }

    const items = files.map((f,i)=>({ id:`clip-${i}`, src:`/videos/level${level}/${f}` }));
    setClips(shuffle(items));
    setCorrect(items.map(v=>v.id));
    setTargets(new Array(items.length).fill(null));
    setSelectedId(null);
    setMessage(""); setDone(false);

    /* reset quiz state when level changes */
    setShowQuiz(false); setQuizIdx(0); setQuizDone(false); setQMsg("");
  }, [level]);

  /* ---------- helpers ---------- */
  const shuffle = a => [...a].sort(()=>0.5-Math.random());
  const srcById = id => clips.find(c=>c.id===id)?.src;

  /* ---------- gameplay actions ---------- */
  const clickSlot = i => {
    if (!selectedId || targets[i]) return;
    const next = [...targets]; next[i]=selectedId;
    setTargets(next); setSelectedId(null); setMessage("");
  };

  const checkOrder = () => {
    if (targets.includes(null)) { setMessage("🚫 Please complete all slots."); return; }
    if (targets.join() === correctOrder.join()) {
      successSound.play(); voiceSuccess.play();
      confetti({particleCount:150, spread:60, origin:{y:0.6}});
      setDone(true);
    } else {
      failSound.play(); voiceFail.play();
      setMessage("❌ Malli try cheyu Suhaas!");
      setTargets(new Array(clips.length).fill(null));
    }
  };
  /** play & rewind so the same clip can be re-used immediately */
const playSound = (audio) => {
  audio.currentTime = 0;
  audio.play().catch(() => {/* ignore autoplay blocking */});
};

/** play two clips in parallel */
const playPair = (a, b) => {
  playSound(a);
  playSound(b);
};


  /* ---------- quiz actions ---------- */
  /* ---------- quiz actions ---------- */
  const answerQuiz = (opt) => {
  setSelectedOpt(opt);                                // mark chosen button

  if (opt === quizItem.answer) {                      /* ✅ RIGHT */
    playPair(successSound, quizCorrectSound);         // success “tada” + “Very good Suhaas!”
    setQMsg("🎉 Very good Suhaas!");

    setTimeout(() => {
      setSelectedOpt(null);
      setQMsg("");

      if (quizIndex + 1 === quizList.length) {
        setQuizDone(true);
        confetti({ particleCount: 120, spread: 70 });
      } else {
        setQuizIdx(i => i + 1);
      }
    }, 2000);                                         // green feedback 1 s
  } else {                                            /* ❌ WRONG */
    playPair(failSound, quizWrongSound);              // fail “buzz” + “Malli try…”
    setQMsg("❌ Malli try cheyu Suhaas!");

    setTimeout(() => {
      setSelectedOpt(null);
      setQMsg("");
    }, 4000);                                         // red feedback 4 s
  }
};



  /* ---------- render ---------- */
  if (showLevelComplete) {
    return (
      <div className="photo-container">
        <h2>Level {level} Complete! 🎉 Very good Suhaas!</h2>
        <button className="check-btn" onClick={()=>{
          const next=level+1; setLevel(next); localStorage.setItem("video-level",next);}}>➡️ Next Level</button>
      </div>
    );
  }

  return (
    <div className="photo-container animated-bg">
      {/* top bar */}
      <div className="top-bar">
        <h2 className="story-title">{levelDescriptions[level-1]}</h2>
        {quizList.length>0 && <button className="quiz-btn" onClick={()=>setShowQuiz(true)}>🧠 Quiz</button>}
      </div>

      {/* level selector */}
      <select className="level-select" value={level} onChange={e=>{
        const nxt=+e.target.value; setLevel(nxt); localStorage.setItem("video-level",nxt);
      }}>
        {levels.map((_,i)=><option key={i} value={i+1}>Level {i+1}</option>)}
      </select>

      {/* source videos */}
      <div className="photo-row">
        {clips.filter(c=>!targets.includes(c.id)).map(c=>(
          <div key={c.id} className={`video-box ${selectedId===c.id?"selected":""}`} onClick={()=>setSelectedId(c.id)}>
            <video src={c.src} autoPlay muted loop playsInline className="video-player"/>
          </div>
        ))}
      </div>

      {/* target slots */}
      <div className="target-row">
        {targets.map((id,i)=>(
          <div key={i} className="drop-slot" onClick={()=>clickSlot(i)}>
            {id
              ? <div className="slot-with-remove">
                  <video src={srcById(id)} autoPlay muted loop playsInline className="photo-img small"/>
                  <button className="remove-btn" onClick={e=>{e.stopPropagation(); const t=[...targets];t[i]=null;setTargets(t);}}>❌</button>
                </div>
              : <div className="placeholder">{i+1}</div>}
          </div>
        ))}
      </div>

      <button onClick={checkOrder} className="check-btn">✅ Check Answer</button>
      <button onClick={()=>{setLevel(1);localStorage.setItem("video-level",1);setMessage("🔁 Level reset.");}} className="reset-btn">🔁 Reset</button>
      <p className="message">{message}</p>

      {/* quiz modal */}
      {/* ───────── FULL-SCREEN QUIZ ───────── */}
      {/* ─── QUIZ FULL-SCREEN OVERLAY ─── */}
{showQuiz && (
  <div className="quiz-modal">               {/* 100 % viewport, dark backdrop */}
    <div className="quiz-card">              {/* white card, centred */}
      {quizComplete ? (
        <>
          <h2>🎉 Quiz Completed!</h2>
          <button
            onClick={() => {
              setShowQuiz(false);
              setQuizIdx(0);
              setQuizDone(false);
              setQMsg("");
            }}
          >
            Close
          </button>
        </>
      ) : (
        <>
          <video
            src={quizItem.video}
            autoPlay
            muted
            loop
            playsInline
            className="quiz-video"
          />

          <h3 className="quiz-question">{quizItem.question}</h3>

          {/* options with green / red borders */}
          <div className="quiz-options">
            {quizItem.options.map((opt, i) => {
              const chosen  = selectedOpt === opt;
              const correct = chosen && opt === quizItem.answer;
              const wrong   = chosen && opt !== quizItem.answer;

              return (
                <button
                  key={i}
                  className={`quiz-option ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                  disabled={!!selectedOpt && correct}   /* freeze for 1 s on right */
                  onClick={() => answerQuiz(opt)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {quizFeedback && <p className="quiz-msg">{quizFeedback}</p>}
        </>
      )}
    </div>
  </div>
)}


    </div>
  );
}