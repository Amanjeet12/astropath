import AsyncStorage from '@react-native-async-storage/async-storage';

const Preferences = {
  key: {
    IsLogin: 'islogin',
    Role: 'user',
    UserId: 'userid',
    Token: 'token',
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
};

export default Preferences;
