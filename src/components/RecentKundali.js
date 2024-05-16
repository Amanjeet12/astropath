/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {kundaliData} from '../constant/data';
import {COLORS, SIZES} from '../constant/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import WebUrls from '../screens/api/WebUrls';
import WebMethods from '../screens/api/WebMethods';
import Preferences from '../screens/api/Preferences';
import {TimerContext} from '../constant/TimerContext';
import LoadingScreen from './LoadingScreen';
import NetInfo from '@react-native-community/netinfo';

const backgroundColor = ['#1f2499', '#bf6424', '#1f2499', '#bf6424', '#1f2499'];

const RecentKundali = ({data, screen, datas, onVisibilityChange}) => {
  const navigation = useNavigation();
  const {showTimer} = useContext(TimerContext);

  const checkConnectivity = async () => {
    const state = await NetInfo.fetch();
    const isConnected = state.isConnected;
    if (!isConnected) {
      ToastAndroid.showWithGravity(
        'No internet connection',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
    return isConnected;
  };

  const handleNavigation = async item => {
    const isConnected = await checkConnectivity();
    if (!isConnected) {
      return;
    }
    if (datas) {
      handleRequest(
        item.name,
        item.day,
        item.month,
        item.year,
        item.hour,
        item.min,
        item.lat,
        item.lon,
        item.timeZone,
      );
    } else {
      navigation.navigate(screen, {
        name: item.name,
        day: item.day,
        month: item.month,
        year: item.year,
        hour: item.hour,
        min: item.min,
        lat: item.lat,
        lon: item.lon,
        timeZone: item.timeZone,
      });
    }
  };

  const handleRequest = async (
    name,
    day,
    month,
    year,
    hour,
    min,
    lat,
    lon,
    timeZone,
  ) => {
    let token;
    onVisibilityChange(true);
    try {
      token = await Preferences.getPreferences(Preferences.key.Token);
    } catch (error) {
      console.error('Error getting token:', error);
      return;
    }

    const params = {
      ...datas,
      kundali_data: {
        name: name,
        hour: hour,
        min: min,
        lat: lat,
        lon: lon,
        day: day,
        month: month,
        year: year,
        timeZone: timeZone,
      },
    };

    if (token) {
      WebMethods.postRequestWithHeader(WebUrls.url.request_token, params, token)
        .then(async response => {
          if (response != null) {
            if (response.success === 'o') {
              console.log('Success false');
              onVisibilityChange(false); // Hide loading
            } else {
              var params = {
                astrologerId: datas.astrologerId,
                services: datas.services,
              };
              try {
                WebMethods.postRequestWithHeader(
                  WebUrls.url.fetch_queue,
                  params,
                  token,
                ).then(async response => {
                  if (response != null) {
                    onVisibilityChange(false); // Hide loading
                    console.log(response.data);
                    navigation.navigate('AstrologerScreen');
                    showTimer();
                    Alert.alert(
                      `Successfully Added queue List No ${response.data}`,
                    );
                  }
                });
              } catch (error) {
                onVisibilityChange(false); // Hide loading
              }
            }
          } else {
            console.log('Null response');
            onVisibilityChange(false); // Hide loading
          }
        })
        .catch(error => {
          console.error('Error:', error);
          onVisibilityChange(false); // Hide loading
        });
    }
  };

  const showlist = ({item, index}) => {
    return (
      <View
        style={{
          height: 70,
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 10,
          padding: 10,
          flexDirection: 'row',
          gap: 10,
          backgroundColor: '#fff',
          borderColor: '#7d3807',
        }}
        onPress={() => console.log('Pressed')}>
        <View style={{width: '15%'}}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: backgroundColor[index] || 'blue',
            }}>
            <Text style={{fontSize: 20, color: '#fff'}}>
              {item.name.charAt(0)}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '75%',
            gap: 5,
            paddingTop: 3,
            position: 'relative',
          }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                textTransform: 'capitalize',
              }}>
              {item.name}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 12, color: '#838383'}}>
              {item.day}/{item.month}/{item.year}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation(item)}>
            <Icon
              name="arrow-top-right"
              size={SIZES.width * 0.051}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data.slice(-3)} // Display only the last 3 items
        keyExtractor={(item, index) => index.toString()}
        renderItem={showlist}
        scrollEnabled={false}
        contentContainerStyle={{marginTop: 10}}
      />
    </View>
  );
};

export default RecentKundali;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    paddingHorizontal: SIZES.width * 0.026,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#7d3807',
  },
});
