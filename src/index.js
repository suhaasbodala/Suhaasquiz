import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ Make sure this is default import
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
