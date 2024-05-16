import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/screens/Authentication/Main';
import {AuthProvider} from './src/constant/Auth';
import {Provider} from 'react-redux';
import fetchApproximateLocation from './src/screens/Authentication/fetchApproximateLocation';
import {myStore} from './src/redux/myStore';
import messaging from '@react-native-firebase/messaging';

import {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import OneSignal from 'react-native-onesignal';

const App = () => {
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId('cc8d6176-6cea-4058-af48-d20c9ae090dc');
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log('Prompt response:', response);
  });

  // Add notification click event listener
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
  });
  useEffect(() => {
    fetchApproximateLocation();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Provider store={myStore}>
          <ZegoCallInvitationDialog />
          <Main />
          <ZegoUIKitPrebuiltCallFloatingMinimizedView />
        </Provider>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
