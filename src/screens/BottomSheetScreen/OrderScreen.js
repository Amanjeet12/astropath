import {
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import OrderSection from '../../components/OrderSection';
import {images} from '../../constant';
import Preferences from '../api/Preferences';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import NetInfo from '@react-native-community/netinfo';
import {useIsFocused} from '@react-navigation/native';
import {fetchWalletbalance} from '../../redux/WalletBalanceSlice';
import {useDispatch} from 'react-redux';

const OrderScreen = () => {
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true);
    const isConnected = await checkConnectivity();
    if (isConnected) {
      fetchOrders();
      handleWalletBalance();
    } else {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (refreshing || refresh || isFocused) {
      fetchOrders();
      handleWalletBalance();
    }
  }, [refreshing, refresh, isFocused]);

  const handleWalletBalance = async () => {
    try {
      const isConnected = await checkConnectivity();
      if (!isConnected) {
        console.warn('No internet connection: Skipping wallet balance fetch');
        return;
      }

      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        dispatch(fetchWalletbalance(token));
      }
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const isConnected = await checkConnectivity();
      if (!isConnected) {
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        const response = await WebMethods.getRequestWithHeader(
          WebUrls.url.orders,
          token,
        );
        if (response !== null) {
          console.log('response===>', response.data);
          const sortedOrder = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          setOrders(sortedOrder);
        } else {
          console.log('Error fetching orders');
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
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
            <View style={{marginTop: SIZES.width * 0.051}}>
              <Text style={styles.tagLine}>Recent orders and chats</Text>
              <View>
                {loading ? (
                  <View style={{marginTop: 55}}>
                    <ActivityIndicator size={'small'} color={COLORS.black} />
                  </View>
                ) : orders.length === 0 ? (
                  <Text style={styles.emptyMessage}>No orders available.</Text>
                ) : (
                  <OrderSection data={orders} refreshing={handleRefresh} />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  tagLine: {
    fontSize: SIZES.width * 0.051,
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  emptyMessage: {
    marginTop: 150,
    fontSize: SIZES.width * 0.04,
    color: COLORS.black,
    textAlign: 'center',
  },
});
