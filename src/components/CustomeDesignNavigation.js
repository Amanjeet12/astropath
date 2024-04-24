/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/Entypo';
import useNavigateToScreen from './Navigation';
import {SIZES} from '../constant/theme';
import {useNavigation} from '@react-navigation/native';

const CustomeDesignNavigation = ({title, icon, screen, url}) => {
  const navigation = useNavigation();
  const handleNavigation = async () => {
    if (screen) {
      navigation.navigate(screen);
    } else if (url) {
      try {
        await Linking.openURL(url);
      } catch (error) {
        console.error('An error occurred while trying to open the URL:', error);
      }
    }
  };
  return (
    <TouchableOpacity
      style={styles.flexContainer}
      onPress={() => handleNavigation()}>
      <View style={{width: '10%'}}>
        <Image
          source={icon}
          style={{
            width: SIZES.width * 0.051,
            height: SIZES.width * 0.051,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{width: '75%'}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{width: '15%', alignItems: 'center'}}>
        <Icon
          name={'chevron-small-right'}
          size={SIZES.width * 0.077}
          color={'#000'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomeDesignNavigation;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    height: SIZES.width * 0.13,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: SIZES.width * 0.013,
    marginTop: SIZES.width * 0.013,
    borderColor: '#FFD9A0',
  },
  title: {
    fontSize: SIZES.width * 0.041,
    color: '#000',
  },
});
