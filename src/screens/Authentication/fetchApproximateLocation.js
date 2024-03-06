import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
import Preferences from '../api/Preferences';
import {useEffect} from 'react';

const saveLocationToAsyncStorage = async (latitude, longitude) => {
  try {
    await Preferences.savePreferences(
      Preferences.key.userLatitude,
      latitude.toString(),
    );
    await Preferences.savePreferences(
      Preferences.key.userLongitude,
      longitude.toString(),
    );
    console.log('Location saved to AsyncStorage');
  } catch (error) {
    console.error('Error saving location to AsyncStorage:', error);
  }
};

const fetchApproximateLocation = async () => {
  try {
    const userLatitude = await Preferences.getPreferences(
      Preferences.key.userLatitude,
    );
    if (userLatitude) {
      console.log(userLatitude);
      return;
    } else {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Astropath App Location Permission',
              message: 'Astropath needs access to your location ',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Coarse location permission granted');
          } else {
            console.log('Coarse location permission denied');
            return;
          }
        }

        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            console.log('Approximate location:', latitude, longitude);
            await saveLocationToAsyncStorage(latitude, longitude);
          },
          error => {
            console.log('Error getting approximate location:', error);
          },
          {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
        );
      } catch (err) {
        console.warn(err);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchApproximateLocation;
