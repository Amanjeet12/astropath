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

const HeaderSection = () => {
  const startPayment = orderId => {
    var options = {
      description: 'Add To Wallet',
      image:
        'https://firebasestorage.googleapis.com/v0/b/wookfood.appspot.com/o/account-removebg-preview.png?alt=media&token=9dd0bfa7-3905-4850-a13d-36938735b07d',
      currency: 'INR',
      key: 'rzp_test_f2dxSEQgSlFtDB',
      amount: 500 * 100,
      name: 'Astropath',
      prefill: {
        email: 'amanjeetsingh@gmail.com',
        name: 'Amanjeet',
      },
      theme: {color: '#FFCC00'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        console.log('data====>', data);
        const params = {
          status: 'success',
          order_id: orderId,
          payment_id: data.razorpay_payment_id,
        };
        WebMethods.postRequest(WebUrls.url.verify_payment, params).then(
          async response => {
            if (response != null) {
              console.log(response);
              try {
              } catch (error) {}
            } else {
              console.log('error');
            }
          },
        );
      })
      .catch(error => {
        Alert.alert('Payment Failed', `${error.error.description}`);
      });
  };
  const handlePayment = () => {
    const params = {
      amount: 500,
    };
    WebMethods.postRequest(WebUrls.url.create_payment, params).then(
      async response => {
        if (response != null) {
          const orderId = response.response.id;
          try {
            startPayment(orderId);
          } catch (error) {
            console.error('Error starting payment:', error);
          }
        } else {
          console.log('error');
        }
      },
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Astropath_logo />
      </View>
      <TouchableOpacity style={styles.walletContainer} onPress={handlePayment}>
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
