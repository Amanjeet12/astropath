/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SIZES} from '../constant/theme';
import {useNavigation} from '@react-navigation/native';

const KundliSecion = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.boxContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={images.single_icon} style={styles.images} />
          <Text style={styles.text1}>Free Kundli</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SingleKundaliForm')}>
          <Icon
            name="arrow-top-right"
            size={SIZES.width * 0.051}
            color={'#fff'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.boxContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={images.love_icon} style={styles.images} />
          <Text style={styles.text1}>Match Making{'\n'}Kundli</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MarraigeScreenForm')}>
          <Icon
            name="arrow-top-right"
            size={SIZES.width * 0.051}
            color={'#fff'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default KundliSecion;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.width * 0.026,
  },
  boxContainer: {
    width: '48%',
    gap: SIZES.width * 0.026,
    height: SIZES.width * 0.21,
    padding: SIZES.width * 0.013,
    borderRadius: 18,
    backgroundColor: '#fae1d0',
  },
  images: {
    width: SIZES.width * 0.153,
    height: SIZES.width * 0.115,
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    bottom: SIZES.width * 0.026,
    right: SIZES.width * 0.026,
    paddingHorizontal: SIZES.width * 0.026,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#7d3807',
  },
  text1: {
    fontSize: SIZES.width * 0.029,
    color: '#000',
    fontFamily: 'KantumruyPro-Regular',
  },
});
