// Main.js
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AuthNavigator from './AuthNavigater';
import AppNavigator from './AppNavigator';
import {useAuth} from '../../constant/Auth';
import Splashscreen from '../onboarding/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Preferences from '../api/Preferences';
import {TimerProvider} from '../../constant/TimerContext';
import TimerComponent from '../../components/TimerComponent';

const Main = () => {
  const {isLoggedIn} = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const checkAndUpdateDate = async () => {
    try {
      let savedDate = await AsyncStorage.getItem('todayDate');
      console.log('savedDate', savedDate);
      if (!savedDate) {
        const today = new Date()
          .toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})
          .split(',')[0];
        await AsyncStorage.setItem('todayDate', today);
        savedDate = today;
        console.log('currentDateSav');
      }

      const currentDate = new Date()
        .toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})
        .split(',')[0];
      console.log('current', currentDate);
      if (savedDate !== currentDate) {
        await AsyncStorage.setItem('todayDate', currentDate);
        await Preferences.saveJsonPerences(
          Preferences.horoscope.panchang,
          null,
        );
        await Preferences.saveJsonPerences(Preferences.horoscope.today, null);
        await Preferences.saveJsonPerences(
          Preferences.horoscope.tommorow,
          null,
        );
        await Preferences.saveJsonPerences(
          Preferences.horoscope.yesterday,
          null,
        );
        console.log('New_currentDateSave');
      }
    } catch (error) {
      console.error('Failed to check or update date:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await checkAndUpdateDate();
      setIsLoading(false);
    };

    const timer = setTimeout(init, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Splashscreen />;
  }

  return (
    <>
      {isLoggedIn ? (
        <TimerProvider>
          <AppNavigator />
          <TimerComponent />
        </TimerProvider>
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default Main;
