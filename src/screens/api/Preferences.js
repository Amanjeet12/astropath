import AsyncStorage from '@react-native-async-storage/async-storage';

const Preferences = {
  key: {
    IsLogin: 'islogin',
    Role: 'user',
    UserId: 'userid',
    Token: 'token',
    Name: 'username',
    userLatitude: 'userLatitude',
    userLongitude: 'userLongitude',
    birthLat: 'birthLat',
    birthLon: 'birthLon',
    phone: 'phone',
    email: 'email',
    gender: 'gender',
    birthPlace: 'birthPlace',
    Time: 'Time',
    Profile_pic: 'profile_pic',
  },

  horoscope: {
    today: 'today',
    yesterday: 'yesterday',
    tommorow: 'tommorow',
    panchang: 'panchang',
  },

  async savePreferences(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('Something went wrong', error);
    }
  },

  async getPreferences(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.log('Something went wrong', error);
    }
  },

  async saveJsonPerences(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Something went wrong', error);
    }
  },

  async getJsonPreferences(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      console.log('Something went wrong', error);
    }
  },
};

export default Preferences;
