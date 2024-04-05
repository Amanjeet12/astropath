/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constant/theme';
import Icon from 'react-native-vector-icons/Entypo';

const OrderSection = ({data}) => {
  const fetchDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationInSeconds = (endTime - startTime) / 1000;
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    if (isNaN(minutes) || isNaN(seconds)) {
      return '0 sec';
    }

    return `${minutes} min ${seconds} sec`;
  };

  const formateDate = dateString => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    return formattedDate;
  };

  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <View key={index} style={styles.container}>
              <View>
                <Text style={styles.name}>{item.customerName}</Text>
                <Text style={styles.categories}>
                  date - {formateDate(item.date)}
                </Text>
                <Text style={styles.experience}>service -{item.service}</Text>
                <Text style={styles.experience}>status - {item.status}</Text>
                <Text style={styles.cost}>Total Cost -{item.cost}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <Text style={[styles.categories, {color: COLORS.black}]}>
                  Duration: {fetchDuration(item.startTime, item.endTime)}
                </Text>
                {item.rating && (
                  <TouchableOpacity style={styles.starContainer}>
                    <Text style={[styles.categories, {color: '#000'}]}>
                      {item.rating}
                    </Text>
                    <Icon
                      name={'star'}
                      color={'#000'}
                      size={SIZES.width * 0.041}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
    </>
  );
};

export default OrderSection;

const styles = StyleSheet.create({
  container: {
    height: SIZES.width * 0.31,
    marginTop: SIZES.width * 0.051,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.width * 0.039,
    padding: SIZES.width * 0.041,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#843c14',
  },
  name: {
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
    fontSize: SIZES.width * 0.036,
    textTransform: 'capitalize',
  },
  categories: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.031,
    color: '#707B81',
    paddingTop: SIZES.width * 0.01,
    textTransform: 'capitalize',
  },
  experience: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.031,
    color: '#707B81',
    textTransform: 'capitalize',
  },
  cost: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: SIZES.width * 0.026,
    color: COLORS.black,
    paddingTop: 3,
    textTransform: 'capitalize',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: SIZES.width * 0.039,
    paddingVertical: 3,
    borderRadius: SIZES.width * 0.039,
    backgroundColor: '#FFB443',
  },
});
