/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../../constant/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {images} from '../../constant';
import Flagtextinput from '../../components/Flagtextinput';
import CustomeIconButton from '../../components/CustomeIconButton';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import Preferences from '../api/Preferences';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = number => {
    setPhoneNumber(number);
  };
  const handleNavigation = async () => {
    if (!phoneNumber) {
      Alert.alert('Enter phone no');
      return;
    }
    try {
      var params = {
        phone: '+91' + phoneNumber,
      };

      WebMethods.postRequest(WebUrls.url.otp_send, params).then(response => {
        if (response.payload.error) {
          Alert.alert(response.data.error);
          return;
        } else if (response.payload !== null) {
          const orderId = response.payload.orderId;
          navigation.navigate('OtpScreen', {orderId, phoneNumber});
        } else Alert.alert('error try again');
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const Divider = ({Placeholder}) => {
    return (
      <View style={styles.dividerContainer}>
        <View style={styles.dividerline} />
        <Text style={styles.dividerText}>{Placeholder}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <View
          style={{
            height: SIZES.height / 2.5,
          }}>
          <Image
            source={images.login_image}
            style={{
              width: SIZES.width,
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>

        <View style={[styles.bottomContainer, {height: SIZES.height / 1.7}]}>
          <View>
            <Text style={styles.title}>Hi Welcome!</Text>
            <Text style={styles.description}>Submit your mobile number</Text>
          </View>
          <View style={{marginTop: SIZES.width * 0.026}}>
            <Divider Placeholder={'Log in or Sign up'} />
          </View>

          <View style={{marginTop: SIZES.width * 0.039}}>
            <Flagtextinput
              placeholder={'Enter the mobile no'}
              onPhoneNumberChange={handlePhoneNumberChange}
            />
          </View>
          <View style={{marginTop: SIZES.width * 0.026}}>
            <TouchableOpacity
              style={styles.maincontainer}
              onPress={() => handleNavigation()}>
              <Text style={styles.buttontitle}>SEND OTP</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: SIZES.width * 0.051}}>
            <Divider Placeholder={'or'} />
          </View>
          <View style={{marginTop: SIZES.width * 0.051}}>
            <CustomeIconButton
              icon={images.mail_Icon}
              placeholder={'Continue with email id'}
            />
          </View>
          <View style={{marginTop: SIZES.width * 0.034}}>
            <Text
              style={[styles.description, {lineHeight: SIZES.width * 0.055}]}>
              By signing up, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Use </Text> and
              <Text style={styles.linkText}> Privacy Policy </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    width: SIZES.width,
    // height: '70%',
    backgroundColor: '#EDD498',
    borderTopRightRadius: SIZES.width * 0.082,
    borderTopLeftRadius: SIZES.width * 0.082,
    marginTop: SIZES.width * 0.077,
    paddingTop: SIZES.width * 0.072,
    paddingHorizontal: SIZES.width * 0.051,
  },
  title: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: SIZES.width * 0.051,
    color: '#000',
  },
  description: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.036,
    color: '#000',
  },
  dividerText: {
    position: 'absolute',
    top: -SIZES.width * 0.026,
    backgroundColor: '#EDD498',
    paddingHorizontal: SIZES.width * 0.026,
    fontFamily: 'KantumruyPro-Regular',
    color: COLORS.black,
  },
  dividerline: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '100%',
  },
  dividerContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: SIZES.width * 0.026,
  },
  linkText: {
    color: '#F39200',
    textDecorationLine: 'underline',
  },
  maincontainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.02,
    backgroundColor: '#FFB443',
    borderRadius: SIZES.width * 0.039,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: SIZES.width * 0.01,
  },
  buttontitle: {
    fontFamily: 'KantumruyPro-Regular',
    color: COLORS.black,
    fontSize: SIZES.width * 0.041,
  },
});
