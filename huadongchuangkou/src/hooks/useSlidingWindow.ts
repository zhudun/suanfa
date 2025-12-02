import { useState, useRef, useCallback, useEffect } from 'react';
import { ArrayElement, WindowState, AnimationState, WindowStats } from '@/types/sliding-window';

export function useSlidingWindow() {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [window, setWindow] = useState<WindowState>({ start: 0, end: 0, size: 3 });
  const [animation, setAnimation] = useState<AnimationState>({
    isPlaying: false,
    speed: 1,
    currentStep: 0
  });
  const [stats, setStats] = useState<WindowStats>({
    currentSum: 0,
    maxSum: 0,
    maxStart: 0,
    maxEnd: 0
  });

  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const speedRef = useRef(animation.speed);
  const windowRef = useRef(window);

  useEffect(() => {
    speedRef.current = animation.speed;
  }, [animation.speed]);

  useEffect(() => {
    windowRef.current = window;
  }, [window]);

  const initializeArray = useCallback((values: number[]) => {
    const newArray = values.map((value, index) => ({
      value,
      index,
      isInWindow: index < window.size
    }));
    setArray(newArray);
    const end = Math.min(window.size - 1, values.length - 1);
    setWindow({ start: 0, end: end, size: window.size });
    const initialSum = newArray.slice(0, end + 1).reduce((acc, el) => acc + el.value, 0);
    setStats({ currentSum: initialSum, maxSum: initialSum, maxStart: 0, maxEnd: end });
    setAnimation(prev => ({ ...prev, currentStep: 0 }));
  }, [window.size]);

  const updateWindowElements = useCallback((start: number, end: number) => {
    setArray(prev => prev.map((element, index) => ({
      ...element,
      isInWindow: index >= start && index <= end
    })));
  }, []);

  const moveWindow = useCallback(() => {
    setWindow(prev => {
      const newStart = prev.start + 1;
      const newEnd = prev.end + 1;

      if (newEnd >= array.length) {
        setAnimation(prev => ({ ...prev, isPlaying: false }));
        return prev;
      }

      updateWindowElements(newStart, newEnd);
      const prevStart = prev.start;
      setStats(prevStats => {
        const addVal = array[newEnd]?.value ?? 0;
        const removeVal = array[prevStart]?.value ?? 0;
        const newCurrentSum = prevStats.currentSum + addVal - removeVal;
        if (newCurrentSum > prevStats.maxSum) {
          return {
            currentSum: newCurrentSum,
            maxSum: newCurrentSum,
            maxStart: newStart,
            maxEnd: newEnd,
          };
        }
        return { ...prevStats, currentSum: newCurrentSum };
      });
      return { ...prev, start: newStart, end: newEnd };
    });

    setAnimation(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  }, [array.length, updateWindowElements]);
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setAnimation(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const startAnimation = useCallback(() => {
    if (animationRef.current) return;
    
    setAnimation(prev => ({ ...prev, isPlaying: true }));
    
    const animate = () => {
      const currentEnd = windowRef.current.end;
      if (currentEnd >= array.length - 1) {
        stopAnimation();
        return;
      }
      
      moveWindow();
      animationRef.current = setTimeout(animate, 1000 / speedRef.current);
    };
    
    animate();
  }, [array.length, moveWindow, stopAnimation]);

  const resetAnimation = useCallback(() => {
    stopAnimation();
    const length = array.length > 0 ? array.length : 10;
    const generateValues = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 100) + 1);
    const hasLocalDrop = (vals: number[]) => vals.some((v, i) => i < vals.length - 1 && v > vals[i + 1]);
    let values = generateValues(length);
    let attempts = 0;
    while (!hasLocalDrop(values) && attempts < 10) {
      values = generateValues(length);
      attempts++;
    }
    const newArray = values.map((value, index) => ({ value, index, isInWindow: index < window.size }));
    setArray(newArray);
    const end = Math.min(window.size - 1, newArray.length - 1);
    updateWindowElements(0, end);
    setWindow(prev => ({ ...prev, start: 0, end }));
    const initialSum = newArray.slice(0, end + 1).reduce((acc, el) => acc + el.value, 0);
    setStats({ currentSum: initialSum, maxSum: initialSum, maxStart: 0, maxEnd: end });
    setAnimation(prev => ({ ...prev, currentStep: 0 }));
  }, [array.length, window.size, stopAnimation, updateWindowElements]);

  const setSpeed = useCallback((speed: number) => {
    setAnimation(prev => ({ ...prev, speed }));
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return {
    array,
    window,
    animation,
    stats,
    initializeArray,
    startAnimation,
    stopAnimation,
    resetAnimation,
    setSpeed
  };
}
