import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splashscreen from '../onboarding/SplashScreen';
import OnboardingScreen from '../onboarding/OnboardingScreen';
import LoginScreen from '../Login/LoginScreen';
import OtpScreen from '../Login/OtpScreen';
import CompleteProfile from '../Login/CompleteProfile';
import CompleteScreen from '../Login/CompleteScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 400,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 400,
            },
          },
        },
        cardStyleInterpolator: ({current, next, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
                {
                  translateX: next
                    ? next.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -layouts.screen.width],
                      })
                    : 0,
                },
              ],
            },
            overflow: 'visible',
          };
        },
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="OnboardingScreen"
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OtpScreen"
        component={OtpScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CompleteProfile"
        component={CompleteProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CompleteScreen"
        component={CompleteScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
