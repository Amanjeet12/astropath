import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  ActivityIndicator,
} from 'react-native';
import BackButton from '../../components/BackButton';
import {SIZES, COLORS} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import {images} from '../../constant';
import WebUrls from '../api/WebUrls';
import WebMethods from '../api/WebMethods';
import Preferences from '../api/Preferences';
import NetInfo from '@react-native-community/netinfo';

const AllTransactionScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransaction();
  }, []);

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  };

  const checkConnectivity = async () => {
    const state = await NetInfo.fetch();
    const isConnected = state.isConnected;
    if (!isConnected) {
      setToastMsg('No internet connection');
    }
    return isConnected;
  };

  const fetchTransaction = async () => {
    setLoading(true);
    const isConnected = await checkConnectivity();
    if (!isConnected) {
      setLoading(false);
      return;
    }

    let token;
    try {
      token = await Preferences.getPreferences(Preferences.key.Token);
    } catch (error) {
      console.error('Error getting token:', error);
      setLoading(false);
      return;
    }

    if (token) {
      try {
        const response = await WebMethods.getRequestWithHeader(
          WebUrls.url.transaction_history,
          token,
        );
        if (response !== null) {
          const sortedTransactions = response.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          setTransactions(sortedTransactions);
        } else {
          console.log('Error fetching transactions');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    const date = new Date(item.createdAt);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return (
      <View style={styles.transactionItem}>
        <View style={styles.leftColumn}>
          <Text style={styles.title} numberOfLines={1}>
            TAX-{item._id}
          </Text>
          <Text style={styles.title}>Date: {formattedDate}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.title}>Amount: {item.amount}</Text>
          <Text style={styles.title}>Status: {item.status}</Text>
        </View>
      </View>
    );
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
              <BackButton placeholder={'Transactions'} />
            </View>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={transactions}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={{marginTop: 10}}
              />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default AllTransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.width * 0.2,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 12,
    color: '#000',
  },
});
