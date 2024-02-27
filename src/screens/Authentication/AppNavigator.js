import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SingleAstrologer from '../BottomSheetScreen/SingleAstrologer';
import HoroscopeScreen from '../BottomSheetScreen/HoroscopeScreen';
import BlogScreen from '../BottomSheetScreen/BlogScreen';
import SingleKundli from '../BottomSheetScreen/SingleKundli';
import MarraigeKundli from '../BottomSheetScreen/MarraigeKundli';
import KundliScreen from '../BottomSheetScreen/KundliScreen';
import TermsAndConditionScreen from '../BottomSheetScreen/TermsAndConditionScreen';
import LanguageScreen from '../BottomSheetScreen/LanguageScreen';
import WalletScreen from '../BottomSheetScreen/WalletScreen';
import UpdateProfileScreen from '../BottomSheetScreen/UpdateProfileScreen';
import BottomTabScreen from '../BottomSheetScreen/BottomTabScreen';
import SingleKundaliForm from '../BottomSheetScreen/SingleKundaliForm';
import MarraigeScreenForm from '../BottomSheetScreen/MarraigeScreenForm';
import SearchPlaceScreen from '../BottomSheetScreen/SearchPlaceScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
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
      <Stack.Screen
        options={{headerShown: false}}
        name="SingleKundaliForm"
        component={SingleKundaliForm}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MarraigeScreenForm"
        component={MarraigeScreenForm}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchPlaceScreen"
        component={SearchPlaceScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
