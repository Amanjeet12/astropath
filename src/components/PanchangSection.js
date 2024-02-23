/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '../constant';
import {SIZES} from '../constant/theme';

const PanchangSection = () => {
  const getOrdinalSuffix = day => {
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
  };

  const date = new Date();
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = days[date.getDay()];
  const month = date.toLocaleString('default', {month: 'short'});
  const dayOfMonth = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

  const formattedDate = `${dayOfMonth}${ordinalSuffix} ${month} 2024`;
  console.log(SIZES.height * 0.43);

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

  // Usage
  const repeatedData = [
    {label: 'Tithi', value: 'Krishna Pratipda'},
    {label: 'Nakshatra', value: 'Vishakha'},
    {label: 'Yog', value: 'Variyaan'},
    {label: 'Karan', value: 'Baalav'},
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.text1}>Panchang</Text>
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
          THU
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
          <Text style={styles.text2}>Vedic Sunrise</Text>
          <Text style={{color: '#000'}}>“09:20:19”</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Image source={images.sunset_icon} style={styles.icon} />
          <Text style={styles.text2}>Vedic Sunrise</Text>
          <Text style={{color: '#000'}}>“09:20:19”</Text>
        </View>
      </View>
      <View style={{marginTop: SIZES.width * 0.034}}>
        {renderRepeatedData(repeatedData)}
        <View style={{position: 'absolute', bottom: 0, right: 0}}>
          <Image
            source={images.god_icon}
            style={{
              width: SIZES.width * 0.23,
              height: SIZES.width * 0.24,
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PanchangSection;

const styles = StyleSheet.create({
  mainContainer: {
    height: SIZES.height * 0.42,
    borderWidth: 1,
    borderRadius: SIZES.width * 0.077,
    padding: SIZES.width * 0.051,
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
