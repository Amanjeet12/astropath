/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
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
import TableComponent from './TableComponent';
import WebMethods from '../screens/api/WebMethods';
import WebUrls from '../screens/api/WebUrls';
import AstrologyTableItem from './AstrologyTableItem';
import Preferences from '../screens/api/Preferences';

const AshtakvargaSSection = ({
  name,
  value,
  showDateTime,
  showDate,
  lat,
  lon,
}) => {
  const [planet, setPlanet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hour, minute] = showDateTime.split(':');

  // Parse date to get day, month, and year
  const [month, day, year] = showDate.split('/');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let token;

      try {
        token = await Preferences.getPreferences(Preferences.key.Token);
      } catch (error) {
        console.error('Error getting latitude and longitude:', error);
        return;
      }

      if (token) {
        const params = {
          name,
          day,
          month,
          year,
          hour,
          min: minute,
          lat: lat,
          lon: lon,
          tzone: '5.5',
        };

        const [planetData] = await Promise.all([
          WebMethods.postRequestWithHeader(WebUrls.url.planets, params, token),
        ]);

        setPlanet(planetData.data);
        console.log(planetData.data);
      } else {
        console.log('Latitude, longitude, or token is null');
      }
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
          <Text style={styles.title}>Planet Detail</Text>
        </View>
      </View>
      <View style={styles.border} />
      <View style={{marginTop: SIZES.width * 0.051, borderWidth: 0.5}}>
        <FlatList
          data={planet}
          scrollEnabled={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <AstrologyTableItem item={item} />}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.headerText}>Name</Text>
              <Text style={styles.headerText}>Sign</Text>
              <Text style={styles.headerText}>Sign Lord</Text>
              <Text style={styles.headerText}>Nakshatra</Text>
              <Text style={styles.headerText}>House</Text>
            </View>
          )}
        />
      </View>
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
  dropdown: {
    height: SIZES.width * 0.102,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: SIZES.width * 0.021,
    borderRadius: SIZES.width * 0.01,
  },
  placeholderStyle: {
    fontSize: SIZES.width * 0.031,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: SIZES.width * 0.031,
    color: 'grey',
  },
  iconStyle: {
    width: SIZES.width * 0.051,
    height: SIZES.width * 0.051,
  },
  inputSearchStyle: {
    height: SIZES.width * 0.051,
    fontSize: SIZES.width * 0.031,
    color: 'grey',
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
    color: '#000',
  },
});
