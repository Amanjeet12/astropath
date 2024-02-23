import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/onboarding/SplashScreen';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import OtpScreen from './src/screens/Login/OtpScreen';
import CompleteProfile from './src/screens/Login/CompleteProfile';
import CompleteScreen from './src/screens/Login/CompleteScreen';
import BottomTabScreen from './src/screens/BottomSheetScreen/BottomTabScreen';
import UpdateProfileScreen from './src/screens/BottomSheetScreen/UpdateProfileScreen';
import WalletScreen from './src/screens/BottomSheetScreen/WalletScreen';
import LanguageScreen from './src/screens/BottomSheetScreen/LanguageScreen';
import TermsAndConditionScreen from './src/screens/BottomSheetScreen/TermsAndConditionScreen';
import KundliScreen from './src/screens/BottomSheetScreen/KundliScreen';
import MarraigeKundli from './src/screens/BottomSheetScreen/MarraigeKundli';
import SingleKundli from './src/screens/BottomSheetScreen/SingleKundli';
import BlogScreen from './src/screens/BottomSheetScreen/BlogScreen';
import HoroscopeScreen from './src/screens/BottomSheetScreen/HoroscopeScreen';
import SingleAstrologer from './src/screens/BottomSheetScreen/SingleAstrologer';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
          name="Splashscreen"
          component={SplashScreen}
        />
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
        <Stack.Screen
          options={{headerShown: false}}
          name="BottomTabScreen"
          component={BottomTabScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="UpdateProfileScreen"
          component={UpdateProfileScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="WalletScreen"
          component={WalletScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="LanguageScreen"
          component={LanguageScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="TermsAndConditionScreen"
          component={TermsAndConditionScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="KundliScreen"
          component={KundliScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MarraigeKundli"
          component={MarraigeKundli}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SingleKundli"
          component={SingleKundli}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="BlogScreen"
          component={BlogScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="HoroscopeScreen"
          component={HoroscopeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SingleAstrologer"
          component={SingleAstrologer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
