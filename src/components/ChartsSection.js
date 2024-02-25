/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {images} from '../constant';
import {SIZES} from '../constant/theme';
import WebMethods from '../screens/api/WebMethods';
import WebUrls from '../screens/api/WebUrls';
import {SvgXml} from 'react-native-svg';

const ChartsSection = () => {
  const [love_chart, setLove_chart] = useState('');
  const [lagan_chart, setLagan_chart] = useState('');
  const [marraige_chart, setMarraige_chart] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdXBlcl9hZG1pbl91c2VyX2lkIjpudWxsLCJhc3Ryb2xvZ2VyX3VzZXJfaWQiOm51bGwsImN1c3RvbWVyX3VzZXJfaWQiOiI2NWRhZWIxZDEyYjlhYTQ3Mjk2YTg1YjgiLCJpYXQiOjE3MDg4NDU4NTN9.BnuhdqU2HBfnK4pyCBEYVr3bDnezteegc-hQnNHzEow';
      const params = {
        name: 'amanjeet',
        day: '1',
        month: '2',
        year: '2000',
        hour: '1',
        min: '12',
        lat: '12.123',
        lon: '123',
        tzone: '5.5',
      };

      const [laganData, loveData, marraigeData] = await Promise.all([
        WebMethods.postRequestWithHeader(
          WebUrls.url.lagan_chart,
          params,
          token,
        ),
        WebMethods.postRequestWithHeader(WebUrls.url.life_chart, params, token),
        WebMethods.postRequestWithHeader(
          WebUrls.url.marraige_chart,
          params,
          token,
        ),
      ]);

      setLagan_chart(laganData.data.svg);
      setLove_chart(loveData.data.svg);
      setMarraige_chart(marraigeData.data.svg);
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
      {love_chart && (
        <>
          <View style={[styles.flexBox, {marginTop: SIZES.width * 0.05}]}>
            <View>
              <Text style={styles.title}>love Chart</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={{marginTop: SIZES.width * 0.026}}>
            <View>
              <SvgXml
                xml={love_chart}
                width="100%"
                height={SIZES.width * 0.9}
              />
            </View>
          </View>
        </>
      )}
      {marraige_chart && (
        <>
          <View style={[styles.flexBox, {marginTop: SIZES.width * 0.05}]}>
            <View>
              <Text style={styles.title}>Marraige Chart</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={{marginTop: SIZES.width * 0.026}}>
            <View>
              <SvgXml
                xml={marraige_chart}
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
