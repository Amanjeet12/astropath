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
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    fetchName();
  }, [focused]);

  const fetchName = async () => {
    try {
      const name = await Preferences.getPreferences(Preferences.key.Name);
      const phone = await Preferences.getPreferences(Preferences.key.phone);
      const email = await Preferences.getPreferences(Preferences.key.email);
      const profiles = await Preferences.getPreferences(
        Preferences.key.Profile_pic,
      );

      console.log('Name:', name);
      setName(name);
      setPhoneNumber(phone);
      setEmail(email);
      setProfile(profiles);
    } catch (error) {
      console.log('Error fetching name:', error);
    }
  };

  const handleNavigation = () => {
    navigateToScreen('UpdateProfileScreen');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{width: '35%'}}>
        <Image
          source={{
            uri: profile
              ? profile
              : 'https://firebasestorage.googleapis.com/v0/b/zegocloudvideocall-b50bd.appspot.com/o/userprofile%2FWhatsApp%20Image%202024-04-03%20at%2012.55.45%20PM.jpeg?alt=media&token=729aae36-a285-4ccb-802d-ea512cbadb07',
          }}
          style={{
            width: SIZES.width * 0.25,
            height: SIZES.width * 0.25,
            resizeMode: 'cover',
            borderRadius: 300,
          }}
        />
      </View>
      <View style={{width: '50%', paddingTop: SIZES.width * 0.026}}>
        <Text style={styles.Profile} numberOfLines={1}>
          {name ? name : `UserName`}
        </Text>
        <Text style={styles.profile2} numberOfLines={1}>
          {phoneNumber ? phoneNumber : null}
        </Text>
        <Text style={styles.profile2} numberOfLines={1}>
          {email}
        </Text>
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
