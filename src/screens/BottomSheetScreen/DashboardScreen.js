/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import {images} from '../../constant';
import {Astrologer, Blog, Horoscope} from '../../constant/data';
import HoroscopeSection from '../../components/HoroscopeSection';
import BlogSection from '../../components/BlogSection';
import PanchangSection from '../../components/PanchangSection';
import KundliSecion from '../../components/KundliSecion';
import ShowPopUp from '../../components/ShowPopUp';
import AdvancePanchangSection from '../../components/AdvancePanchangSection';
import AstrologerComponent from '../../components/AstrologerComponent';

const DashboardScreen = () => {
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.mainContainer}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <PanchangSection refreshing={refreshing} />
            </View>
            <View style={{marginTop: SIZES.width * 0.03}}>
              <KundliSecion />
            </View>
            <View style={{marginTop: SIZES.width * 0.01}}>
              <AdvancePanchangSection />
            </View>
          </View>
          <View style={[styles.mainContainer, {marginTop: SIZES.width * 0.03}]}>
            <Text style={[styles.tagLine, {marginBottom: 10}]}>
              Recent Astrologer
            </Text>
            <AstrologerComponent data={Astrologer} />
          </View>
          <View style={[styles.mainContainer, {marginTop: SIZES.width * 0.03}]}>
            <HoroscopeSection
              data={Horoscope}
              refresh={refresh}
              refreshing={refreshing}
            />
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
