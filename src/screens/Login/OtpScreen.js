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
        <View style={{height: SIZES.height}}>
          <View style={{marginTop: 30, height: '40%', width: '100%'}}>
            <Image
              source={images.otp_image}
              style={{
                width: SIZES.width,
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>

          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.title}>OTP Verification</Text>
              <Text style={styles.description}>
                An 4 digit code has been sent to your number
              </Text>
            </View>

            <View style={{marginTop: 30}}>
              <Otptextinput />
            </View>
            <View style={{marginTop: 10}}>
              <Custombutton
                placeholder={'Verify OTP'}
                screen={'CompleteProfile'}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={[styles.description, {textAlign: 'center'}]}>
                If you didn't receive a code!{' '}
                <Text style={styles.linkText}>Resend</Text>
              </Text>
            </View>

            <View style={{marginTop: 40}}>
              <CustomeIconButton
                icon={images.mobile_Icon}
                placeholder={'Change phone number'}
              />
            </View>
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
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    marginTop: 30,
    paddingTop: 28,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: 20,
    color: '#000',
  },
  description: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: 14,
    color: '#000',
  },
  linkText: {
    color: '#F39200',
    textDecorationLine: 'underline',
  },
});
