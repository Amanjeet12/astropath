/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../../constant/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {images} from '../../constant';
import Custombutton from '../../components/Custombutton';
import CustomeIconButton from '../../components/CustomeIconButton';
import Otptextinput from '../../components/Otptextinput';

const OtpScreen = () => {
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

        <View style={[styles.bottomContainer, {height: SIZES.height / 1.9}]}>
          <View>
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.description}>
              An 4 digit code has been sent to your number
            </Text>
          </View>

          <View style={{marginTop: SIZES.width * 0.077}}>
            <Otptextinput />
          </View>
          <View style={{marginTop: SIZES.width * 0.026}}>
            <Custombutton
              placeholder={'Verify OTP'}
              screen={'CompleteProfile'}
            />
          </View>
          <View style={{marginTop: SIZES.width * 0.051}}>
            <Text style={[styles.description, {textAlign: 'center'}]}>
              If you didn't receive a code!{' '}
              <Text style={styles.linkText}>Resend</Text>
            </Text>
          </View>

          <View style={{marginTop: SIZES.width * 0.102}}>
            <CustomeIconButton
              icon={images.mobile_Icon}
              placeholder={'Change phone number'}
            />
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
});
