import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/AntDesign';

const Flagtextinput = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.flagContainer}>
        <Image source={images.india_flag} style={styles.flagImage} />
        <Text style={{fontSize: 16, color: '#000'}}>+91</Text>
        <Icon name="caretdown" color={'#000'} size={12} />
      </View>
      <View style={{width: '70%', paddingHorizontal: 10}}>
        <TextInput
          placeholder="Enter your mobile no"
          keyboardAppearance="dark"
          keyboardType="number-pad"
          maxLength={10}
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
    borderRadius: 15,
    height: 50,
    elevation: 4,
  },
  flagContainer: {
    width: '30%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    borderRightWidth: 0.4,
    borderColor: '#BABABA',
  },
  flagImage: {width: 25, height: 25, resizeMode: 'contain'},
});
