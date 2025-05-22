import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import confetti from "canvas-confetti";
import "./PhotoGame.css";

const levels = [
  ["IMG-20250520-WA0002.jpg", "IMG-20250520-WA0003.jpg", "IMG-20250520-WA0001.jpg", "IMG-20250520-WA0005.jpg"],
  ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg"]
];

const successSound = new Audio("/sounds/success-1-6297.mp3");
const failSound = new Audio("/sounds/fail-2-277575.mp3");
const voiceSuccess = new Audio("/sounds/very-good.mp3");
const voiceFail = new Audio("/sounds/try-again.mp3");

const levelDescriptions = [
  "✂️ Cutting Story!",
  "🏖️ Beach Story!"
];


const PhotoGame = () => {
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem("photo-level");
    return saved ? parseInt(saved) : 1;
  });

  const [images, setImages] = useState([]);
  const [correctOrder, setCorrectOrder] = useState([]);
  const [targets, setTargets] = useState([]);
  const [message, setMessage] = useState("");
  const [showLevelComplete, setShowLevelComplete] = useState(false);

  useEffect(() => {
    const levelData = levels[level - 1];
    if (!levelData) {
      alert("🎉 All levels completed!");
      return;
    }

    const imgs = levelData.map((file, i) => ({
      id: `img-${i}`,
      src: `/images/level${level}/${file}`
    }));

    setImages(shuffleArray(imgs));
    setCorrectOrder(imgs.map((img) => img.id));
    setTargets(new Array(imgs.length).fill(null));
    setMessage("");
  }, [level]);

  const shuffleArray = (arr) => [...arr].sort(() => 0.5 - Math.random());

  const getImageById = (id) => images.find((img) => img.id === id)?.src;

 const onDragEnd = (result) => {
  if (!result.destination || !result.source) return;

  const destId = result.destination.droppableId;
  if (!destId.startsWith("slot-")) return;

  const destIndex = parseInt(destId.split("-")[1], 10);
  const draggedId = result.draggableId;

  if (!draggedId) return;

  // ✅ Enforce drop order: only first empty slot allowed
  const firstEmptyIndex = targets.findIndex((t) => t === null);
  if (destIndex !== firstEmptyIndex) {
    setMessage("⚠️ Place in the correct order!");
    return;
  }

  const newTargets = [...targets];
  newTargets[destIndex] = draggedId;
  setTargets(newTargets);
  setMessage(""); // Clear any old messages
};


  const checkAnswer = () => {
  if (targets.includes(null)) {
    setMessage("🚫 Please complete all slots.");
    return;
  }

  const isCorrect = targets.join() === correctOrder.join();

  if (isCorrect) {
    successSound.play();
    voiceSuccess.play(); // 🔊 Say “Very good Suhaas!”
    confetti({ particleCount: 150, spread: 60, origin: { y: 0.6 } });
    setShowLevelComplete(true);
  } else {
    failSound.play();
    voiceFail.play(); // 🔊 Say “Malli try cheyu Suhaas!”
    setMessage("❌ Malli try cheyu Suhaas!");
    setTargets(new Array(images.length).fill(null)); // Clear boxes
  }
};


  const resetProgress = () => {
    setLevel(1);
    localStorage.setItem("photo-level", 1);
    setMessage("🔁 Level reset to 1.");
  };

  const removeFromSlot = (index) => {
    const updated = [...targets];
    updated[index] = null;
    setTargets(updated);
  };

  if (showLevelComplete) {
    return (
      <div className="photo-container">
        <h2> Level {level} Completed!
          🎉 Veru good suhaas! 🎉</h2>
        <button
          className="check-btn"
          onClick={() => {
            setShowLevelComplete(false);
            const next = level + 1;
            setLevel(next);
            localStorage.setItem("photo-level", next);
          }}
        >
          ➡️ Go to Level {level + 1}
        </button>
      </div>
    );
  }

  return (
    <div className="photo-container animated-bg">
      <h2 className="story-title">{levelDescriptions[level - 1] || `🧠 Arrange the Photos (Level ${level})`}</h2>


      <select
        className="level-select"
        value={level}
        onChange={(e) => {
          const selected = parseInt(e.target.value);
          setLevel(selected);
          localStorage.setItem("photo-level", selected);
        }}
      >
        {levels.map((_, i) => (
          <option key={i} value={i + 1}>
            Level {i + 1}
          </option>
        ))}
      </select>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="source" direction="horizontal">
          {(provided) => (
            <div className="photo-row" {...provided.droppableProps} ref={provided.innerRef}>
              {images
                .filter((img) => !targets.includes(img.id))
                .map((img, index) => (
                  <Draggable key={img.id} draggableId={img.id} index={index}>
                    {(provided) => (
                      <div
                        className="photo-box"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={img.src}
                          alt=""
                          className="photo-img"
                          onError={(e) => {
                            e.target.src = "/images/fallback.jpg";
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

       <div className="target-row">
  {targets.map((id, index) => (
    <Droppable key={index} droppableId={`slot-${index}`}>
      {(provided) => (
        <div
          className="drop-slot"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {id ? (
            <div className="slot-with-remove">
              <img
                src={getImageById(id)}
                alt=""
                className="photo-img small"
                onError={(e) => {
                  e.target.src = "/images/fallback.jpg";
                }}
              />
              <button
                className="remove-btn"
                onClick={() => removeFromSlot(index)}
              >
                ❌
              </button>
            </div>
          ) : (
            <div className="placeholder">{index + 1}</div>  // ✅ Replaced text here
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ))}
</div>

      </DragDropContext>

      <button onClick={checkAnswer} className="check-btn">✅ Check Answer</button>
      <button onClick={resetProgress} className="reset-btn">🔁 Reset Progress</button>
      <p className="message">{message}</p>
    </div>
  );
};

export default PhotoGame;
