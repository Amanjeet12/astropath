/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {images} from '../constant';
import {SIZES} from '../constant/theme';
import WebUrls from '../screens/api/WebUrls';
import WebMethods from '../screens/api/WebMethods';
import Preferences from '../screens/api/Preferences';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {useTranslation} from 'react-i18next';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const PanchangSection = ({refreshing}) => {
  const {t} = useTranslation();
  const [panchang, setPanchang] = useState('');
  const [loading, setLoading] = useState(true);
  const calledOnceRef = useRef(false);

  const getOrdinalSuffix = useCallback(day => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }, []);

  const getCurrentDateTime = useCallback(() => {
    const date = new Date();
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const ordinalSuffix = getOrdinalSuffix(date.getDate());
    const formattedDate = `${day}${ordinalSuffix} ${month} ${year}`;

    return {day, month, year, hour, minute, formattedDate};
  }, [getOrdinalSuffix]);

  const callPanchang = async () => {
    let latitude, longitude, token;

    try {
      const todayPanchang = await Preferences.getJsonPreferences(
        Preferences.horoscope.panchang,
      );
      latitude = await Preferences.getPreferences(Preferences.key.userLatitude);
      longitude = await Preferences.getPreferences(
        Preferences.key.userLongitude,
      );
      token = await Preferences.getPreferences(Preferences.key.Token);
      if (todayPanchang) {
        setPanchang(todayPanchang);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(true);
    try {
      const {day, month, year, hour, minute} = getCurrentDateTime();
      try {
      } catch (error) {
        console.error('Error getting latitude and longitude:', error);
      }

      if (token) {
        const params = {
          name: 'user',
          day,
          month,
          year,
          hour,
          min: minute,
          lat: latitude ? latitude : '28.7041',
          lon: longitude ? longitude : '77.1025',
          tzone: '5.5',
        };

        console.log(params);
        WebMethods.postRequestWithHeader(
          WebUrls.url.basic_panchang,
          params,
          token,
        ).then(async response => {
          if (response.data != null) {
            setPanchang(response.data);
            setLoading(false);
            try {
              await Preferences.saveJsonPerences(
                Preferences.horoscope.panchang,
                response.data,
              );
              console.log('done');
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log('error');
            setLoading(false);
          }
        });
      } else {
        console.log('Latitude, longitude, or token is null');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('refreshing');
    if (!calledOnceRef.current) {
      callPanchang();
      calledOnceRef.current = true;
    }
  }, [calledOnceRef, refreshing]);

  useEffect(() => {
    if (refreshing === true) {
      callPanchang();
    }
  }, [refreshing]);

  const renderRepeatedData = data => {
    return data.map((item, index) => (
      <View
        key={index}
        style={[styles.flexbox, {justifyContent: 'flex-start', marginTop: 3}]}>
        <Text style={styles.text3}>{item.label}-</Text>
        <Text style={[styles.text3, {color: '#696969'}]}>{item.value}</Text>
      </View>
    ));
  };

  const formattedDate = getCurrentDateTime().formattedDate;

  const repeatedData = [
    {label: t('Tithi'), value: panchang.tithi},
    {label: 'Nakshatra', value: panchang.nakshatra},
    {label: t('Yog'), value: panchang.yog},
    {label: t('Karan'), value: panchang.karan},
  ];

  return (
    <>
      {loading ? (
        <ShimmerPlaceHolder
          style={{
            height: SIZES.height * 0.42,
            width: '100%',
            marginBottom: 10,
            borderRadius: 5,
          }}
          shimmerColors={['#fae3d2', '#FFD0AC', '#FFD0AC']}
          visible={!loading}></ShimmerPlaceHolder>
      ) : (
        <ImageBackground
          source={images.panchangbg}
          style={[
            styles.mainContainer,
            {
              padding: SIZES.width * 0.051,
              borderWidth: 1,
            },
          ]}
          imageStyle={{
            borderRadius: 5,
            width: SIZES.width * 0.515,
            height: SIZES.height * 0.42,
            resizeMode: 'cover',
            position: 'absolute',
            left: SIZES.width * 0.385,
          }}>
          <View style={styles.mainContainer2}>
            <View style={styles.headerContainer}>
              <Text style={styles.text1}> {t('Panchang')}</Text>
              <Image
                source={images.sawastik_icon}
                style={{
                  width: SIZES.width * 0.064,
                  height: SIZES.width * 0.064,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: SIZES.width * 0.026,
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontFamily: 'DMSerifDisplay-Regular',
                  fontSize: SIZES.width * 0.0893,
                  color: '#F39200',
                }}>
                {panchang ? panchang.day : null}
              </Text>
              <Text
                style={{
                  fontFamily: 'KantumruyPro-Regular',
                  fontSize: SIZES.width * 0.036,
                  color: '#000',
                }}>
                {formattedDate}
              </Text>
            </View>
            <View style={styles.flexbox}>
              <View style={{alignItems: 'center'}}>
                <Image source={images.sunrise_icon} style={styles.icon} />
                <Text style={styles.text2}>{t('Vedic Sunrise')}</Text>
                <Text style={{color: '#000'}}>{panchang.vedic_sunrise}</Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <Image source={images.sunset_icon} style={styles.icon} />
                <Text style={styles.text2}>{t('Vedic Sunset')}</Text>
                <Text style={{color: '#000'}}>{panchang.vedic_sunset}</Text>
              </View>
            </View>
            <View style={{marginTop: SIZES.width * 0.034}}>
              {renderRepeatedData(repeatedData)}
              <View style={{position: 'absolute', bottom: 0, right: 0}}>
                <Image
                  source={images.kalash}
                  style={{
                    width: SIZES.width * 0.23,
                    height: SIZES.width * 0.24,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      )}
    </>
  );
};

export default PanchangSection;

const styles = StyleSheet.create({
  mainContainer: {
    width: SIZES.width - 40,
    height: SIZES.height * 0.42,
    borderRadius: 5,
    borderColor: '#843C14',
    backgroundColor: '#fff',
  },
  mainContainer2: {
    height: SIZES.height * 0.42,
    borderRadius: 5,
    borderColor: '#843C14',
  },
  headerContainer: {
    flexDirection: 'row',
    gap: SIZES.width * 0.026,
    alignItems: 'center',
    paddingBottom: SIZES.width * 0.026,
    borderBottomWidth: 0.5,
    borderColor: '#F39200',
  },
  text1: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.046,
    color: '#000',
  },
  text2: {
    fontSize: SIZES.width * 0.029,
    color: '#8A8A8A',
    marginTop: SIZES.width * 0.013,
  },
  icon: {
    width: SIZES.width * 0.115,
    height: SIZES.width * 0.115,
    resizeMode: 'contain',
  },
  flexbox: {
    flexDirection: 'row',
    gap: SIZES.width * 0.026,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZES.width * 0.026,
  },
  text3: {
    fontSize: SIZES.width * 0.039,
    fontFamily: 'KantumruyPro-Regular',
    color: '#000',
  },
});
