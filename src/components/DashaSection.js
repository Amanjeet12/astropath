/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {images} from '../constant';
import {COLORS, SIZES} from '../constant/theme';
import WebUrls from '../screens/api/WebUrls';
import WebMethods from '../screens/api/WebMethods';
import DashaTableItem from './DashaTableItem';
import Preferences from '../screens/api/Preferences';
import TableComponent from './TableComponent';

const DashaSection = ({dasha, loading, current_dasha}) => {
  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({item, index}) => {
    const rowStyle = index % 2 === 0 ? styles.evenRow : styles.oddRow;
    const startDate = item.start.split(' ')[0];
    const endDate = item.end.split(' ')[0];
    return (
      <View style={[styles.row, rowStyle]}>
        <Text style={[styles.cell, styles.column1]}>{item.planet}</Text>
        <Text style={[styles.cell, styles.column2]}>{startDate}</Text>
        <Text style={[styles.cell, styles.column3]}>{endDate}</Text>
      </View>
    );
  };

  return (
    <>
      {dasha && (
        <>
          <View style={styles.flexBox}>
            <View>
              <Text style={styles.title}>Maha Dasha</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={styles.containerBox}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={[styles.headerText, {width: '35%'}]}>Planet</Text>
                <Text style={[styles.headerText, {width: '32%'}]}>Start</Text>
                <Text style={styles.headerText}>End</Text>
              </View>
              <FlatList
                data={dasha}
                scrollEnabled={false}
                renderItem={renderItem}
                keyExtractor={item => item.planet_id.toString()}
              />
            </View>
          </View>
        </>
      )}
      {current_dasha && (
        <>
          <View style={{marginTop: SIZES.width * 0.051}}>
            <Text
              style={[
                styles.title,
                {
                  fontSize: SIZES.width * 0.06,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                },
              ]}>
              Current Dasha
            </Text>
          </View>
          <View style={{marginTop: SIZES.width * 0.051}}>
            <Text style={styles.title}>Major Dasha</Text>
            <View style={styles.border} />
            <View style={styles.containerBox}>
              <View style={styles.container}>
                <TableComponent data={current_dasha.major_dasha} />
              </View>
            </View>
          </View>
          <View style={{marginTop: SIZES.width * 0.051}}>
            <Text style={styles.title}>Sub Dasha</Text>
            <View style={styles.border} />
            <View style={styles.containerBox}>
              <View style={styles.container}>
                <TableComponent data={current_dasha.sub_dasha} />
              </View>
            </View>
          </View>
          <View style={{marginVertical: SIZES.width * 0.051}}>
            <Text style={styles.title}>Sub Sub Dasha</Text>
            <View style={styles.border} />
            <View style={styles.containerBox}>
              <View style={styles.container}>
                <TableComponent data={current_dasha.sub_sub_dasha} />
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default DashaSection;

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.width * 0.051,
    color: '#171532',
    fontFamily: 'KantumruyPro-Regular',
  },
  border: {
    height: 1,
    borderWidth: 0.5,
    borderColor: '#F39200',
    marginTop: SIZES.width * 0.013,
  },

  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#843C14',
    paddingBottom: 10,
    paddingHorizontal: 5,
    paddingTop: 10,
    backgroundColor: '#f2f2f2',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    paddingVertical: 5,
    padding: 5,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  evenRow: {
    backgroundColor: '#FECF8A',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  column1: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#843C14',
    paddingLeft: 5,
  },
  column2: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#843C14',
    paddingLeft: 5,
  },
  column3: {
    flex: 1,
    paddingLeft: 5,
  },
  containerBox: {
    marginVertical: SIZES.width * 0.051,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#843C14',
  },
});
