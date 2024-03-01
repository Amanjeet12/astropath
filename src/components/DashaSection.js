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
import Preferences from '../screens/api/Preferences';

const DashaSection = ({name, value, showDateTime, showDate, lat, lon}) => {
  console.log(lat, lon);
  const [dasha, setDasha] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(true);
  const dateTimeObject = new Date(showDateTime);
  const dateObject = new Date(showDate);

  // Extracting time parts
  const hour = dateTimeObject.getUTCHours().toString();
  const minute = dateTimeObject.getUTCMinutes().toString();
  const second = dateTimeObject.getUTCSeconds().toString();

  // Extracting date parts
  const day = dateObject.getUTCDate().toString();
  const month = (dateObject.getUTCMonth() + 1).toString();
  const year = dateObject.getUTCFullYear().toString();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
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
          day: day,
          month: month,
          year: year,
          hour: hour,
          min: minute,
          lat: lat,
          lon: lon,
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
      } else {
        console.log('Latitude, longitude, or token is null');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        // After refreshing logic
        setRefreshing(false);
      }, 2000); // Example: set refreshing to false after 2 seconds
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
    color: '#000',
  },
});
