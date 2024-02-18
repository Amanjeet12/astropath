import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Astropath_logo} from '../screens/SvgComponent/BottomSvgComponent';
import {images} from '../constant';

const HeaderSection = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Astropath_logo />
      </View>
      <TouchableOpacity style={styles.walletContainer}>
        <Text style={styles.title}>₹ 4,00</Text>
        <Image
          source={images.wallet_icon}
          style={{width: 17, height: 17, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({
  mainContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletContainer: {
    padding: 5,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'KantumruyPro-Regular',
    marginTop: 3,
  },
});
