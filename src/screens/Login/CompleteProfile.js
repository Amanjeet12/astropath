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
import CustomeIconButton from '../../components/CustomeIconButton';
import Otptextinput from '../../components/Otptextinput';
import Commontextinput from '../../components/Commontextinput';
import Dobtextinput from '../../components/Dobtextinput';
import TimePickerComponent from '../../components/TimePickerComponent';
import Locationtextinput from '../../components/Locationtextinput';

const CompleteProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: SIZES.height + 50}}>
          <View style={{marginTop: 30, height: '40%', width: '100%'}}>
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
            <View style={{marginTop: 20}}>
              <Commontextinput placeholder={'Enter your name'} />
            </View>
            <View style={{marginTop: 20}}>
              <Dobtextinput placeholder={'Select Date of Birth'} />
            </View>
            <View style={{marginTop: 20}}>
              <Locationtextinput placeholder={'Enter place of birth'} />
            </View>
            <View style={{marginTop: 20}}>
              <TimePickerComponent
                placeholder={'Enter Time of Birth eg - 10h : 10m '}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
              }}>
              <View style={{width: '63%'}}>
                <Custombutton
                  placeholder={'Save and Proceed'}
                  screen={'CompleteScreen'}
                />
              </View>
              <TouchableOpacity style={styles.skipButton}>
                <Text style={[styles.description, {fontSize: 16}]}>Skip</Text>
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
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    marginTop: 30,
    paddingTop: 28,
    paddingHorizontal: 20,
    height: '70%',
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
  skipButton: {
    width: '30%',
    height: 50,
    marginTop: 10,
    borderRadius: 7,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
