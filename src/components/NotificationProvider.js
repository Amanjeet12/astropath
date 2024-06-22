import React, {createContext, useState, useContext} from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
  const [notification, setNotification] = useState(null);

  return (
    <NotificationContext.Provider value={{notification, setNotification}}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  return context;
};
