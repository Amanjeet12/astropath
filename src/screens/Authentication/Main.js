import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthNavigator from './AuthNavigater';
import AppNavigator from './AppNavigator';
import {useAuth} from '../../constant/Auth';
import Splashscreen from '../onboarding/SplashScreen';

const Main = () => {
  const {isLoggedIn} = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn !== null) {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  if (isLoading) {
    return <Splashscreen />;
  }

  return <>{isLoggedIn ? <AppNavigator /> : <AuthNavigator />}</>;
};

export default Main;
