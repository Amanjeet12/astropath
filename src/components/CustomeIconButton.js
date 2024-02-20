/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES} from '../constant/theme';

const CustomeIconButton = ({icon, placeholder}) => {
  return (
    <TouchableOpacity style={styles.mainContainer}>
      <View style={styles.boxContainer}>
        <View style={styles.imageContainer}>
          <Image source={icon} style={styles.image} />
        </View>
        <View style={{width: '70%'}}>
          <Text style={styles.title}>{placeholder}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomeIconButton;

const styles = StyleSheet.create({
  mainContainer: {
    height: SIZES.width * 0.13,
    borderWidth: 2,
    borderRadius: SIZES.width * 0.039,
  },
  boxContainer: {flexDirection: 'row', alignItems: 'center', height: '100%'},
  imageContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZES.width * 0.077,
    height: SIZES.width * 0.077,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'KantumruyPro-Regular',
    color: '#000',
    fontSize: SIZES.width * 0.036,
  },
});
