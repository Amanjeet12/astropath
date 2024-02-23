/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';

const SingleAstrologer = ({route}) => {
  const {item} = route.params;
  console.log(item);
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
            <View style={{width: SIZES.width * 0.65}}>
              <BackButton placeholder={'Astrologer'} />
            </View>
            <View
              style={{
                width: '100%',
                height: 220,
                borderWidth: 1,
                marginTop: 30,
                borderRadius: 10,
                backgroundColor: '#fff',
                padding: SIZES.width * 0.039,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '40%'}}>
                  <View>
                    <Image source={item.profile} style={styles.profile} />
                    <View
                      style={{
                        position: 'absolute',
                        bottom: SIZES.width * 0.051,
                        right: 10,
                      }}>
                      <Image
                        source={images.verified_icon}
                        style={{
                          width: SIZES.width * 0.06,
                          height: SIZES.width * 0.06,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <View style={styles.ratingContainer}>
                      <Image
                        source={images.star_icon}
                        style={{
                          width: SIZES.width * 0.051,
                          height: SIZES.width * 0.051,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text style={{color: 'grey'}}>5</Text>
                    </View>
                  </View>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={styles.profile_name}>{item.name}</Text>
                  <View style={styles.flexBox}>
                    <Image source={images.location_icon} style={styles.icon} />
                    <Text style={styles.profile_categories}>
                      {item.categories}
                    </Text>
                  </View>
                  <View style={[styles.flexBox, {marginTop: 3}]}>
                    <Image source={images.location_icon} style={styles.icon} />

                    <Text style={styles.profile_language}>{item.language}</Text>
                  </View>
                  <View style={[styles.flexBox, {marginTop: 3}]}>
                    <Image source={images.location_icon} style={styles.icon} />
                    <Text style={styles.profile_experience}>
                      {item.experience} Years
                    </Text>
                  </View>

                  <Text style={styles.profile_rate}>
                    ₹ {item.rate}/min -Chat
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default SingleAstrologer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  profile: {
    width: SIZES.width * 0.3,
    height: SIZES.width * 0.26,
    resizeMode: 'contain',
  },
  profile_name: {
    color: COLORS.black,
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: 18,
  },
  profile_categories: {
    color: '#707B81',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.031,
    paddingTop: 3,
  },
  profile_language: {
    color: '#0D6EFD',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.021,
  },
  profile_experience: {
    color: '#707B81',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.026,
  },
  profile_rate: {
    color: '#000',
    fontFamily: 'KantumruyPro-Bold',
    fontSize: SIZES.width * 0.031,
    paddingTop: 5,
  },
  ratingContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.width * 0.026,
    borderRadius: SIZES.width * 0.026,
    paddingVertical: 3,
    bottom: -SIZES.width * 0.026,
    elevation: 3,
    left: SIZES.width * 0.1,
  },
  flexBox: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    gap: 5,
  },
  icon: {width: 15, height: 15, resizeMode: 'contain'},
});
