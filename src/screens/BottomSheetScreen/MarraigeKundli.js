/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';

const MarraigeKundli = () => {
  return (
    <>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={{marginTop: 10}}>
              <HeaderSection />
            </View>
            <View style={{width: 250}}>
              <BackButton placeholder={'Marraige Kundli'} />
            </View>
            <View style={{marginTop: 30}}>
              <Image
                source={images.marriage_meter}
                style={{width: '100%', height: 180, resizeMode: 'contain'}}
              />
            </View>
            <View style={styles.boxContainer}>
              <View style={{width: '20%', alignItems: 'center'}}>
                <Image
                  source={images.marriage_ring1}
                  style={{width: 64, height: 64, resizeMode: 'contain'}}
                />
              </View>
              <View style={{width: '80%'}}>
                <Text style={styles.title}>Compatibility ( Varna )</Text>
                <Text style={styles.description}>
                  Varna refers to the mental compatibility of two persons
                  involved. It holds nominal effect in the mastters of marriage
                  compatibility
                </Text>
              </View>
            </View>
            <View style={styles.boxContainer}>
              <View style={{width: '20%', alignItems: 'center'}}>
                <Image
                  source={images.marriage_ring2}
                  style={{width: 64, height: 64, resizeMode: 'contain'}}
                />
              </View>
              <View style={{width: '80%'}}>
                <Text style={[styles.title, {color: '#FF6F6F'}]}>
                  Love ( Bhakut )
                </Text>
                <Text style={styles.description}>
                  Varna refers to the mental compatibility of two persons
                  involved. It holds nominal effect in the mastters of marriage
                  compatibility
                </Text>
              </View>
            </View>
            <View style={styles.boxContainer}>
              <View style={{width: '20%', alignItems: 'center'}}>
                <Image
                  source={images.marriage_ring3}
                  style={{width: 64, height: 64, resizeMode: 'contain'}}
                />
              </View>
              <View style={{width: '80%'}}>
                <Text style={[styles.title, {color: '#946FFF'}]}>
                  Dominance ( Vashya )
                </Text>
                <Text style={styles.description}>
                  Varna refers to the mental compatibility of two persons
                  involved. It holds nominal effect in the mastters of marriage
                  compatibility
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default MarraigeKundli;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginTop: 20,
  },
  title: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: 16,
    color: '#D88200',
  },
  description: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: 10,
    color: '#525252',
  },
});
