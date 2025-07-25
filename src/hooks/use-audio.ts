'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

// Helper to create an audio element
const createAudio = (src: string, loop = false) => {
  if (typeof Audio === 'undefined') return null; // Guard for SSR
  const audio = new Audio(src);
  audio.loop = loop;
  return audio;
};

export const useAudio = () => {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Use refs to hold the audio elements
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const loseSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements once on mount
  useEffect(() => {
    musicRef.current = createAudio("https://chicken-road.inout.games/static/media/Soundtrack.cfaea21c.webm", true);
    winSoundRef.current = createAudio("https://assets.mixkit.co/sfx/preview/mixkit-video-game-win-2016.mp3");
    loseSoundRef.current = createAudio("https://assets.mixkit.co/sfx/preview/mixkit-player-losing-or-failing-2042.mp3");
    clickSoundRef.current = createAudio("https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3");

    // Cleanup on unmount
    return () => {
      musicRef.current?.pause();
      winSoundRef.current?.pause();
      loseSoundRef.current?.pause();
      clickSoundRef.current?.pause();
    };
  }, []);

  // Control music playback
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.1;
      if (musicEnabled) {
        // Attempt to play, but catch errors for browsers that block autoplay
        musicRef.current.play().catch(error => {
          console.log("Music autoplay was blocked by the browser.", error);
        });
      } else {
        musicRef.current.pause();
      }
    }
  }, [musicEnabled]);

  // Generic sound playing function
  const playSound = useCallback((soundRef: React.RefObject<HTMLAudioElement | null>) => {
    if (soundEnabled && soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  }, [soundEnabled]);

  // Specific sound functions
  const playClick = useCallback(() => playSound(clickSoundRef), [playSound]);
  const playWin = useCallback(() => playSound(winSoundRef), [playSound]);
  const playLose = useCallback(() => playSound(loseSoundRef), [playSound]);

  return {
    musicEnabled,
    setMusicEnabled,
    soundEnabled,
    setSoundEnabled,
    playClick,
    playWin,
    playLose,
  };
};

    