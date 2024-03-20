/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Astropath_logo} from '../screens/SvgComponent/BottomSvgComponent';
import {images} from '../constant';
import {SIZES} from '../constant/theme';
import RazorpayCheckout from 'react-native-razorpay';
import WebMethods from '../screens/api/WebMethods';
import WebUrls from '../screens/api/WebUrls';
import Preferences from '../screens/api/Preferences';
import {useNavigation} from '@react-navigation/native';

const HeaderSection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View>
        <Astropath_logo />
      </View>
      <TouchableOpacity
        style={styles.walletContainer}
        onPress={() => navigation.navigate('WalletScreen')}>
        <Text style={styles.title}>₹ 4,00</Text>
        <Image
          source={images.wallet_icon}
          style={{
            width: SIZES.width * 0.044,
            height: SIZES.width * 0.044,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({
  mainContainer: {
    height: SIZES.width * 0.153,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletContainer: {
    padding: SIZES.width * 0.013,
    paddingHorizontal: SIZES.width * 0.018,
    borderWidth: 1,
    borderRadius: SIZES.width * 0.021,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SIZES.width * 0.026,
  },
  title: {
    color: '#000',
    fontSize: SIZES.width * 0.041,
    fontFamily: 'KantumruyPro-Regular',
    marginTop: 3,
  },
});
