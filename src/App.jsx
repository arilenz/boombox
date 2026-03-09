import React, { useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const audioRef = useRef(null);

  function playSound() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onPlaySound(playSound);
    }
  }, []);

  return (
    <div className="container">
      <audio ref={audioRef} src="./beep.wav" />
      <button onClick={playSound}>Play Sound</button>
      <p className="hint">Or press Ctrl+Shift+S (even when unfocused)</p>
    </div>
  );
}
