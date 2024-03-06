import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const DashaTableItem = ({item, index}) => {
  const rowStyle = index % 1 === 0 ? styles.rowEven : styles.rowOdd;

  return (
    <View style={[styles.row, rowStyle]}>
      <Text style={styles.cell}>{item.planet}</Text>
      <Text style={styles.cell}>{item.planet_id}</Text>
      <Text style={styles.cell}>{item.start}</Text>
      <Text style={styles.cell}>{item.end}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  rowEven: {
    backgroundColor: 'black', // Even row color
  },
  rowOdd: {
    backgroundColor: 'grey', // Odd row color
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    paddingVertical: 5,
    fontSize: 12,
    color: 'white', // Text color
    paddingLeft: 0,
  },
});

export default DashaTableItem;
