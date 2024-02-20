/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

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
            fontSize: 12,
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
            fontSize: 12,
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
            fontSize: 12,
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
            fontSize: 12,
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
    marginTop: 20,
    backgroundColor: '#ece9e4',
    width: '100%',
    height: 54,
    alignSelf: 'center',
    borderRadius: 30,
  },
  singleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
