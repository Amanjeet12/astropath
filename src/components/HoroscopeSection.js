/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constant/theme';
import {images} from '../constant';
import useNavigateToScreen from './Navigation';

const HoroscopeSection = ({data}) => {
  const navigation = useNavigateToScreen();
  const handleNavigaion = () => {
    navigation('HoroscopeScreen');
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: SIZES.width * 0.051,
        }}>
        <View>
          <Image
            source={data.image}
            style={{
              width: SIZES.width * 0.205,
              height: SIZES.width * 0.205,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{paddingTop: SIZES.width * 0.026}}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.date}>{data.date}</Text>
        </View>
      </View>
      <View style={{marginTop: SIZES.width * 0.013}}>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      <View style={{alignItems: 'flex-end', marginTop: SIZES.width * 0.026}}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handleNavigaion()}>
          <Text style={styles.buttonText}>View more</Text>
          <Image
            source={images.button_icon}
            style={{
              width: SIZES.width * 0.039,
              height: SIZES.width * 0.039,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HoroscopeSection;

const styles = StyleSheet.create({
  container: {
    height: SIZES.width * 0.6,
    backgroundColor: '#fae3d2',
    borderRadius: SIZES.width * 0.039,
    marginBottom: SIZES.width * 0.051,
    padding: SIZES.width * 0.051,
  },
  title: {
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: SIZES.width * 0.046,
    color: COLORS.black,
  },
  date: {
    fontFamily: 'KantumruyPro-Regular',
    lineHeight: SIZES.width * 0.064,
    color: COLORS.black,
    fontSize: SIZES.width * 0.031,
  },
  description: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.031,
    color: '#444444',
    lineHeight: SIZES.width * 0.044,
  },
  buttonContainer: {
    width: 150,
    paddingHorizontal: SIZES.width * 0.051,
    paddingVertical: SIZES.width * 0.021,
    borderWidth: 1,
    borderRadius: SIZES.width * 0.077,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.width * 0.013,
    backgroundColor: '#FFB443',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: COLORS.black,
  },
});
