/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../constant/theme';
import {images} from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Zodiac} from '../constant/data';
import WebMethods from '../screens/api/WebMethods';
import WebUrls from '../screens/api/WebUrls';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import Preferences from '../screens/api/Preferences';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const HoroscopeSection = ({data, refresh, refreshing}) => {
  const focused = useIsFocused();
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [todayHoroscope, setTodayHoroscope] = useState('');
  const [loading, setLoading] = useState(true);

  console.log('refreshingb', refreshing);

  const fetchData = async () => {
    try {
      const zodicNumber = await AsyncStorage.getItem('Zodic');
      if (zodicNumber !== null) {
        const selectedItemnumber = parseInt(zodicNumber);
        setSelectedItem(selectedItemnumber);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('refreshing');
    fetchData();
  }, [focused, refresh]);

  useEffect(() => {
    if (selectedItem !== null && Zodiac[selectedItem] !== undefined) {
      fetchHeroscope();
    }
  }, [selectedItem]);

  useEffect(() => {
    if (refreshing) {
      fetchHeroscope();
    }
  }, [refreshing]);

  const fetchHeroscope = async () => {
    setLoading(true);
    try {
      const params = {
        zodiacName: Zodiac[selectedItem].title,
        tzone: '5.5',
      };

      const token = await Preferences.getPreferences(Preferences.key.Token);

      WebMethods.postRequestWithHeader(
        WebUrls.url.today_horoscope,
        params,
        token,
      ).then(response => {
        if (response.data != null) {
          setTodayHoroscope(response.data);
        } else {
          console.log('error');
        }
        setLoading(false);
      });
    } catch (error) {
      console.log('erroring', error);
      setLoading(false);
    }
  };

  const handleNavigaion = () => {
    navigation.navigate('HoroscopeScreen', {todayHoroscope, selectedItem});
  };

  return (
    <>
      {loading ? (
        <ShimmerPlaceHolder
          style={{
            height: SIZES.width * 0.6,
            width: '100%',
            marginBottom: 10,
            borderRadius: 10,
          }}
          shimmerColors={['#fae3d2', '#FFD0AC', '#FFD0AC']}
          visible={!loading}></ShimmerPlaceHolder>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: SIZES.width * 0.051,
            }}>
            <View>
              <Image
                source={selectedItem ? Zodiac[selectedItem].image : data.image}
                style={{
                  width: SIZES.width * 0.205,
                  height: SIZES.width * 0.205,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{paddingTop: SIZES.width * 0.026}}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.date}>
                {todayHoroscope.prediction_date
                  ? todayHoroscope.prediction_date
                  : null}
              </Text>
            </View>
          </View>
          <View style={{marginTop: SIZES.width * 0.02}}>
            <Text style={styles.description} numberOfLines={4}>
              {todayHoroscope.prediction
                ? todayHoroscope.prediction.emotions
                : null}
            </Text>
          </View>
          <View
            style={{alignItems: 'flex-end', marginTop: SIZES.width * 0.026}}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleNavigaion()}>
              <Text style={styles.buttonText}>View more</Text>
              <Image
                source={images.button_icon}
                style={{
                  width: SIZES.width * 0.039,
                  height: SIZES.width * 0.039,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default HoroscopeSection;

const styles = StyleSheet.create({
  container: {
    height: SIZES.width * 0.6,
    backgroundColor: '#fae3d2',
    borderRadius: SIZES.width * 0.039,
    marginBottom: SIZES.width * 0.051,
    padding: SIZES.width * 0.051,
  },
  title: {
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: SIZES.width * 0.046,
    color: COLORS.black,
  },
  date: {
    fontFamily: 'KantumruyPro-Regular',
    lineHeight: SIZES.width * 0.064,
    color: COLORS.black,
    fontSize: SIZES.width * 0.031,
  },
  description: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.031,
    color: '#444444',
    // lineHeight: SIZES.width * 0.044,
  },
  buttonContainer: {
    width: 150,
    paddingHorizontal: SIZES.width * 0.051,
    paddingVertical: SIZES.width * 0.021,
    borderWidth: 1,
    borderRadius: SIZES.width * 0.077,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.width * 0.013,
    backgroundColor: '#FFB443',
    justifyContent: 'center',
    borderColor: '#843c14',
  },
  buttonText: {
    fontWeight: '600',
    color: COLORS.black,
  },
});
