import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {SIZES} from '../constant/theme';

const BackButton = ({placeholder}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.flexBox}
      onPress={() => navigation.goBack()}>
      <Icon
        name="chevron-thin-left"
        color={'#000'}
        size={SIZES.width * 0.062}
        style={{paddingTop: SIZES.width * 0.013}}
      />
      <Text style={styles.title}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.width * 0.026,
  },
  title: {
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: SIZES.width * 0.057,
    color: '#000',
  },
});
