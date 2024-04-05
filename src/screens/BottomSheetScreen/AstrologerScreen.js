import {
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../../constant';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import Preferences from '../api/Preferences';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import AstrologerComponent from '../../components/AstrologerComponent';
import {useIsFocused} from '@react-navigation/native';

const AstrologerScreen = () => {
  const IsFocused = useIsFocused();
  const [astrologer, setAstrolger] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    fetchAstrologer();
  }, [refreshing]);

  const fetchAstrologer = async () => {
    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        const response = await WebMethods.getRequestWithHeader(
          WebUrls.url.fetchAstrologer,
          token,
        );
        if (response != null) {
          console.log('response===>', response.data);
          setAstrolger(response.data);
        } else {
          console.log('error');
        }
      }
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };

  return (
    <>
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
            <View style={{marginTop: SIZES.width * 0.051}}>
              <Text style={styles.tagLine}>All Astrologer</Text>
              <View style={{marginTop: 30}}>
                {astrologer ? (
                  <AstrologerComponent data={astrologer} />
                ) : (
                  <View>
                    <ActivityIndicator size={'small'} color={COLORS.black} />
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default AstrologerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  tagLine: {
    fontSize: SIZES.width * 0.051,
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
    textTransform: 'capitalize',
  },
});
