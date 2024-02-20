/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/Feather';
import useNavigateToScreen from './Navigation';
import {SIZES} from '../constant/theme';

const ProfileSection = () => {
  const navigateToScreen = useNavigateToScreen();
  const handleNavigation = () => {
    navigateToScreen('UpdateProfileScreen');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{width: '40%'}}>
        <Image
          source={images.Profile2}
          style={{
            width: SIZES.width * 0.31,
            height: SIZES.width * 0.31,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{width: '50%', paddingTop: SIZES.width * 0.026}}>
        <Text style={styles.Profile}>Tanmay Singh</Text>
        <Text style={styles.profile2}>+91 7717744558</Text>
        <Text style={styles.profile2}>tanmay@gmail.com</Text>
      </View>
      <TouchableOpacity
        style={{
          width: '10%',
          paddingTop: SIZES.width * 0.026,
          height: SIZES.width * 0.102,
        }}
        onPress={() => handleNavigation()}>
        <Icon name={'edit'} size={SIZES.width * 0.062} color={'#000'} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
  },
  Profile: {
    fontSize: SIZES.width * 0.051,
    color: '#000',
    fontFamily: 'KantumruyPro-Regular',
  },
  profile2: {
    fontSize: SIZES.width * 0.036,
    color: '#848484',
    fontFamily: 'KantumruyPro-Regular',
  },
});
