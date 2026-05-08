import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * useVisualizer hook — manages step-by-step navigation through algorithm snapshots.
 *
 * @param {Array} steps - Array of snapshot objects from a step generator
 * @returns {Object} { currentStep, currentSnapshot, totalSteps, isPlaying, speed,
 *                      goNext, goPrev, goToStep, reset, togglePlay, setSpeed }
 */
export default function useVisualizer(steps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  const totalSteps = steps.length;
  const currentSnapshot = steps[currentIndex] || null;

  // Stop playing when we reach the end
  useEffect(() => {
    if (isPlaying && currentIndex >= totalSteps - 1) {
      setIsPlaying(false);
    }
  }, [currentIndex, totalSteps, isPlaying]);

  // Auto-play timer
  useEffect(() => {
    if (isPlaying && currentIndex < totalSteps - 1) {
      const delay = Math.max(200, 1200 / speed);
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, totalSteps - 1));
      }, delay);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentIndex, totalSteps, speed]);

  const goNext = useCallback(() => {
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalSteps]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const goToStep = useCallback((index) => {
    const idx = Math.max(0, Math.min(index, totalSteps - 1));
    setCurrentIndex(idx);
  }, [totalSteps]);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
  }, []);

  const togglePlay = useCallback(() => {
    if (currentIndex >= totalSteps - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying((prev) => !prev);
  }, [currentIndex, totalSteps]);

  const changeSpeed = useCallback((newSpeed) => {
    setSpeed(Math.max(0.25, Math.min(4, newSpeed)));
  }, []);

  return {
    currentStep: currentIndex,
    currentSnapshot,
    totalSteps,
    isPlaying,
    speed,
    goNext,
    goPrev,
    goToStep,
    reset,
    togglePlay,
    setSpeed: changeSpeed,
  };
}
