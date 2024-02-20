import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../constant/theme';

const SearchSection = ({placeholder}) => {
  return (
    <TouchableOpacity style={styles.searchContainer}>
      <Icon name={'search1'} size={SIZES.width * 0.046} color={'#000'} />
      <Text style={styles.title}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

export default SearchSection;

const styles = StyleSheet.create({
  searchContainer: {
    height: SIZES.width * 0.102,
    backgroundColor: '#fff',
    borderRadius: SIZES.width * 0.077,
    paddingLeft: SIZES.width * 0.064,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.width * 0.051,
  },
  title: {
    fontFamily: 'KantumruyPro-Regular',
    color: COLORS.black,
  },
});
