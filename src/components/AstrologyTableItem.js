import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const AstrologyTableItem = ({item}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.sign}</Text>
      <Text style={styles.cell}>{item.signLord}</Text>
      <Text style={styles.cell}>{item.nakshatra}</Text>
      <Text style={styles.cell}>{item.house}</Text>
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
  cell: {
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    paddingVertical: 5,
    fontSize: 12,
    color: 'grey',
  },
});

export default AstrologyTableItem;
