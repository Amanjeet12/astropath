/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AboutAstrologer = ({data}) => {
  console.log(data);
  return (
    <View style={styles.mainContainer}>
      <Text style={{textAlign: 'center', color: '#000', marginBottom: 10}}>
        About me
      </Text>
      <Text style={{color: '#616161', lineHeight: 20}}>{data}</Text>
    </View>
  );
};

export default AboutAstrologer;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    borderStyle: 'dashed',
    backgroundColor: '#FFF1CC',
    borderColor: '#FFD565',
    borderRadius: 10,
  },
});
