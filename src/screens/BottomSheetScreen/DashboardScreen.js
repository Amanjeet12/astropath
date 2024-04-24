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
import React, {useEffect, useState} from 'react';
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
import {useTranslation} from 'react-i18next';
import {fetchWalletbalance} from '../../redux/WalletBalanceSlice';
import Preferences from '../api/Preferences';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllBlogs} from '../../redux/blogSlice';
import {ZIMKit} from '@zegocloud/zimkit-rn';
import appConfig from '../../constant/KeyCenter';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const {isData} = useSelector(state => state.blog);
  console.log(isData);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    ZIMKit.init(appConfig.appID, appConfig.appSign);
    handleWalletBalance();
    handleBlog();
  }, [refreshing]);

  const handleWalletBalance = async () => {
    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        dispatch(fetchWalletbalance(token));
      }
    } catch {}
  };

  const handleBlog = async () => {
    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        dispatch(fetchAllBlogs(token));
      }
    } catch {
      console.log('error');
    }
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
          {/* <View style={[styles.mainContainer, {marginTop: SIZES.width * 0.03}]}>
            <Text style={[styles.tagLine, {marginBottom: 10}]}>
              {t('Top Astrologers')}
            </Text>
            <AstrologerComponent data={Astrologer} />
          </View> */}
          <View style={[styles.mainContainer, {marginTop: SIZES.width * 0.03}]}>
            <HoroscopeSection data={Horoscope} refreshing={refreshing} />
          </View>
          <View>
            <View style={[styles.mainContainer]}>
              <Text style={styles.tagLine}>{t('Latest Blogs')}</Text>
            </View>
            <View
              style={[styles.mainContainer, {marginTop: SIZES.width * 0.051}]}>
              <BlogSection data={isData} />
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
