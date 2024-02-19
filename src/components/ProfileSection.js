/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/Feather';
import useNavigateToScreen from './Navigation';

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
          style={{width: 120, height: 120, resizeMode: 'contain'}}
        />
      </View>
      <View style={{width: '50%', paddingTop: 10}}>
        <Text style={styles.Profile}>Tanmay Singh</Text>
        <Text style={styles.profile2}>+91 7717744558</Text>
        <Text style={styles.profile2}>tanmay@gmail.com</Text>
      </View>
      <TouchableOpacity
        style={{
          width: '10%',
          paddingTop: 10,
          height: 40,
        }}
        onPress={() => handleNavigation()}>
        <Icon name={'edit'} size={24} color={'#000'} />
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
    fontSize: 20,
    color: '#000',
    fontFamily: 'KantumruyPro-Regular',
  },
  profile2: {
    fontSize: 14,
    color: '#848484',
    fontFamily: 'KantumruyPro-Regular',
  },
});
