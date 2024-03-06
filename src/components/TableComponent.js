import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SIZES} from '../constant/theme';

const TableComponent = ({data}) => {
  return (
    <View style={styles.table}>
      {Object.entries(data).map(([key, value], index) => (
        <Row key={key} label={key} value={value} index={index} />
      ))}
    </View>
  );
};

const Row = ({label, value, index}) => {
  const formatLabel = label
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  const rowStyle = {
    ...styles.row,
    backgroundColor: index % 2 === 0 ? '#FECF8A' : '#fff',
  };

  return (
    <View style={rowStyle}>
      <Text style={styles.label}>{formatLabel}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 0.7,
    borderColor: '#B9B9B9',
    borderRadius: 5,
    backgroundColor: '#fff',
    // margin: SIZES.width * 0.02,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#B9B9B9',
    padding: SIZES.width * 0.03,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: SIZES.width * 0.035,
    fontFamily: 'Inter-Regular',
    color: '#000',
    textTransform: 'capitalize',
  },
  value: {
    flex: 1,
    fontSize: SIZES.width * 0.035,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
});

export default TableComponent;
