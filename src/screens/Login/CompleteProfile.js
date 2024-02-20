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
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../../constant/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {images} from '../../constant';
import Custombutton from '../../components/Custombutton';
import Commontextinput from '../../components/Commontextinput';
import Dobtextinput from '../../components/Dobtextinput';
import TimePickerComponent from '../../components/TimePickerComponent';
import Locationtextinput from '../../components/Locationtextinput';

const CompleteProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: SIZES.height + SIZES.width * 0.13}}>
          <View
            style={{
              marginTop: SIZES.width * 0.026,
              height: '40%',
              width: '100%',
            }}>
            <Image
              source={images.profile_image}
              style={{
                width: SIZES.width,
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>

          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.title}>Complete Your Profile</Text>
              <Text style={styles.description}>
                We just need a quick survey for your profile
              </Text>
            </View>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <Commontextinput placeholder={'Enter your name'} />
            </View>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <Dobtextinput placeholder={'Select Date of Birth'} />
            </View>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <Locationtextinput placeholder={'Enter place of birth'} />
            </View>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <TimePickerComponent
                placeholder={'Enter Time of Birth eg - 10h : 10m '}
              />
            </View>
            <View
              style={{
                marginTop: SIZES.width * 0.026,
                flexDirection: 'row',
                alignItems: 'center',
                gap: SIZES.width * 0.039,
              }}>
              <View style={{width: '63%'}}>
                <Custombutton
                  placeholder={'Save and Proceed'}
                  screen={'CompleteScreen'}
                />
              </View>
              <TouchableOpacity style={styles.skipButton}>
                <Text
                  style={[styles.description, {fontSize: SIZES.width * 0.041}]}>
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    width: SIZES.width,
    backgroundColor: '#EDD498',
    borderTopRightRadius: SIZES.width * 0.08,
    borderTopLeftRadius: SIZES.width * 0.08,
    marginTop: SIZES.width * 0.077,
    paddingTop: SIZES.width * 0.072,
    paddingHorizontal: SIZES.width * 0.051,
    height: '70%',
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
  skipButton: {
    width: '30%',
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.026,
    borderRadius: SIZES.width * 0.018,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
