/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constant/theme';
import {images} from '../constant';

const HoroscopeSection = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 20}}>
        <View>
          <Image
            source={data.image}
            style={{width: 80, height: 80, resizeMode: 'contain'}}
          />
        </View>
        <View style={{paddingTop: 10}}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.date}>{data.date}</Text>
        </View>
      </View>
      <View style={{marginTop: 5}}>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      <View style={{alignItems: 'flex-end', marginTop: 10}}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>View more</Text>
          <Image
            source={images.button_icon}
            style={{width: 15, height: 15, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HoroscopeSection;

const styles = StyleSheet.create({
  container: {
    height: 235,
    backgroundColor: '#fae3d2',
    borderRadius: 15,
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: 18,
    color: COLORS.black,
  },
  date: {
    fontFamily: 'KantumruyPro-Regular',
    lineHeight: 25,
    color: COLORS.black,
    fontSize: 12,
  },
  description: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: 12,
    color: '#444444',
    lineHeight: 17,
  },
  buttonContainer: {
    width: 150,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFB443',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: COLORS.black,
  },
});
