import AsyncStorage from '@react-native-async-storage/async-storage';
import Preferences from './Preferences';

const Custome = {
  async logout(callback) {
    const storedKeys = [
      Preferences.key.UserId,
      Preferences.key.phone,
      Preferences.key.Name,
      Preferences.key.email,
      Preferences.key.Time,
      Preferences.key.birthPlace,
      Preferences.key.gender,
      Preferences.key.birthLat,
      Preferences.key.birthLon,
    ];
    for (const key of storedKeys) {
      await AsyncStorage.removeItem(key);
    }
    console.log('clear');
    callback();
  },
};

export default Custome;
