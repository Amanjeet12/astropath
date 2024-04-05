/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constant/theme';

const LoadingScreen = ({visible, hide}) => {
  if (!visible) {
    return null; // If visible is false, don't render anything
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with 50% opacity
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>LoadingScreen</Text>
      {/* Call the hide function to hide the LoadingScreen */}
      <ActivityIndicator size={'small'} color={COLORS.black} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
