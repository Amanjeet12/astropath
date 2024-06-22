/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {Astropath_logo} from '../screens/SvgComponent/BottomSvgComponent';
import {images} from '../constant';
import {SIZES} from '../constant/theme';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

const HeaderSection = () => {
  const navigation = useNavigation();
  const {isloading, walletBalance} = useSelector(state => state.wallet);

  return (
    <View style={styles.mainContainer}>
      <View>
        <Astropath_logo />
      </View>
      {/* <TouchableOpacity
        style={{marginLeft: 40}}
        onPress={() => navigation.navigate('Chathistory')}>
        <Icon name={'message1'} size={25} color={'#000'} />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.walletContainer}
        onPress={() => navigation.navigate('WalletScreen')}>
        {isloading ? (
          <View>
            <ActivityIndicator size={'small'} />
          </View>
        ) : (
          <View>
            <Text style={styles.title}>
              ₹ {Number(walletBalance).toFixed(2)}
            </Text>
          </View>
        )}

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
