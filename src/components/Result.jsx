import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";
import Navbar from "./Navbar";

export default function Result() {
  const location = useLocation();
  const state = location?.state || {};
  const navigate = useNavigate();

  const answers = state.answers || [];
  const type = state.type || "compare";
  const totalTime = state.timeTaken || answers.reduce((acc, curr) => acc + (curr.time || 1), 0);

  const correct = answers.filter((a) => a.isCorrect).length;
  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  // Pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(answers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAnswers = answers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Navbar />
      <div className="result-container">
        <h2 className="result-title">📊 Test Results</h2>
        <div className="score-box">✅ Score: {correct} / {answers.length}</div>
        <div className="time-box">🕒 Total Time Taken: {formatTime(totalTime)}</div>

        {answers.length === 0 ? (
          <p style={{ color: "red", fontSize: "18px" }}>❗ No answers found.</p>
        ) : (
          <>
            <div className="answers-list">
              {currentAnswers.map((a, idx) => {
                const globalIndex = startIndex + idx;
                if (type === "level3") {
                  return (
                    <div key={globalIndex} className={`answer-block ${a.isCorrect ? "correct" : "wrong"}`}>
                      <div className="answer-left">
                        <div className="answer-question" style={{ fontSize: "24px", fontWeight: "bold" }}>
                          Q{globalIndex + 1}: Build {String(a.question)}
                        </div>
                        <p>Your Answer: {String(a.built)}</p>
                        <p>{a.isCorrect ? "✅ Correct" : "❌ Wrong"}</p>
                      </div>
                    </div>
                  );
                }

                // For compare test
                const qTime = a.time || 1;
                const [left, right] = a.question.split(" ? ");
                const qText = `${left} ${a.correct} ${right}`;
                const userText = `${left} ${a.selected} ${right}`;

                return (
                  <div key={globalIndex} className={`answer-block ${a.isCorrect ? "correct" : "wrong"}`}>
                    <div className="answer-left">
                      <div
                        className="answer-question"
                        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "12px" }}
                      >
                        Q{globalIndex + 1}: {left} <span className="empty-box">___</span> {right}
                      </div>
                      <p>Your Answer: {userText}</p>
                      <p>Correct Answer: {qText}</p>
                      <p>🕒 Time Taken: {qTime}s</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ◀ Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "active-page" : ""}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next ▶
              </button>
            </div>
          </>
        )}

        <button
          className="retake-btn"
          onClick={() =>
            navigate(type === "level3" ? "/tensones-test" : "/compare-test")
          }
        >
          🔄 Retake {type === "level3" ? "Level 3 Test" : "Compare Test"}
        </button>
      </div>
    </>
  );
}
