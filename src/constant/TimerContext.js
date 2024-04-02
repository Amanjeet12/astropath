import React, {createContext, useState, useEffect} from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({children}) => {
  const initialSeconds = 5 * 60; // 5 minutes in seconds
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== initialSeconds) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(initialSeconds);
    setIsActive(false);
  };

  const showTimer = () => {
    setIsVisible(true);
    setIsActive(true);
  };

  const hideTimer = () => {
    setSeconds(initialSeconds);
    setIsVisible(false);
    setIsActive(false);
  };

  return (
    <TimerContext.Provider
      value={{
        seconds,
        isActive,
        isVisible,
        toggleTimer,
        resetTimer,
        showTimer,
        hideTimer,
      }}>
      {children}
    </TimerContext.Provider>
  );
};
