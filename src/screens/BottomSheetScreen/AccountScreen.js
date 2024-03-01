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

const AccountScreen = () => {
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
              Custome.logout(logout); // Pass logout as callback
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
            {/* <View style={{marginTop: SIZES.width * 0.051}}>
              <Text style={styles.profile_name}>User Name</Text>
              <Text
                style={[
                  styles.profile_name,
                  {color: '#848484', fontFamily: 'KantumruyPro-Regular'},
                ]}>
                tSingh102
              </Text>
            </View> */}
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
                    title={'Language'}
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
                    screen={'CustomerScreen'}
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
