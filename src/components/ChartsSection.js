/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {SIZES} from '../constant/theme';
import {decode} from 'base-64'; // Import the base-64 library for decoding

const ChartsSection = ({
  birth_chart,
  Chathurthamasha_Chart,
  Panchmansha_Chart,
  Chalit_Chart,
  loading,
}) => {
  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {birth_chart && (
        <View style={styles.specifyContainer}>
          <View style={styles.flexBox}>
            <View>
              <Text style={styles.title}>Birth Chart</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={{marginTop: SIZES.width * 0.026}}>
            <View>
              <Image
                style={{
                  width: SIZES.width - 40,
                  height: 300,
                  resizeMode: 'contain',
                }}
                source={{uri: birth_chart}}
              />
            </View>
          </View>
        </View>
      )}
      {Panchmansha_Chart && (
        <View style={styles.specifyContainer}>
          <View style={styles.flexBox}>
            <View>
              <Text style={styles.title}>Panchmansha Chart</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={{marginTop: SIZES.width * 0.026}}>
            <View>
              <Image
                style={{
                  width: SIZES.width - 40,
                  height: 300,
                  resizeMode: 'contain',
                }}
                source={{uri: Panchmansha_Chart}}
              />
            </View>
          </View>
        </View>
      )}
      {Chalit_Chart && (
        <View style={styles.specifyContainer}>
          <View style={styles.flexBox}>
            <View>
              <Text style={styles.title}>Navamansha Chart</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={{marginTop: SIZES.width * 0.026}}>
            <View>
              <Image
                style={{
                  width: SIZES.width - 40,
                  height: 300,
                  resizeMode: 'contain',
                }}
                source={{uri: Chalit_Chart}}
              />
            </View>
          </View>
        </View>
      )}
      {Chathurthamasha_Chart && (
        <View style={styles.specifyContainer}>
          <View style={styles.flexBox}>
            <View>
              <Text style={styles.title}>Chathurthamasha Chart</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={{marginTop: SIZES.width * 0.026}}>
            <View>
              <Image
                style={{
                  width: SIZES.width - 40,
                  height: 300,
                  resizeMode: 'contain',
                }}
                source={{uri: Chathurthamasha_Chart}}
              />
            </View>
          </View>
        </View>
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
  specifyContainer: {
    backgroundColor: '#fff',
    paddingBottom: 30,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginTop: 10,
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
    marginTop: SIZES.width * 0.03,
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
