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
import Flagtextinput from '../../components/Flagtextinput';
import Custombutton from '../../components/Custombutton';
import CustomeIconButton from '../../components/CustomeIconButton';

const LoginScreen = () => {
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
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: SIZES.height}}>
          <View style={{marginTop: 30, height: '40%', width: '100%'}}>
            <Image
              source={images.login_image}
              style={{
                width: SIZES.width,
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>

          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.title}>Hi Welcome!</Text>
              <Text style={styles.description}>Submit your mobile number</Text>
            </View>
            <View style={{marginTop: 10}}>
              <Divider Placeholder={'Log in or Sign up'} />
            </View>

            <View style={{marginTop: 15}}>
              <Flagtextinput />
            </View>
            <View style={{marginTop: 10}}>
              <Custombutton placeholder={'SEND OTP'} screen={'OtpScreen'} />
            </View>
            <View style={{marginTop: 20}}>
              <Divider Placeholder={'or'} />
            </View>
            <View style={{marginTop: 20}}>
              <CustomeIconButton
                icon={images.mail_Icon}
                placeholder={'Continue with email id'}
              />
            </View>
            <View style={{marginTop: 13}}>
              <Text style={[styles.description, {lineHeight: 21.5}]}>
                By signing up, you agree to our{' '}
                <Text style={styles.linkText}>Terms of Use </Text> and
                <Text style={styles.linkText}> Privacy Policy </Text>
              </Text>
            </View>
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
  dividerText: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#EDD498',
    paddingHorizontal: 10,
    fontFamily: 'KantumruyPro-Regular',
    color: COLORS.black,
  },
  dividerline: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '100%',
  },
  dividerContainer: {width: '100%', alignItems: 'center', marginVertical: 10},
  linkText: {
    color: '#F39200',
    textDecorationLine: 'underline',
  },
});
