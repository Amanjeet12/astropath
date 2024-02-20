/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import {images} from '../../constant';
import BannerSection from '../../components/BannerSection';
import SearchSection from '../../components/SearchSection';
import AstrologerType from '../../components/AstrologerType';
import {Astrologer, Blog, Horoscope, Slider} from '../../constant/data';
import AstrologerComponent from '../../components/AstrologerComponent';
import HoroscopeSection from '../../components/HoroscopeSection';
import BlogSection from '../../components/BlogSection';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />

      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <SearchSection placeholder={' Search Astrologer'} />
            </View>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <BannerSection />
            </View>
          </View>
          <View>
            <AstrologerType data={Slider} />
          </View>
          <View>
            <View
              style={[styles.mainContainer, {marginTop: SIZES.width * 0.051}]}>
              <Text style={styles.tagLine}>Features Astrologer</Text>
            </View>
            <View
              style={[styles.mainContainer, {marginTop: SIZES.width * 0.051}]}>
              <AstrologerComponent data={Astrologer} />
            </View>
          </View>
          <View style={styles.mainContainer}>
            <HoroscopeSection data={Horoscope} />
          </View>
          <View>
            <View style={[styles.mainContainer]}>
              <Text style={styles.tagLine}>Latest Blogs</Text>
            </View>
            <View
              style={[styles.mainContainer, {marginTop: SIZES.width * 0.051}]}>
              <BlogSection data={Blog} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  tagLine: {
    fontSize: SIZES.width * 0.046,
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
  },
});
