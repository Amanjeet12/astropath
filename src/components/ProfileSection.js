/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/Feather';
import useNavigateToScreen from './Navigation';
import {SIZES} from '../constant/theme';
import Preferences from '../screens/api/Preferences';
import {useIsFocused} from '@react-navigation/native';

const ProfileSection = () => {
  const focused = useIsFocused();
  const navigateToScreen = useNavigateToScreen();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    fetchName();
  }, [focused]);

  const fetchName = async () => {
    try {
      const latitude = await Preferences.getPreferences(
        Preferences.key.userLatitude,
      );
      const name = await Preferences.getPreferences(Preferences.key.Name);
      const phone = await Preferences.getPreferences(Preferences.key.phone);

      console.log('Name:', name);
      setName(name);
      setPhoneNumber(phone);
    } catch (error) {
      console.log('Error fetching name:', error);
    }
  };

  const handleNavigation = () => {
    navigateToScreen('UpdateProfileScreen');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{width: '40%'}}>
        <Image
          source={images.profile_image}
          style={{
            width: SIZES.width * 0.31,
            height: SIZES.width * 0.31,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{width: '50%', paddingTop: SIZES.width * 0.026}}>
        <Text style={styles.Profile}>{name ? name : `UserName`}</Text>
        <Text style={styles.profile2}>{phoneNumber ? phoneNumber : null}</Text>
        {/* <Text style={styles.profile2}>tanmay@gmail.com</Text> */}
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
