import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../constant/theme';

const SearchSection = ({placeholder}) => {
  return (
    <TouchableOpacity style={styles.searchContainer}>
      <Icon name={'search1'} size={18} color={'#000'} />
      <Text style={styles.title}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

export default SearchSection;

const styles = StyleSheet.create({
  searchContainer: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingLeft: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontFamily: 'KantumruyPro-Regular',
    color: COLORS.black,
  },
});
