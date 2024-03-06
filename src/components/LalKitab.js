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

const LalKitab = ({lalkitab, loading, lalkitabStory}) => {
  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({item, index}) => {
    const rowStyle = index % 2 === 0 ? styles.evenRow : styles.oddRow;

    return (
      <View style={[styles.row, rowStyle]}>
        <Text style={[styles.cell, {width: '25%'}]}>{item.planet}</Text>
        <Text style={[styles.cell, {width: '25%'}]}>{item.nature}</Text>
        <Text style={[styles.cell, {width: '25%'}]}>{item.position}</Text>
        <Text style={[styles.cell, {width: '25%'}]}>{item.rashi}</Text>
      </View>
    );
  };

  const renderItemStory = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.debtName}>{item.debt_name}</Text>
      <Text style={styles.events}>
        <Text style={{fontSize: 18, color: '#843C14', fontWeight: 'bold'}}>
          Indication :{' '}
        </Text>
        {item.events}
      </Text>
      <Text style={styles.indications}>
        <Text style={{fontSize: 18, color: '#843C14', fontWeight: 'bold'}}>
          Events :{' '}
        </Text>
        {item.indications}
      </Text>
    </View>
  );

  return (
    <>
      {lalkitab && (
        <>
          <View style={styles.flexBox}>
            <View>
              <Text style={styles.title}> Planet Chart</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={styles.containerBox}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={[styles.headerText, {width: '25%'}]}>Planet</Text>
                <Text style={[styles.headerText, {width: '25%'}]}>Nature</Text>
                <Text style={[styles.headerText, {width: '25%'}]}>
                  Position
                </Text>
                <Text style={styles.headerText}>Rashi</Text>
              </View>
              <FlatList
                data={lalkitab.data}
                scrollEnabled={false}
                renderItem={renderItem}
                keyExtractor={item => item.planet}
              />
            </View>
          </View>
        </>
      )}

      {lalkitabStory && (
        <>
          <View style={[styles.flexBox, {marginTop: SIZES.width * 0.051}]}>
            <View>
              <Text style={styles.title}> Lal Kitab Debts</Text>
            </View>
          </View>
          <View style={styles.border} />

          <View>
            <FlatList
              data={lalkitabStory}
              scrollEnabled={false}
              renderItem={renderItemStory}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{marginBottom: 30}}
            />
          </View>
        </>
      )}
    </>
  );
};

export default LalKitab;

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

  itemContainer: {
    padding: 10,
    borderWidth: 1,
    // borderBottomColor: '#ccc',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#843C14',
  },
  debtName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#000',
  },
  events: {
    marginBottom: 5,
    fontSize: 14,
    color: '#000',
  },
  indications: {
    color: '#000',
    fontSize: 14,
    marginTop: 10,
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
