import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const DashaTableItem = ({item}) => {
  return (
    <View style={styles.row}>
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
  cell: {
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    paddingVertical: 5,
    fontSize: 12,
  },
});

export default DashaTableItem;