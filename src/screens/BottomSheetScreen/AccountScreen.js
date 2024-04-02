/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import ProfileSection from '../../components/ProfileSection';
import CustomeDesignNavigation from '../../components/CustomeDesignNavigation';
import LogoutButton from '../../components/LogoutButton';
import {useAuth} from '../../constant/Auth';
import Custome from '../api/logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Preferences from '../api/Preferences';
import {useTranslation} from 'react-i18next';

const AccountScreen = () => {
  const {t} = useTranslation();

  const {logout} = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              console.log('Items removed successfully.');
              let items = [];
              await AsyncStorage.setItem('kundliItems', JSON.stringify(items));
              await Preferences.saveJsonPerences(
                Preferences.horoscope.panchang,
                null,
              );
              await Preferences.saveJsonPerences(
                Preferences.horoscope.today,
                null,
              );
              await Preferences.saveJsonPerences(
                Preferences.horoscope.tommorow,
                null,
              );
              await Preferences.saveJsonPerences(
                Preferences.horoscope.yesterday,
                null,
              );

              Custome.logout(() => {
                console.log('Logout successful');
              });
              logout();
            } catch (error) {
              console.error('Error removing items:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <ProfileSection />
            </View>
            <View
              style={{
                marginTop: SIZES.width * 0.051,
                paddingLeft: SIZES.width * 0.039,
              }}>
              <Text style={styles.title}>Account Settings</Text>
              <View>
                <View style={{marginTop: SIZES.width * 0.026}}>
                  <CustomeDesignNavigation
                    title={'Wallet'}
                    icon={images.wallet}
                    screen={'WalletScreen'}
                  />
                  <CustomeDesignNavigation
                    title={t('Language')}
                    icon={images.language}
                    screen={'LanguageScreen'}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: SIZES.width * 0.077,
                paddingLeft: SIZES.width * 0.039,
              }}>
              <Text style={styles.title}>General</Text>
              <View>
                <View style={{marginTop: SIZES.width * 0.026}}>
                  <CustomeDesignNavigation
                    title={'Terms and Conditions'}
                    icon={images.terms}
                    screen={'TermsAndConditionScreen'}
                  />
                  <CustomeDesignNavigation
                    title={'Privacy Policy'}
                    icon={images.privacy}
                    screen={'PrivacyScreen'}
                  />
                  <CustomeDesignNavigation
                    title={'Customer Support'}
                    icon={images.customer_care}
                    screen={'CustomerSupportScreen'}
                  />
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  marginTop: SIZES.width * 0.13,
                  width: SIZES.width * 0.51,
                }}
                activeOpacity={1}
                onPress={handleLogout}>
                <LogoutButton />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  profile_name: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: SIZES.width * 0.046,
    color: COLORS.black,
    paddingLeft: SIZES.width * 0.039,
  },
  title: {
    fontSize: SIZES.width * 0.051,
    color: COLORS.black,
  },
});
