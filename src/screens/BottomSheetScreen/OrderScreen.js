import {
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import OrderSection from '../../components/OrderSection';
import {images} from '../../constant';
import Preferences from '../api/Preferences';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import {useIsFocused} from '@react-navigation/native';

const OrderScreen = () => {
  const IsFocused = useIsFocused();
  const [orders, setOrders] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    fetchAstrologer();
  }, [refreshing, refresh]);

  const fetchAstrologer = async () => {
    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        const response = await WebMethods.getRequestWithHeader(
          WebUrls.url.orders,
          token,
        );
        if (response != null) {
          console.log('response===>', response.data);
          const sortedOrder = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          setOrders(sortedOrder);
        } else {
          console.log('error');
        }
      }
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };

  const handleRefresh = () => {
    console.log('first');
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
                {orders ? (
                  <OrderSection data={orders} refreshing={handleRefresh} />
                ) : (
                  <View style={{marginTop: 55}}>
                    <ActivityIndicator size={'small'} color={COLORS.black} />
                  </View>
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
});
