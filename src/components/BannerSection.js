import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '../constant';
import {SIZES} from '../constant/theme';

const BannerSection = () => {
  return (
    <View style={styles.mainContainer}>
      <Image source={images.banner_astro} style={styles.images} />
    </View>
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
