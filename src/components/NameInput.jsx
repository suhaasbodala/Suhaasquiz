import React, { useState } from 'react';
import './NameInput.css'; // Import your CSS styles for the name input screen

export default function NameInput({ onNameSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="name-input-screen">
      <h2>👋 Welcome! Please enter your name:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Start Game 🚀</button>
      </form>
    </div>
  );
}
