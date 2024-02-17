/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

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
    height: 50,
    borderWidth: 2,
    borderRadius: 15,
  },
  boxContainer: {flexDirection: 'row', alignItems: 'center', height: '100%'},
  imageContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {width: 30, height: 30, resizeMode: 'contain'},
  title: {
    fontFamily: 'KantumruyPro-Regular',
    color: '#000',
    fontSize: 14,
  },
});
