/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SIZES} from '../constant/theme';
import TableComponent from './TableComponent';

const BasicSection = ({panchang, manglik_report, astroDetail, loading}) => {
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
          <View style={[styles.flexBox]}>
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
          <View
            style={[
              styles.mangalikContainer,
              {borderColor: manglik_report.is_present ? 'red' : 'green'},
            ]}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: manglik_report.is_present ? 'red' : 'green',
              }}>
              {manglik_report.is_present ? (
                <View>
                  <Text style={{color: '#fff', textTransform: 'uppercase'}}>
                    Yes
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={{color: '#fff', textTransform: 'uppercase'}}>
                    No
                  </Text>
                </View>
              )}
            </View>
            <View style={{width: '75%'}}>
              <Text
                style={[
                  styles.description,
                  {
                    fontSize: SIZES.width * 0.04,
                    color: manglik_report.is_present ? 'red' : 'green',
                    fontWeight: '700',
                  },
                ]}>
                {manglik_report?.manglik_status === 'EFFECTIVE'
                  ? 'EFFECTIVE'
                  : 'NO EFFECTIVE'}
              </Text>
              <Text style={styles.description}>
                {manglik_report?.manglik_report}
              </Text>
            </View>
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
    fontSize: SIZES.width * 0.031,
    fontFamily: 'KantumruyPro-Regular',
    color: '#000',
  },
  mangalikContainer: {
    marginVertical: SIZES.width * 0.051,
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    height: 100,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});
