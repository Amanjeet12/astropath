import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constant/theme';
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
    height: 50,
    marginTop: 10,
    backgroundColor: '#FFB443',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  title: {
    fontFamily: 'KantumruyPro-Regular',
    color: COLORS.black,
    fontSize: 16,
  },
});
