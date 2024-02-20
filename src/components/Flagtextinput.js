import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/AntDesign';
import {SIZES} from '../constant/theme';

const Flagtextinput = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.flagContainer}>
        <Image source={images.india_flag} style={styles.flagImage} />
        <Text style={{fontSize: SIZES.width * 0.041, color: '#000'}}>+91</Text>
        <Icon name="caretdown" color={'#000'} size={SIZES.width * 0.031} />
      </View>
      <View style={{width: '70%', paddingHorizontal: SIZES.width * 0.026}}>
        <TextInput
          placeholder="Enter your mobile no"
          keyboardAppearance="dark"
          keyboardType="number-pad"
          maxLength={SIZES.width * 0.026}
          style={{color: '#000'}}
        />
      </View>
    </View>
  );
};

export default Flagtextinput;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 3,
    borderRadius: SIZES.width * 0.039,
    height: SIZES.width * 0.13,
    elevation: SIZES.width * 0.01,
  },
  flagContainer: {
    width: '30%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.width * 0.026,
    borderRightWidth: 0.4,
    borderColor: '#BABABA',
  },
  flagImage: {
    width: SIZES.width * 0.064,
    height: SIZES.width * 0.064,
    resizeMode: 'contain',
  },
});
