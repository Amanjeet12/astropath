import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/screens/Authentication/Main';
import {AuthProvider} from './src/constant/Auth';
import {Provider} from 'react-redux';
import {myStore} from './src/redux/myStore';
import {ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {NotificationProvider} from './src/components/NotificationProvider';
import OneSignalHandler from './src/components/OneSignalHandler';

const linking = {
  prefixes: ['https://yourapp.com', 'yourapp://'],
  config: {
    screens: {
      Chathistory: 'chathistory',
      // Add other screens and paths here
    },
  },
};

const App = () => {
  const navigationRef = useRef();
  const [isReady, setIsReady] = useState(false);

  return (
    <AuthProvider>
      <Provider store={myStore}>
        <NotificationProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => setIsReady(true)}
            linking={linking}>
            <ZegoCallInvitationDialog />
            <OneSignalHandler isReady={isReady} navigationRef={navigationRef} />
            <Main />
            <ZegoUIKitPrebuiltCallFloatingMinimizedView />
            <ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView />
          </NavigationContainer>
        </NotificationProvider>
      </Provider>
    </AuthProvider>
  );
};

export default App;
