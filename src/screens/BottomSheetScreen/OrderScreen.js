import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import {images} from '../../constant';
import OrderSection from '../../components/OrderSection';
import {Order} from '../../constant/data';
const OrderScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={{marginTop: 10}}>
            <HeaderSection />
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.tagLine}>Recent orders and chats</Text>
            <View>
              <OrderSection data={Order} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: 20,
  },
  tagLine: {
    fontSize: 20,
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
    textTransform: 'capitalize',
  },
});
