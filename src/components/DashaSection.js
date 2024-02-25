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
import {SIZES} from '../constant/theme';
import WebUrls from '../screens/api/WebUrls';
import WebMethods from '../screens/api/WebMethods';
import DashaTableItem from './DashaTableItem';

const DashaSection = () => {
  const [value, setValue] = useState(null);
  const [dasha, setDasha] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdXBlcl9hZG1pbl91c2VyX2lkIjpudWxsLCJhc3Ryb2xvZ2VyX3VzZXJfaWQiOm51bGwsImN1c3RvbWVyX3VzZXJfaWQiOiI2NWRhZWIxZDEyYjlhYTQ3Mjk2YTg1YjgiLCJpYXQiOjE3MDg4NDU4NTN9.BnuhdqU2HBfnK4pyCBEYVr3bDnezteegc-hQnNHzEow';
      const params = {
        name: 'amanjeet',
        day: '1',
        month: '2',
        year: '2000',
        hour: '1',
        min: '12',
        lat: '12.123',
        lon: '123',
        tzone: '5.5',
      };

      const [dashaData] = await Promise.all([
        WebMethods.postRequestWithHeader(
          WebUrls.url.major_vdasha,
          params,
          token,
        ),
      ]);

      setDasha(dashaData.data);
      console.log(dashaData.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.flexBox}>
        <View>
          <Text style={styles.title}>Dasha Chart</Text>
        </View>
      </View>
      <View style={styles.border} />
      <View style={{marginVertical: SIZES.width * 0.051, borderWidth: 0.5}}>
        <FlatList
          data={dasha}
          scrollEnabled={false}
          renderItem={({item}) => <DashaTableItem item={item} />}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.headerText}>Planet</Text>
              <Text style={styles.headerText}>Planet_id</Text>
              <Text style={styles.headerText}>Start</Text>
              <Text style={styles.headerText}>end</Text>
            </View>
          )}
        />
      </View>
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
  dropdown: {
    height: SIZES.width * 0.102,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: SIZES.width * 0.021,
    borderRadius: 4,
  },
  placeholderStyle: {
    fontSize: SIZES.width * 0.031,
  },
  selectedTextStyle: {
    fontSize: SIZES.width * 0.031,
  },
  iconStyle: {
    width: SIZES.width * 0.051,
    height: SIZES.width * 0.051,
  },
  inputSearchStyle: {
    height: SIZES.width * 0.051,
    fontSize: SIZES.width * 0.031,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    height: 1,
    borderWidth: 0.5,
    borderColor: '#F39200',
    marginTop: SIZES.width * 0.013,
  },
  description: {
    fontSize: SIZES.width * 0.041,
    fontFamily: 'KantumruyPro-Regular',
    color: '#000',
    lineHeight: SIZES.width * 0.064,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
  },
});
