import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import WebMethods from '../screens/api/WebMethods';
import WebUrls from '../screens/api/WebUrls';
import {SIZES} from '../constant/theme';
import TableComponent from './TableComponent';

const BasicSection = () => {
  const [panchang, setPanchang] = useState(null);
  const [astroDetail, setAstroDetail] = useState(null);
  const [manglik_report, setManglik_report] = useState(null);
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

      const [panchangData, astroDetailData, manglikReportData] =
        await Promise.all([
          WebMethods.postRequestWithHeader(
            WebUrls.url.basic_panchang,
            params,
            token,
          ),
          WebMethods.postRequestWithHeader(
            WebUrls.url.astro_details,
            params,
            token,
          ),
          WebMethods.postRequestWithHeader(
            WebUrls.url.manglik_report,
            params,
            token,
          ),
        ]);

      setPanchang(panchangData.data);
      setAstroDetail(astroDetailData.data);
      setManglik_report(manglikReportData.data.manglik_report);
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
      {panchang && (
        <>
          <View style={styles.flexBox}>
            <Text style={styles.title}>Panchang Details</Text>
          </View>
          <View style={styles.border} />
          <View style={{marginTop: SIZES.width * 0.051}}>
            <TableComponent data={panchang} />
          </View>
        </>
      )}
      {manglik_report && (
        <>
          <View style={[styles.flexBox, {marginTop: SIZES.width * 0.051}]}>
            <Text style={styles.title}>Mangalik report</Text>
          </View>
          <View style={styles.border} />
          <View style={{marginVertical: SIZES.width * 0.051}}>
            <Text style={styles.description}>{manglik_report}</Text>
          </View>
        </>
      )}
      {astroDetail && (
        <>
          <View style={[styles.flexBox, {marginTop: SIZES.width * 0.051}]}>
            <Text style={styles.title}>Astro Details</Text>
          </View>
          <View style={styles.border} />
          <View style={{marginVertical: SIZES.width * 0.051}}>
            <TableComponent data={astroDetail} />
          </View>
        </>
      )}
    </>
  );
};

export default BasicSection;

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.width * 0.051,
    color: '#171532',
    fontFamily: 'KantumruyPro-Regular',
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
  },
});
