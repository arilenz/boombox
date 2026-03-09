import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

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
      window.electronAPI.onKeyPressed((_keycode) => {
        // TODO: map specific keycodes to specific sounds
        playSound();
      });
    }
  }, []);

  return (
    <div className="dark flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <audio ref={audioRef} src="./beep.wav" />
      <Button size="lg" onClick={playSound}>
        Play Sound
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">
        Press any key to play (works even when unfocused)
      </p>
    </div>
  );
}
