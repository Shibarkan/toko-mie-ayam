// src/components/ButtonWithSound.jsx
import React from "react";

const ButtonWithSound = ({ children, onClick, className }) => {
  const playSound = () => {
    const audio = new Audio("/sounds/petok.mp3");
    audio.play();
    if (onClick) onClick(); // Jalankan fungsi tambahan jika ada
  };

  return (
    <button
      onClick={playSound}
      className={className}
    >
      {children}
    </button>
  );
};

export default ButtonWithSound;
