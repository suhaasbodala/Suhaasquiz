import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";
import Navbar from "./Navbar";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const answers = state?.answers || [];

  const [retryingQuestion, setRetryingQuestion] = useState(null);
  const [retryAnswer, setRetryAnswer] = useState("");
  const [retryFeedback, setRetryFeedback] = useState("");
  const [retrySubmitted, setRetrySubmitted] = useState(false);

  const correct = answers.filter((a) => a.isCorrect).length;
  const totalTimeTaken = answers.reduce((acc, curr) => acc + (curr.time || 1), 0);
  const minutes = String(Math.floor(totalTimeTaken / 60)).padStart(2, "0");
  const seconds = String(totalTimeTaken % 60).padStart(2, "0");

  return (
    <>
      <Navbar />
      <div className="result-container">
        <h2 className="result-title">📊 Test Results</h2>

        <div className="score-box">✅ Score: {correct} / {answers.length}</div>
        <div className="time-box">🕒 Total Time Taken: {minutes}:{seconds}</div>

        <div className="answers-list">
          {answers.map((a, idx) => {
            const qTime = a.time || 1;
            const [left, right] = a.question.split(" ? ");
            const qText = `${left} ${a.correct} ${right}`;
            const userText = `${left} ${a.selected} ${right}`;

            const isRetrying = retryingQuestion === a;

            return (
              <div
                key={idx}
                className={`answer-block ${a.isCorrect ? "correct" : "wrong"}`}
              >
                <div className="answer-left">
                  <div
                    className="answer-question"
                    style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "12px" }}
                  >
                    Q{idx + 1}: {left} <span className="empty-box">___</span> {right}
                  </div>

                  {!a.isCorrect && isRetrying ? (
                    <>
                      <div className="test-sym-row" style={{ marginBottom: "10px", display: "flex", gap: "12px" }}>
                        {["<", "=", ">"].map((sym) => (
                          <div
                            key={sym}
                            className={`test-sym-box ${retryAnswer === sym ? "picked" : ""}`}
                            style={{
                              fontSize: "24px",
                              padding: "8px 16px",
                              border: "2px solid #444",
                              borderRadius: "8px",
                              cursor: "pointer",
                              width: "50px",
                              textAlign: "center"
                            }}
                            onClick={() => setRetryAnswer(sym)}
                          >
                            {sym}
                          </div>
                        ))}
                      </div>
                      <button
                        className="test-submit-btn"
                        style={{ marginBottom: "12px" }}
                        onClick={() => {
                          setRetrySubmitted(true);
                          if (retryAnswer === a.correct) {
                            setRetryFeedback("✅ Correct!");
                          } else {
                            setRetryFeedback("❌ Incorrect.");
                          }
                        }}
                      >
                        Check Answer
                      </button>
                      {retrySubmitted && (
                        <>
                          <p style={{ fontWeight: "bold", marginTop: "6px" }}>{retryFeedback}</p>
                          <p>Your Answer: {left} {retryAnswer} {right}</p>
                          <p>Correct Answer: {qText}</p>
                          <p>🕒 Time Taken: {qTime}s</p>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div style={{ marginBottom: "6px" }}>Your Answer: {userText}</div>
                      <div style={{ marginBottom: "6px" }}>Correct Answer: {qText}</div>
                      <div style={{ marginBottom: "6px" }}>🕒 Time Taken: {qTime}s</div>
                      {!a.isCorrect && (
                        <button
                          className="retry-single-btn"
                          onClick={() => {
                            setRetryingQuestion(a);
                            setRetryAnswer("");
                            setRetryFeedback("");
                            setRetrySubmitted(false);
                          }}
                        >
                          🔁 Retry
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="retake-btn"
          onClick={() => navigate("/compare-test")}
        >
          🔄 Retake Full Test
        </button>
      </div>
    </>
  );
}