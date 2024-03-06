import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../onboarding/OnboardingScreen';
import LoginScreen from '../Login/LoginScreen';
import OtpScreen from '../Login/OtpScreen';
import CompleteProfile from '../Login/CompleteProfile';
import CompleteScreen from '../Login/CompleteScreen';
import SearchPlaceScreen from '../BottomSheetScreen/SearchPlaceScreen';
import SelectHoroScope from '../Login/SelectHoroScope';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [firstLaunch, setFirstLaunch] = useState(null);
  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem('appLaunched');
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem('appLaunched', 'false');
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  return (
    firstLaunch != null && (
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
        {firstLaunch && (
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompleteScreen"
          component={CompleteScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchPlaceScreen"
          component={SearchPlaceScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectHoroScope"
          component={SelectHoroScope}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    )
  );
};

export default AuthNavigator;
