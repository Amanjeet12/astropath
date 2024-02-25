import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext, useEffect} from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    // Retrieve the state from storage when the component mounts
    const retrieveLoginState = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        if (value !== null) {
          setIsLoggedIn(JSON.parse(value)); // parse string to boolean
        } else {
          setIsLoggedIn(false); // Default to false if value is not found
        }
      } catch (error) {
        console.error(
          "Failed to retrieve 'isLoggedIn' from AsyncStorage:",
          error,
        );
        setIsLoggedIn(false); // Default to false if retrieval fails
      }
    };

    retrieveLoginState();
  }, []);

  const login = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to set 'isLoggedIn' in AsyncStorage:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Failed to set 'isLoggedIn' in AsyncStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
