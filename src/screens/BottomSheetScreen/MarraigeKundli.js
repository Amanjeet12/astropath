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
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View style={{width: SIZES.width * 0.65}}>
              <BackButton placeholder={'Marraige Kundli'} />
            </View>
            <View style={{marginTop: SIZES.width * 0.04}}>
              <Image
                source={images.marriage_meter}
                style={{
                  width: '100%',
                  height: SIZES.width * 0.46,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={styles.boxContainer}>
              <View style={{width: '20%', alignItems: 'center'}}>
                <Image
                  source={images.marriage_ring1}
                  style={{
                    width: SIZES.width * 0.158,
                    height: SIZES.width * 0.158,
                    resizeMode: 'contain',
                  }}
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
                  style={{
                    width: SIZES.width * 0.158,
                    height: SIZES.width * 0.158,
                    resizeMode: 'contain',
                  }}
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
                  style={{
                    width: SIZES.width * 0.158,
                    height: SIZES.width * 0.158,
                    resizeMode: 'contain',
                  }}
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
    marginHorizontal: SIZES.width * 0.051,
  },
  boxContainer: {
    flexDirection: 'row',
    width: '100%',
    height: SIZES.width * 0.255,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: SIZES.width * 0.026,
    paddingHorizontal: SIZES.width * 0.026,
    borderRadius: SIZES.width * 0.01,
    marginTop: SIZES.width * 0.051,
  },
  title: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: SIZES.width * 0.041,
    color: '#D88200',
  },
  description: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.026,
    color: '#525252',
  },
});
