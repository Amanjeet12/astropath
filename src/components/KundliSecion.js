/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {images} from '../constant';
import {SIZES} from '../constant/theme';
import {useNavigation} from '@react-navigation/native';

const KundliSecion = () => {
  const navigation = useNavigation();

  const handleSingleForm = async () => {
    navigation.navigate('SingleKundaliForm');
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={() => handleSingleForm()}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={images.single_icon} style={styles.images} />
        </View>
        <Text style={styles.text1}>Free Kundli</Text>
        <View style={{position: 'absolute', right: 0, borderRadius: 10}}>
          <Image
            source={images.kundali_bg}
            style={{
              width: SIZES.width * 0.133,
              height: SIZES.width * 0.16,
              resizeMode: 'contain',
              borderTopRightRadius: 10,
            }}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boxContainer}
        onPress={() => navigation.navigate('MarraigeScreenForm')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={images.love_icon} style={styles.images} />
        </View>
        <Text style={styles.text1}>Match Making Kundli</Text>
        <View style={{position: 'absolute', right: 0, borderRadius: 10}}>
          <Image
            source={images.kundali_bg}
            style={{
              width: SIZES.width * 0.133,
              height: SIZES.width * 0.16,
              resizeMode: 'contain',
              borderTopRightRadius: 10,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default KundliSecion;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.width * 0.026,
  },
  boxContainer: {
    width: '45%',
    gap: SIZES.width * 0.026,
    height: SIZES.width * 0.21,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fae1d0',
  },
  images: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },

  text1: {
    fontSize: SIZES.width * 0.03,
    color: '#000',
    fontFamily: 'KantumruyPro-Bold',
  },
});
