import React, {createContext, useState, useEffect} from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({children}) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <TimerContext.Provider value={{seconds, isActive, toggleTimer, resetTimer}}>
      {children}
    </TimerContext.Provider>
  );
};
