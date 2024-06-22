/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../../components/BackButton';
import HeaderSection from '../../components/HeaderSection';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import Preferences from '../api/Preferences';
import RazorpayCheckout from 'react-native-razorpay';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWalletbalance} from '../../redux/WalletBalanceSlice';
import BannerSection from '../../components/BannerSection';
import NetInfo from '@react-native-community/netinfo';

const WalletScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [columns, setColumns] = useState(2); // State to track the number of columns
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const {isData, walletBalance} = useSelector(state => state.wallet);
  const [refreshing, setRefreshing] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const {data} = useSelector(state => state.banner);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const checkConnectivity = async () => {
    const state = await NetInfo.fetch();
    const isConnected = state.isConnected;
    if (!isConnected) {
      ToastAndroid.showWithGravity(
        'No internet connection',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
    return isConnected;
  };
  // Sample data representing top amounts

  console.log(walletBalance);
  const topAmounts = [
    {id: '1', amount: '₹ 500.00'},
    {id: '2', amount: '₹ 300.00'},
    {id: '3', amount: '₹ 200.00'},
    {id: '4', amount: '₹ 100.00'},
  ];

  useEffect(() => {
    handleWalletBalance();
  }, [refreshing]);

  const renderTopAmount = ({item}) => (
    <TouchableOpacity
      style={[
        styles.amountItem,
        selectedAmount === item.amount && styles.selectedAmountItem,
      ]}
      onPress={() => {
        setSelectedAmount(item.amount);
        setCustomAmount('');
      }}>
      <Text style={styles.amountText}>{item.amount}</Text>
    </TouchableOpacity>
  );

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };
  const startPayment = (orderId, transactionAmount) => {
    var options = {
      description: 'Add To Wallet',
      image:
        'https://firebasestorage.googleapis.com/v0/b/zegocloudvideocall-b50bd.appspot.com/o/userprofile%2FWhatsApp%20Image%202024-04-03%20at%2012.55.45%20PM.jpeg?alt=media&token=729aae36-a285-4ccb-802d-ea512cbadb07',
      currency: 'INR',
      key: 'rzp_live_yp6sA6BGU2yJAY',
      amount: transactionAmount,
      name: 'Astropath',
      order_id: orderId,
      prefill: {
        email: 'amanjeetsingh@gmail.com',
        name: 'Amanjeet',
      },
      theme: {color: '#FFCC00'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        console.log('data====>', data);
        setModalMessage('Payment Successful');
        setModalVisible(true);
        handleWalletBalance();
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);
      })
      .catch(error => {
        setModalMessage('Payment Failed');
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);
      });
  };

  const handleWalletBalance = async () => {
    const isConnected = await checkConnectivity();
    if (!isConnected) {
      console.warn('No internet connection: Skipping wallet balance fetch');
      return;
    }
    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        dispatch(fetchWalletbalance(token));
      }
    } catch {}
  };

  const handlePayment = async () => {
    const isConnected = await checkConnectivity();
    if (!isConnected) {
      console.warn('No internet connection: Skipping wallet balance fetch');
      return;
    }
    if (!customAmount && !selectedAmount) {
      setToastMsg('Please enter amount');
      return;
    }
    setButtonLoading(true);
    const amount = customAmount
      ? customAmount
      : parseFloat(selectedAmount.replace('₹', ''));

    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        const params = {
          amount: amount,
        };
        const response = await WebMethods.postRequestWithHeader(
          WebUrls.url.create_payment,
          params,
          token,
        );
        if (response != null) {
          const orderId = response.response.id;
          const transactionAmount = response.response.amount;
          setButtonLoading(false);
          startPayment(orderId, transactionAmount);
        } else {
          console.log('error');
          setButtonLoading(false);
        }
      }
    } catch (error) {
      console.error('Error handling payment:', error);
      setButtonLoading(false);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.mainContainer}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View style={{width: SIZES.width * 0.38}}>
              <BackButton placeholder={'Wallet'} />
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <BannerSection data={data} set={1} />
            </View>
            <View style={{height: 120, marginTop: 20}}>
              <Image
                source={images.walletbanner}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
              <View style={{position: 'absolute', top: 10, left: 20}}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: '600'}}>
                  Current Wallet Balance
                </Text>
                <Text style={{fontSize: 28, color: '#000', fontWeight: '600'}}>
                  ₹ {Number(walletBalance).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('AllTransactionScreen')}>
                <Text style={{fontSize: 14, color: '#fff'}}>
                  All Transactions
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.title}>Select a plan to recharge</Text>
            </View>
            <FlatList
              key={columns}
              data={topAmounts}
              renderItem={renderTopAmount}
              scrollEnabled={false}
              numColumns={columns}
              keyExtractor={item => item.id}
              contentContainerStyle={{marginTop: 20}}
            />
            <View style={styles.divider} />
            <View style={styles.customAmountContainer}>
              <Text style={styles.title}>Enter custom amount</Text>
              <TextInput
                style={styles.customAmountInput}
                placeholder="Custom amount"
                keyboardType="numeric"
                placeholderTextColor={'#000'}
                value={customAmount}
                onChangeText={setCustomAmount}
              />
            </View>
            <TouchableOpacity
              style={styles.transactionButton}
              onPress={() => handlePayment()}
              disabled={buttonLoading}>
              <Text style={styles.buttonText}>
                {buttonLoading ? (
                  <ActivityIndicator size={'small'} color={'#fff'} />
                ) : customAmount ? (
                  `Custom Amount: ₹ ${customAmount}`
                ) : (
                  `Select Amount: ${selectedAmount}`
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{marginVertical: 20}}>
              {modalMessage === 'Payment Successful' ? (
                <Image
                  source={images.successicon}
                  style={{width: 80, height: 80, resizeMode: 'cover'}}
                />
              ) : (
                <Image
                  source={images.erroricon}
                  style={{width: 80, height: 80, resizeMode: 'cover'}}
                />
              )}
            </View>
            <Text style={styles.modalText}>{modalMessage}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#7D3807',
    paddingHorizontal: 15,
    borderRadius: 20,
    paddingVertical: 10,
  },
  title: {
    color: '#000',
    fontSize: 18,
  },
  amountItem: {
    backgroundColor: '#FFEDD2',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  customAmountContainer: {
    marginTop: 20,
  },
  customAmountInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    color: 'black',
  },
  divider: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  transactionButton: {
    backgroundColor: '#7D3807',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    height: 50,
    justifyContent: 'center',
    marginBottom: 35,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedAmountItem: {
    backgroundColor: '#FED7D7', // Or any other color for selected item
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
});
