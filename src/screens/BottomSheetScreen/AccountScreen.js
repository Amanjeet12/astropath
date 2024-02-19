/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import ProfileSection from '../../components/ProfileSection';
import CustomeDesignNavigation from '../../components/CustomeDesignNavigation';
import LogoutButton from '../../components/LogoutButton';

const AccountScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={{marginTop: 10}}>
              <HeaderSection />
            </View>
            <View style={{marginTop: 20}}>
              <ProfileSection />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.profile_name}>User Name</Text>
              <Text
                style={[
                  styles.profile_name,
                  {color: '#848484', fontFamily: 'KantumruyPro-Regular'},
                ]}>
                tSingh102
              </Text>
            </View>
            <View style={{marginTop: 20, paddingLeft: 15}}>
              <Text style={styles.title}>Account Settings</Text>
              <View>
                <View style={{marginTop: 10}}>
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
                  <CustomeDesignNavigation
                    title={'Notification'}
                    icon={images.notification}
                    screen={'DashboardScreen'}
                  />
                </View>
              </View>
            </View>
            <View style={{marginTop: 30, paddingLeft: 15}}>
              <Text style={styles.title}>General</Text>
              <View>
                <View style={{marginTop: 10}}>
                  <CustomeDesignNavigation
                    title={'Terms and Conditions'}
                    icon={images.terms}
                    screen={'TermsAndConditionScreen'}
                  />
                  <CustomeDesignNavigation
                    title={'Privacy Policy'}
                    icon={images.privacy}
                    screen={'DashboardScreen'}
                  />
                  <CustomeDesignNavigation
                    title={'Customer Support'}
                    icon={images.customer_care}
                    screen={'DashboardScreen'}
                  />
                </View>
              </View>
            </View>
            <View style={{marginTop: 50, alignItems: 'center'}}>
              <LogoutButton />
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
    marginHorizontal: 20,
  },
  profile_name: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: 18,
    color: COLORS.black,
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    color: COLORS.black,
  },
});
