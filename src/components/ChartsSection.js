/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../constant';
import {SIZES} from '../constant/theme';
import WebMethods from '../screens/api/WebMethods';
import WebUrls from '../screens/api/WebUrls';
import {SvgXml} from 'react-native-svg';
import Preferences from '../screens/api/Preferences';

const ChartsSection = ({name, value, showDateTime, showDate, lat, lon}) => {
  const [love_chart, setLove_chart] = useState('');
  const [lagan_chart, setLagan_chart] = useState('');
  const [marraige_chart, setMarraige_chart] = useState('');
  const [loading, setLoading] = useState(true);
  const [hour, minute] = showDateTime.split(':');

  // Parse date to get day, month, and year
  const [day, month, year] = showDate.split('/'); // in mobile

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let token;
      try {
        token = await Preferences.getPreferences(Preferences.key.Token);
      } catch (error) {
        console.error('Error getting latitude and longitude:', error);
        return;
      }

      if (token) {
        const params = {
          name,
          day,
          month,
          year,
          hour,
          min: minute,
          lat: lat,
          lon: lon,
          tzone: '5.5',
        };

        WebMethods.postRequestWithHeader(
          WebUrls.url.lagan_chart,
          params,
          token,
        ).then(response => {
          setLagan_chart(response.data.svg);
        });
      } else {
        console.log('Latitude, longitude, or token is null');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {lagan_chart && (
        <>
          <View style={styles.flexBox}>
            <View>
              <Text style={styles.title}>Lagan Chart</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={{marginTop: SIZES.width * 0.026}}>
            <View>
              <SvgXml
                xml={lagan_chart}
                width="100%"
                height={SIZES.width * 0.9}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default ChartsSection;

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.width * 0.051,
    color: '#171532',
    fontFamily: 'KantumruyPro-Regular',
  },
  dropdown: {
    height: SIZES.width * 0.102,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: SIZES.width * 0.021,
    borderRadius: SIZES.width * 0.01,
  },
  placeholderStyle: {
    fontSize: SIZES.width * 0.031,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: SIZES.width * 0.031,
    color: 'grey',
  },
  iconStyle: {
    width: SIZES.width * 0.051,
    height: SIZES.width * 0.051,
  },
  inputSearchStyle: {
    height: SIZES.width * 0.051,
    fontSize: SIZES.width * 0.031,
    color: 'grey',
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    height: 1,
    borderWidth: 0.5,
    borderColor: '#F39200',
    marginTop: SIZES.width * 0.013,
  },
  description: {
    fontSize: SIZES.width * 0.041,
    fontFamily: 'KantumruyPro-Regular',
    color: '#000',
    lineHeight: SIZES.width * 0.062,
  },
});
