/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {images} from '../constant';
import {COLORS, SIZES} from '../constant/theme';
import useNavigateToScreen from './Navigation';
import Icon from 'react-native-vector-icons/Entypo';
import Eys from 'react-native-vector-icons/AntDesign';

const BlogSection = ({data}) => {
  const navigation = useNavigateToScreen();
  const handleNavigation = () => {
    navigation('BlogScreen');
  };
  return (
    <>
      {data.map((item, index) => {
        return (
          <View key={index} style={styles.container}>
            <ImageBackground
              source={images.blog_bg}
              style={{height: SIZES.width * 0.59}}
              imageStyle={{resizeMode: 'stretch'}}>
              <View
                style={{
                  padding: SIZES.width * 0.039,
                  flexDirection: 'row',
                  gap: SIZES.width * 0.026,
                }}>
                <Image
                  source={item.image}
                  style={{
                    width: SIZES.width * 0.22,
                    height: SIZES.width * 0.141,
                    resizeMode: 'contain',
                  }}
                />
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.publisher}>{item.publisher}</Text>
                </View>
              </View>
              <View>
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    paddingHorizontal: SIZES.width * 0.039,
                  }}
                  style={{marginTop: 0}}>
                  {item.categories.map((category, index) => (
                    <View
                      key={index}
                      style={{marginRight: SIZES.width * 0.031}}>
                      <Text style={styles.category}>{category}</Text>
                    </View>
                  ))}
                </ScrollView>
                <View style={{padding: SIZES.width * 0.039}}>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>

              <View
                style={{
                  position: 'absolute',
                  right: SIZES.width * 0.016,
                  top: 3,
                }}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleNavigation()}>
                  <Text style={styles.buttonText}>View</Text>
                  <Image
                    source={images.button_icon}
                    style={{
                      width: SIZES.width * 0.039,
                      height: SIZES.width * 0.039,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.bottomContainer}>
                <View style={styles.flexBox}>
                  <Icon
                    name={'back-in-time'}
                    color={'#000'}
                    size={SIZES.width * 0.041}
                  />
                  <Text style={styles.bottomText}>Posted 2 days ago</Text>
                </View>
                <View style={styles.flexBox}>
                  <Eys
                    name={'eyeo'}
                    color={'#000'}
                    size={SIZES.width * 0.041}
                  />
                  <Text style={styles.bottomText}>1704</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        );
      })}
    </>
  );
};

export default BlogSection;

const styles = StyleSheet.create({
  container: {
    height: SIZES.width * 0.59,
    marginBottom: SIZES.width * 0.051,
  },
  bottomText: {
    color: COLORS.black,
    fontSize: SIZES.width * 0.031,
    fontFamily: 'KantumruyPro-Regular',
    paddingTop: 3,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottomRightRadius: SIZES.width * 0.039,
    borderBottomLeftRadius: SIZES.width * 0.039,
    height: SIZES.width * 0.102,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.width * 0.041,
  },
  buttonText: {
    fontWeight: '500',
    color: COLORS.black,
  },
  buttonContainer: {
    width: SIZES.width * 0.205,
    height: SIZES.width * 0.13,
    paddingHorizontal: SIZES.width * 0.051,
    paddingVertical: SIZES.width * 0.021,
    borderWidth: 1,
    borderRadius: SIZES.width * 0.077,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.width * 0.013,
    backgroundColor: '#FFB443',
    justifyContent: 'center',
    borderColor: '#843c14',
  },
  title: {
    fontFamily: 'KantumruyPro-Light',
    fontSize: SIZES.width * 0.031,
    color: '#494949',
  },
  publisher: {
    fontFamily: 'KantumruyPro-Light',
    fontSize: SIZES.width * 0.026,
    color: '#494949',
    paddingTop: SIZES.width * 0.021,
  },
  category: {
    fontSize: SIZES.width * 0.031,
    paddingHorizontal: SIZES.width * 0.039,
    borderWidth: 0.5,
    paddingVertical: SIZES.width * 0.013,
    borderRadius: SIZES.width * 0.039,
    backgroundColor: '#F39200',
    color: COLORS.white,
    borderColor: '#843c14',
  },
  description: {
    fontSize: SIZES.width * 0.034,
    fontFamily: 'KantumruyPro-Light',
    color: '#494949',
  },
  flexBox: {flexDirection: 'row', alignItems: 'center', gap: 5},
});
