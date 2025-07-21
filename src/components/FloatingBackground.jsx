// src/components/FloatingSquares.jsx
import React from "react";
import "./FloatingSquares.css";

const FloatingSquares = () => {
  const squares = Array.from({ length: 20 });

  return (
    <div className="floating-container">
      {squares.map((_, i) => (
        <div key={i} className="square" style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${10 + Math.random() * 20}s`,
          animationDelay: `${Math.random() * 5}s`,
          transform: `scale(${Math.random() + 0.5})`,
        }} />
      ))}
    </div>
  );
};

export default FloatingSquares;
