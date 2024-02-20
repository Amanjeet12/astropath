/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SIZES} from '../../constant/theme';
import DashboardScreen from './DashboardScreen';
import AstrologerScreen from './AstrologerScreen';
import OrderScreen from './OrderScreen';
import AccountScreen from './AccountScreen';
import {
  AddIcon,
  AddIconFocuse,
  AstrologerIcon,
  AstrologerIconFocused,
  HomeIcon,
  HomeIconFocused,
  LikedIcon,
  ProfileIcon,
  ProfileIconFocused,
} from '../SvgComponent/BottomSvgComponent';

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -SIZES.width * 0.245}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      <Tab.Navigator
        initialRouteName="DashboardScreen"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            position: 'relative',
            alignItems: 'center',
            height: SIZES.height * 0.1,
            borderRadius: 0,
            // borderTopWidth: 0,
            elevation: Platform.OS === 'ios' ? 3 : 20,
            paddingHorizontal: SIZES.width * 0.028,
            shadowOffset: {
              shadowOffset: {
                width: 0,
                height: Platform.OS === 'ios' ? -10 : -20,
              },
            },
            shadowOpacity: Platform.OS === 'ios' ? 0.09 : 0.3,
            shadowRadius: 10,
            boxShadow: '0px 1px 25px 6px rgba(0, 0, 0, 0.06)',
          },
        }}>
        <Tab.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({color, size, focused}) =>
              focused ? <HomeIcon /> : <HomeIconFocused />,
          }}
        />
        <Tab.Screen
          name="AstrologerScreen"
          component={AstrologerScreen}
          options={{
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,

            tabBarIcon: ({color, size, focused}) =>
              focused ? <AstrologerIconFocused /> : <AstrologerIcon />,
          }}
        />
        <Tab.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            tabBarShowLabel: false,
            // tabBarStyle: {display: 'none'},
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({color, size, focused}) =>
              focused ? <AddIconFocuse /> : <AddIcon />,
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({color, size, focused}) =>
              focused ? <ProfileIconFocused /> : <ProfileIcon />,
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};

export default BottomTabScreen;
