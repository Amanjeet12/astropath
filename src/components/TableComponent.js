import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SIZES} from '../constant/theme';

const TableComponent = ({data}) => {
  return (
    <View style={styles.table}>
      {Object.entries(data).map(([key, value]) => (
        <Row key={key} label={key} value={value} />
      ))}
    </View>
  );
};

const Row = ({label, value}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  table: {
    borderWidth: 0.7,
    borderColor: '#B9B9B9',
    borderRadius: 5,
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
    fontSize: SIZES.width * 0.03,
    fontFamily: 'Inter-Regular',
    color: '#000',
    textTransform: 'capitalize',
  },
  value: {
    flex: 1,
    fontSize: SIZES.width * 0.03,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
});

export default TableComponent;
