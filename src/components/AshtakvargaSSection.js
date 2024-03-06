/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZES} from '../constant/theme';

const AshtakvargaSSection = ({planet, loading}) => {
  const renderItem = ({item, index}) => {
    const rowStyle = index % 2 === 0 ? styles.evenRow : styles.oddRow;
    return (
      <View style={[styles.row, rowStyle]}>
        <Text style={[styles.cell, styles.column1]}>{item.name}</Text>
        <Text style={[styles.cell, styles.column2]}>{item.sign}</Text>
        <Text style={[styles.cell, styles.column2]}>{item.signLord}</Text>
        <Text style={[styles.cell, styles.column3]}>
          {item.fullDegree.toFixed(0)}.{((item.fullDegree % 1) * 60).toFixed(0)}
        </Text>
      </View>
    );
  };

  const renderItem2 = ({item, index}) => {
    const rowStyle = index % 2 === 0 ? styles.evenRow : styles.oddRow;
    return (
      <View style={[styles.row, rowStyle]}>
        <Text style={[styles.cell, styles.column1]}>{item.name}</Text>
        <Text style={[styles.cell, styles.column2]}>{item.nakshatra}</Text>
        <Text style={[styles.cell, styles.column2]}>{item.nakshatraLord}</Text>
        <Text style={[styles.cell, styles.column3]}>{item.house}</Text>
      </View>
    );
  };

  return (
    <>
      {loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {planet && (
        <>
          <View style={styles.flexBox}>
            <View>
              <Text style={styles.title}>Sign Chart</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={styles.containerBox}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={[styles.headerText, {width: '25%'}]}>Planet</Text>
                <Text style={[styles.headerText, {width: '25%'}]}>Sign</Text>
                <Text style={[styles.headerText, {width: '25%'}]}>
                  Sign Lord
                </Text>
                <Text style={styles.headerText}>Degree</Text>
              </View>
              <FlatList
                data={planet}
                scrollEnabled={false}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          </View>

          <View style={[styles.flexBox, {marginTop: SIZES.width * 0.051}]}>
            <View>
              <Text style={styles.title}>Nakshatra Chart</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={styles.containerBox}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={[styles.headerText, {width: '25%'}]}>Planet</Text>
                <Text style={[styles.headerText, {width: '25%'}]}>
                  Nakshatra
                </Text>
                <Text style={[styles.headerText, {width: '25%'}]}>
                  Naksh Lord
                </Text>
                <Text style={styles.headerText}>House</Text>
              </View>
              <FlatList
                data={planet}
                scrollEnabled={false}
                renderItem={renderItem2}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default AshtakvargaSSection;

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
    // justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 5,
    paddingTop: 10,
    // marginBottom: 5,
    backgroundColor: '#f2f2f2',
    borderColor: '#843C14',
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
    paddingLeft: 1,
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
