import React from "react";
import { Fan } from "lucide-react";
import "./FloatingFans.css";

const FloatingFans = () => {
  const fans = Array.from({ length: 25 }); // Banyaknya kipas

  return (
    <div className="floating-fan-container">
      {fans.map((_, i) => (
        <div
          key={i}
          className="fan-icon"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `scale(${Math.random() + 0.3}) rotate(0deg)`,
          }}
        >
          <Fan size={32} className="rotate"  color="red"/>
        </div>
      ))}
    </div>
  );
};

export default FloatingFans;
