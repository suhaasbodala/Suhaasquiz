import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import confetti from "canvas-confetti";
import "./PhotoGame.css";

const levels = [
  ["IMG-20250520-WA0002.jpg", "IMG-20250520-WA0003.jpg", "IMG-20250520-WA0001.jpg", "IMG-20250520-WA0005.jpg"],
  ["photo3.jpg", "photo2.jpg", "photo1.jpg", "photo4.jpg"],
];

const successSound = new Audio("/sounds/success-1-6297.mp3");
const failSound = new Audio("/sounds/fail-2-277575.mp3");

const PhotoGame = () => {
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem("photo-level");
    return saved ? parseInt(saved) : 1;
  });
  const [images, setImages] = useState([]);
  const [correctOrder, setCorrectOrder] = useState([]);
  const [targets, setTargets] = useState([]);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  useEffect(() => {
    const levelData = levels[level - 1];
    if (!levelData) {
      alert("🎉 All levels completed!");
      return;
    }
    const imgs = levelData.map((file, i) => ({
      id: `img-${i}`,
      src: `/images/level${level}/${file}`,
    }));
    setImages(shuffleArray(imgs));
    setCorrectOrder(imgs.map((img) => img.id));
    setTargets(new Array(imgs.length).fill(null));
    setFailMessage("");
  }, [level]);

  const shuffleArray = (arr) => [...arr].sort(() => 0.5 - Math.random());

  const onDragEnd = (result) => {
    if (!result.destination || !result.source) return;

    const sourceIndex = result.source.index;
    const destId = result.destination.droppableId;

    if (result.source.droppableId === "source" && destId.startsWith("target-")) {
      const destIndex = parseInt(destId.split("-")[1], 10);
      const draggedId = images[sourceIndex].id;

      const newTargets = [...targets];
      if (!newTargets[destIndex]) {
        newTargets[destIndex] = draggedId;
        setTargets(newTargets);
      }
    }
  };

  const checkAnswer = () => {
    if (targets.includes(null)) {
      setFailMessage("🚫 Please complete all slots.");
      return;
    }

    const isCorrect = targets.join() === correctOrder.join();
    if (isCorrect) {
      successSound.play();
      confetti({ particleCount: 150, spread: 60, origin: { y: 0.6 } });
      setShowLevelComplete(true);
    } else {
      failSound.play();
      setFailMessage("❌ Try Again!");
      setTargets(new Array(images.length).fill(null));
    }
  };

  const getImageById = (id) => images.find((img) => img.id === id)?.src;

  if (showLevelComplete) {
    return (
      <div className="photo-container">
        <h2>🎉 Level {level} Complete!</h2>
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
      <h2>🧠 Arrange the Photos (Level {level})</h2>

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
              {images.map((img, index) => (
                <Draggable key={img.id} draggableId={img.id} index={index}>
                  {(provided) => (
                    <div
                      className="photo-box"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img src={img.src} alt="" className="photo-img" />
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
            <Droppable key={index} droppableId={`target-${index}`} direction="vertical">
              {(provided) => (
                <div
                  className="drop-slot"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {id ? (
                    <img src={getImageById(id)} alt="" className="photo-img small" />
                  ) : (
                    <div className="placeholder">Drop here</div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <button onClick={checkAnswer} className="check-btn">
        ✅ Check Answer
      </button>

      <button
        className="reset-btn"
        onClick={() => {
          localStorage.setItem("photo-level", 1);
          setLevel(1);
          setTargets(new Array(images.length).fill(null));
          setFailMessage("🔁 Level reset to 1.");
        }}
      >
        🔁 Reset Progress
      </button>

      {failMessage && <p className="message fail-message">{failMessage}</p>}
    </div>
  );
};

export default PhotoGame;
