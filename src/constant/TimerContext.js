/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useEffect} from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({children}) => {
  const initialSeconds = 2 * 60; // 5 minutes in seconds
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // second timer
  const initialSecondarySeconds = 5 * 60;
  const [secondarySeconds, setSecondarySeconds] = useState(
    initialSecondarySeconds,
  );
  const [isSecondaryActive, setIsSecondaryActive] = useState(false);
  const [isSecondaryVisible, setIsSecondaryVisible] = useState(false);

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

  useEffect(() => {
    let interval = null;
    if (isSecondaryActive && secondarySeconds > 0) {
      interval = setInterval(() => {
        setSecondarySeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (
      !isSecondaryActive &&
      secondarySeconds !== initialSecondarySeconds
    ) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isSecondaryActive, secondarySeconds]);

  const toggleSecondaryTimer = () => {
    setIsSecondaryActive(!isSecondaryActive);
  };

  const resetSecondaryTimer = () => {
    setSecondarySeconds(initialSecondarySeconds);
    setIsSecondaryActive(false);
  };

  const showSecondaryTimer = () => {
    setSecondarySeconds(initialSecondarySeconds);
    setIsSecondaryVisible(true);
    setIsSecondaryActive(true);
  };

  const hideSecondaryTimer = () => {
    setSecondarySeconds(0);
    setIsSecondaryVisible(false);
    setIsSecondaryActive(false);
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

        //second
        secondarySeconds,
        isSecondaryActive,
        isSecondaryVisible,
        toggleSecondaryTimer,
        resetSecondaryTimer,
        showSecondaryTimer,
        hideSecondaryTimer,
      }}>
      {children}
    </TimerContext.Provider>
  );
};
