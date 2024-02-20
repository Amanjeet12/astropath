import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constant/theme';
import useNavigateToScreen from './Navigation';

const Custombutton = ({placeholder, screen}) => {
  const navigateToScreen = useNavigateToScreen();
  const handleNavigation = () => {
    navigateToScreen(screen);
  };
  return (
    <TouchableOpacity
      style={styles.maincontainer}
      onPress={() => handleNavigation()}>
      <Text style={styles.title}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

export default Custombutton;

const styles = StyleSheet.create({
  maincontainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.02,
    backgroundColor: '#FFB443',
    borderRadius: SIZES.width * 0.039,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: SIZES.width * 0.01,
  },
  title: {
    fontFamily: 'KantumruyPro-Regular',
    color: COLORS.black,
    fontSize: SIZES.width * 0.041,
  },
});
