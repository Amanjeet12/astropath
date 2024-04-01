/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Modal,
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
import {SIZES} from '../../constant/theme';
import {images} from '../../constant';
import Preferences from '../api/Preferences';
import RazorpayCheckout from 'react-native-razorpay';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWalletbalance} from '../../redux/WalletBalanceSlice';

const WalletScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [columns, setColumns] = useState(2); // State to track the number of columns
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const {isData, walletBalance} = useSelector(state => state.wallet);

  // Sample data representing top amounts

  console.log(walletBalance);
  const topAmounts = [
    {id: '1', amount: '₹ 500.00'},
    {id: '2', amount: '₹ 300.00'},
    {id: '3', amount: '₹ 200.00'},
    {id: '4', amount: '₹ 100.00'},
  ];

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

  const toggleColumns = () => {
    setColumns(columns === 1 ? 2 : 1);
  };

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };
  const startPayment = (orderId, transactionAmount) => {
    var options = {
      description: 'Add To Wallet',
      image:
        'https://firebasestorage.googleapis.com/v0/b/wookfood.appspot.com/o/account-removebg-preview.png?alt=media&token=9dd0bfa7-3905-4850-a13d-36938735b07d',
      currency: 'INR',
      key: 'rzp_test_f2dxSEQgSlFtDB',
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
        // Hide modal after some time (e.g., 3 seconds)
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);
      });
  };

  const handleWalletBalance = async () => {
    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        dispatch(fetchWalletbalance(token));
      }
    } catch {}
  };

  const data = {
    _id: '65fbdca6d0220981231eff2d',
    astrologer_history: [
      {
        _id: '65fd2dbfa2fdf7fb625e3729',
        astrologerId: '65f7ffde9f2dceaaf7013f37',
        timestamp: '2024-03-22T07:05:35.325Z',
      },
      {
        _id: '6603d1aa742902db145b2c46',
        astrologerId: '66030b8401e0c3fc4440a3a2',
        timestamp: '2024-03-27T07:58:34.420Z',
      },
      {
        _id: '6603d495742902db145b2c50',
        astrologerId: '66030b8401e0c3fc4440a3a2',
        timestamp: '2024-03-27T08:11:01.468Z',
      },
      {
        _id: '6603d97f742902db145b2c58',
        astrologerId: '66030b8401e0c3fc4440a3a2',
        timestamp: '2024-03-27T08:31:59.518Z',
      },
      {
        _id: '6603d98c742902db145b2c5e',
        astrologerId: '66030b8401e0c3fc4440a3a2',
        timestamp: '2024-03-27T08:32:12.929Z',
      },
      {
        _id: '66071c909676872bde9f4edd',
        astrologerId: '65fdbf2c147c92aeda8fb063',
        timestamp: '2024-03-29T19:54:56.661Z',
      },
      {
        _id: '66071e3e9676872bde9f4ef1',
        astrologerId: '66030b8401e0c3fc4440a3a2',
        timestamp: '2024-03-29T20:02:06.535Z',
      },
      {
        _id: '66071f0c9676872bde9f4ef7',
        astrologerId: '66030b8401e0c3fc4440a3a2',
        timestamp: '2024-03-29T20:05:32.710Z',
      },
    ],
    balance: '130200',
    birth_lat: '28.7041',
    birth_location: 'Delhi',
    birth_lon: '77.1025',
    birth_time: '2024-03-21T07:07:11.628Z',
    createdAt: '2024-03-21T07:07:18.242Z',
    current_astrologer: '66030b8401e0c3fc4440a3a2',
    customer_astro_id: [
      '65fbdccc4b09537c1c01b433',
      '65fd2d0727c77b29b77fe721',
      '65fedb4b61a412c6c92b76a9',
      '6603b1da5d0dbc014c655b8a',
      '6603b5fc0e8b46a034d44b83',
      '660501e75d0dbc014c655b96',
      '660501fa5d0dbc014c655b9a',
      '66071ae3c9072e1372d9b381',
    ],
    customer_match_astro_id: [],
    dob: '1985-01-01T11:05:00.000Z',
    email: 'vikrant@krantecq.com',
    fcmtoken: null,
    gender: 'male',
    name: 'vikrant',
    phone: '+919525606192',
    profile_photo: null,
    updatedAt: '2024-03-30T07:28:15.262Z',
  };

  const handlePayment = async () => {
    if (!customAmount && !selectedAmount) {
      setToastMsg('Please enter amount');
      return;
    }
    const amount = customAmount
      ? customAmount
      : parseFloat(selectedAmount.replace('₹', '')) * 100;

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

          startPayment(orderId, transactionAmount);
        } else {
          console.log('error');
        }
      }
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View style={{width: SIZES.width * 0.38}}>
              <BackButton placeholder={'Wallet'} />
            </View>
            <View style={{height: 120, marginTop: 20}}>
              <Image
                source={images.walletbanner}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
              <View style={{position: 'absolute', top: 10, left: 20}}>
                <Text style={{fontSize: 16, color: '#000'}}>
                  Current Wallet Balance
                </Text>
                <Text style={{fontSize: 28, color: '#000', fontWeight: '600'}}>
                  ₹ 400.40
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
                value={customAmount}
                onChangeText={setCustomAmount}
              />
            </View>
            <TouchableOpacity
              style={styles.transactionButton}
              onPress={() => handlePayment()}>
              <Text style={styles.buttonText}>
                {customAmount
                  ? `Custom Amount: ₹ ${customAmount}`
                  : `Select Amount: ${selectedAmount}`}
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
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
});
