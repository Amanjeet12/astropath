/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SIZES} from '../constant/theme';

const DaySelection = () => {
  const [selected, setSelected] = useState('Yesterday');
  const handleSelecter = option => {
    setSelected(option);
  };
  return (
    <View style={styles.boxContainer}>
      <TouchableOpacity
        style={[
          styles.singleContainer,
          {
            backgroundColor: selected === 'Yesterday' ? '#F39200' : '#ece9e4',
          },
        ]}
        onPress={() => handleSelecter('Yesterday')}>
        <Text
          style={{
            color: selected === 'Yesterday' ? '#fff' : '#000',
            fontSize: SIZES.width * 0.031,
          }}>
          Yesterday
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.singleContainer,
          {
            backgroundColor: selected === 'Today' ? '#F39200' : '#ece9e4',
          },
        ]}
        onPress={() => handleSelecter('Today')}>
        <Text
          style={{
            color: selected === 'Today' ? '#fff' : '#000',
            fontSize: SIZES.width * 0.031,
          }}>
          Today
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.singleContainer,
          {
            backgroundColor: selected === 'Tommorrow' ? '#F39200' : '#ece9e4',
          },
        ]}
        onPress={() => handleSelecter('Tommorrow')}>
        <Text
          style={{
            color: selected === 'Tommorrow' ? '#fff' : '#000',
            fontSize: SIZES.width * 0.031,
          }}>
          Tommorrow
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.singleContainer,
          {
            backgroundColor: selected === 'Monthly' ? '#F39200' : '#ece9e4',
          },
        ]}
        onPress={() => handleSelecter('Monthly')}>
        <Text
          style={{
            color: selected === 'Monthly' ? '#fff' : '#000',
            fontSize: SIZES.width * 0.031,
          }}>
          Monthly
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DaySelection;

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: SIZES.width * 0.051,
    backgroundColor: '#ece9e4',
    width: '100%',
    height: SIZES.width * 0.141,
    alignSelf: 'center',
    borderRadius: 30,
  },
  singleContainer: {
    paddingHorizontal: SIZES.width * 0.039,
    paddingVertical: SIZES.width * 0.026,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
