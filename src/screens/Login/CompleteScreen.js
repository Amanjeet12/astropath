/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import Custombutton from '../../components/Custombutton';

const CompleteScreen = () => {
  console.log(SIZES.width * 0.75);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <View style={styles.mainContainer}>
        <View
          style={{
            marginTop: SIZES.width * 0.077,
            height: SIZES.width * 0.75,
            width: '100%',
          }}>
          <Image
            source={images.cpmplete_profile}
            style={{
              width: SIZES.width,
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: SIZES.width * 0.077}}>
          <Text style={styles.title}>Register Successful</Text>
          <Text style={[styles.description, {textAlign: 'center'}]}>
            You can now open Dashboard and connect{'\n'} to different
            astrologers for purpose
          </Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.width * 0.051,
          width: '100%',
          paddingHorizontal: SIZES.width * 0.051,
        }}>
        <Custombutton placeholder={'Go to home'} screen={'BottomTabScreen'} />
      </View>
    </SafeAreaView>
  );
};

export default CompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  title: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: SIZES.width * 0.077,
    color: '#000',
  },
  description: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.036,
    color: '#000',
    marginTop: SIZES.width * 0.026,
    lineHeight: SIZES.width * 0.057,
  },
});
