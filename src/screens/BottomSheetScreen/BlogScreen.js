/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import {images} from '../../constant';
import {SIZES} from '../../constant/theme';
import Icon from 'react-native-vector-icons/Entypo';
import {Blog} from '../../constant/data';

const BlogScreen = ({route}) => {
  const {item} = route.params;
  console.log(item);
  const calculateDate = data => {
    const updatedAt = data;
    const updatedAtDate = new Date(updatedAt);
    const currentDate = new Date();
    const diffInMs = Math.abs(currentDate - updatedAtDate);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
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
            <View style={{width: SIZES.width * 0.648}}>
              <BackButton placeholder={'Blog'} />
            </View>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <Image
                source={{uri: item.photo}}
                style={{
                  width: '100%',
                  height: SIZES.width * 0.6,
                  resizeMode: 'contain',
                  borderRadius: 15,
                }}
              />
            </View>
            <View style={{marginTop: SIZES.width * 0.025}}>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            <View style={styles.flexBox}>
              <Icon
                name={'back-in-time'}
                color={'#000'}
                size={SIZES.width * 0.041}
              />
              <Text style={{fontSize: SIZES.width * 0.031, color: '#000'}}>
                Posted {calculateDate(item.updatedAt)} days ago
              </Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  description: {
    fontSize: SIZES.width * 0.041,
    fontFamily: 'KantumruyPro-Regular',
    color: '#000',
    lineHeight: SIZES.width * 0.064,
    marginTop: SIZES.width * 0.051,
  },
  title: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.057,
    color: '#000',
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.width * 0.013,
  },
});
