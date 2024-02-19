import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {images} from '../constant';
import {SIZES} from '../constant/theme';
import useNavigateToScreen from './Navigation';

const BannerSection = () => {
  const navigation = useNavigateToScreen();
  const handleNavigation = () => {
    navigation('KundliScreen');
  };
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => handleNavigation()}>
      <Image source={images.banner_astro} style={styles.images} />
    </TouchableOpacity>
  );
};

export default BannerSection;

const styles = StyleSheet.create({
  images: {
    width: '100%',
    height: SIZES.height * 0.2,
    resizeMode: 'contain',
  },
});
