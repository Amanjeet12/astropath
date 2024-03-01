/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/Entypo';
import useNavigateToScreen from './Navigation';
import {SIZES} from '../constant/theme';

const CustomeDesignNavigation = ({title, icon, screen}) => {
  const navigation = useNavigateToScreen();
  const handleNavihation = () => {
    console.log('enter');
  };
  return (
    <TouchableOpacity
      style={styles.flexContainer}
      onPress={() => handleNavihation()}>
      <View style={{width: '10%'}}>
        <Image
          source={icon}
          style={{
            width: SIZES.width * 0.051,
            height: SIZES.width * 0.051,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{width: '75%'}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{width: '15%', alignItems: 'center'}}>
        <Icon
          name={'chevron-small-right'}
          size={SIZES.width * 0.077}
          color={'#000'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomeDesignNavigation;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    height: SIZES.width * 0.13,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: SIZES.width * 0.013,
    marginTop: SIZES.width * 0.013,
    borderColor: '#FFD9A0',
  },
  title: {
    fontSize: SIZES.width * 0.041,
    color: '#000',
  },
});
