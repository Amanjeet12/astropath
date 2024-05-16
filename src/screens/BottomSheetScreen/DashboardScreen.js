/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import {images} from '../../constant';
import {Horoscope} from '../../constant/data';
import HoroscopeSection from '../../components/HoroscopeSection';
import BlogSection from '../../components/BlogSection';
import PanchangSection from '../../components/PanchangSection';
import KundliSecion from '../../components/KundliSecion';
import AdvancePanchangSection from '../../components/AdvancePanchangSection';
import AstrologerComponent from '../../components/AstrologerComponent';
import {useTranslation} from 'react-i18next';
import {fetchWalletbalance} from '../../redux/WalletBalanceSlice';
import Preferences from '../api/Preferences';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllBlogs} from '../../redux/blogSlice';
import WebUrls from '../api/WebUrls';
import WebMethods from '../api/WebMethods';
import FeatureAstrologerComponent from '../../components/FeatureAstrologerComponent';
import OneSignal from 'react-native-onesignal';
import {fetchBanner} from '../../redux/BannerSlice';
import BannerSection from '../../components/BannerSection';
import NetInfo from '@react-native-community/netinfo';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const {isData} = useSelector(state => state.blog);
  const {data} = useSelector(state => state.banner);
  const [topAstrologers, setTopAstrologers] = useState([]);
  const [playerId, setPlayerId] = useState('');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      handleWalletBalance();
      handleBlog();
      handleTopAstrologer();
    }, 2000);
  };

  const checkConnectivity = async () => {
    const state = await NetInfo.fetch();
    const isConnected = state.isConnected;
    if (!isConnected) {
      ToastAndroid.showWithGravity(
        'No internet connection',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
    return isConnected;
  };

  const handleWalletBalance = async () => {
    try {
      const isConnected = await checkConnectivity();
      if (!isConnected) {
        console.warn('No internet connection: Skipping wallet balance fetch');
        return;
      }

      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        dispatch(fetchWalletbalance(token));
      }
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };

  const handleBlog = async () => {
    try {
      const isConnected = await checkConnectivity();
      if (!isConnected) {
        console.warn('No internet connection: Skipping blog fetch');
        return;
      }

      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        dispatch(fetchAllBlogs(token));
        dispatch(fetchBanner(token));
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleTopAstrologer = async () => {
    try {
      const isConnected = await checkConnectivity();
      console.log('isConnected', isConnected);
      if (!isConnected) {
        console.warn('No internet connection: Skipping top astrologers fetch');
        return;
      }

      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        const response = await WebMethods.getRequestWithHeader(
          WebUrls.url.fetch_Top_All_Astrologer,
          token,
        );
        if (response !== null) {
          setTopAstrologers(response.data);
        } else {
          console.log('Error fetching top astrologers');
        }
      }
    } catch (error) {
      console.error('Error handling top astrologers:', error);
    }
  };

  const fetchAndSetOneSignalId = async () => {
    try {
      const deviceState = await OneSignal.getDeviceState();
      if (deviceState?.userId) {
        setPlayerId(deviceState.userId);
        const userId = await Preferences.getPreferences(Preferences.key.UserId);
        await OneSignal.setExternalUserId(userId);
      } else {
        console.warn('OneSignal: Unable to fetch Player ID');
      }
    } catch (error) {
      console.error('Error fetching OneSignal IDs:', error);
    }
  };

  useEffect(() => {
    handleWalletBalance();
    handleBlog();
    handleTopAstrologer();
  }, [refreshing]);

  useEffect(() => {
    fetchAndSetOneSignalId();
  }, []);

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
              <BannerSection data={data} set={0} />
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
          {topAstrologers.length > 0 && (
            <View
              style={[styles.mainContainer, {marginTop: SIZES.width * 0.03}]}>
              <Text style={[styles.tagLine, {marginBottom: 10}]}>
                {t('Top Astrologers')}
              </Text>
              <FeatureAstrologerComponent data={topAstrologers} />
            </View>
          )}
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
