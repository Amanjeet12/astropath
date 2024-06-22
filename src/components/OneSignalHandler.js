import React, {useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import messaging from '@react-native-firebase/messaging';
import {useNotification} from './NotificationProvider';
import fetchApproximateLocation from '../screens/Authentication/fetchApproximateLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const OneSignalHandler = ({isReady, navigationRef}) => {
  const {setNotification} = useNotification();
  const navigation = useNavigation();

  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId('cc8d6176-6cea-4058-af48-d20c9ae090dc');
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log('Prompt response:', response);
  });

  useEffect(() => {
    OneSignal.setNotificationOpenedHandler(async notification => {
      console.log('OneSignal: notification opened:', notification);
      const {body} = notification.notification;
      console.log('OneSignal: notification saved:', body);
      await AsyncStorage.setItem('notification', 'Chathistory');

      if (body === 'Chat has been initiated') {
        console.log('enter the body part and ready to navigate');

        if (isReady && navigationRef.current) {
          setNotification('Chathistory');
          navigation.navigate('Chathistory');
        } else {
          console.log('OneSignal: notification saved:');
          setNotification('Chathistory');
        }
      }
    });

    fetchApproximateLocation();
  }, [isReady, navigationRef, setNotification]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return null; // This component doesn't render anything
};

export default OneSignalHandler;
