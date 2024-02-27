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
import Custombutton from '../../components/Custombutton';
import CustomeIconButton from '../../components/CustomeIconButton';
import Otptextinput from '../../components/Otptextinput';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import Preferences from '../api/Preferences';
import {err} from 'react-native-svg';
import {useAuth} from '../../constant/Auth';

const OtpScreen = ({navigation, route}) => {
  const {orderId, phoneNumber} = route.params;
  console.log(orderId, phoneNumber);
  const [otp, setOtp] = useState('');
  const {login} = useAuth();

  const handleOtp = number => {
    setOtp(number);
  };

  const handleResendOption = () => {
    try {
      var params = {
        orderId: orderId,
      };

      WebMethods.postRequest(WebUrls.url.resend_otp, params).then(response => {
        if (response.data != null) {
          const newOrderId = response.data.orderId;
          console.log(newOrderId);
        }
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOtpVerification = () => {
    const phone = '+91' + phoneNumber;
    try {
      var params = {
        orderId: orderId,
        otp: otp,
        phone: phone,
      };
      WebMethods.postRequest(WebUrls.url.verify_otp, params).then(
        async response => {
          if (response.payload.error) {
            Alert.alert(response.payload.error);
          } else {
            console.log(response);
            try {
              await Preferences.savePreferences(
                Preferences.key.UserId,
                response.id,
              );
              await Preferences.savePreferences(
                Preferences.key.Token,
                response.jwt_token,
              );
              await Preferences.savePreferences(Preferences.key.phone, phone);
              login();
            } catch {
              console.log('error in saving data');
            }
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: SIZES.height / 2.5,
          }}>
          <Image
            source={images.otp_image}
            style={{
              width: SIZES.width,
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>

        <View style={[styles.bottomContainer, {height: SIZES.height / 1.7}]}>
          <View>
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.description}>
              An 4 digit code has been sent to your number
            </Text>
          </View>

          <View style={{marginTop: SIZES.width * 0.077}}>
            <Otptextinput onOtpFilled={handleOtp} />
          </View>
          <View style={{marginTop: SIZES.width * 0.026}}>
            <TouchableOpacity
              style={styles.maincontainer}
              onPress={() => handleOtpVerification()}>
              <Text style={styles.buttontitle}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <Text style={[styles.description, {textAlign: 'center'}]}>
                If you didn't receive a code!{' '}
              </Text>
            </View>
            <TouchableOpacity
              style={{marginTop: SIZES.width * 0.04}}
              onPress={handleResendOption}>
              <Text style={styles.linkText}>Resend</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: SIZES.width * 0.102}}>
            <TouchableOpacity
              style={styles.mainContainer}
              onPress={() => navigation.goBack()}>
              <View style={styles.boxContainer}>
                <View style={styles.imageContainer}>
                  <Image source={images.mobile_Icon} style={styles.image} />
                </View>
                <View style={{width: '70%'}}>
                  <Text style={styles.title2}>{'Change phone number'}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    width: SIZES.width,
    height: '70%',
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
  mainContainer: {
    height: SIZES.width * 0.13,
    borderWidth: 2,
    borderRadius: SIZES.width * 0.039,
  },
  boxContainer: {flexDirection: 'row', alignItems: 'center', height: '100%'},
  imageContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZES.width * 0.077,
    height: SIZES.width * 0.077,
    resizeMode: 'contain',
  },
  title2: {
    fontFamily: 'KantumruyPro-Regular',
    color: '#000',
    fontSize: SIZES.width * 0.036,
  },
});
