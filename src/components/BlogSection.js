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
import {COLORS} from '../constant/theme';
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
              style={{height: 232}}
              imageStyle={{resizeMode: 'stretch'}}>
              <View style={{padding: 15, flexDirection: 'row', gap: 10}}>
                <Image
                  source={item.image}
                  style={{width: 85, height: 55, resizeMode: 'contain'}}
                />
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.publisher}>{item.publisher}</Text>
                </View>
              </View>
              <View>
                <ScrollView
                  horizontal
                  contentContainerStyle={{paddingHorizontal: 15}}
                  style={{marginTop: 0}}>
                  {item.categories.map((category, index) => (
                    <View key={index} style={{marginRight: 12}}>
                      <Text style={styles.category}>{category}</Text>
                    </View>
                  ))}
                </ScrollView>
                <View style={{padding: 15}}>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>

              <View style={{position: 'absolute', right: 6, top: 3}}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleNavigation()}>
                  <Text style={styles.buttonText}>View</Text>
                  <Image
                    source={images.button_icon}
                    style={{width: 15, height: 15, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.bottomContainer}>
                <View style={styles.flexBox}>
                  <Icon name={'back-in-time'} color={'#000'} size={16} />
                  <Text style={styles.bottomText}>Posted 2 days ago</Text>
                </View>
                <View style={styles.flexBox}>
                  <Eys name={'eyeo'} color={'#000'} size={16} />
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
    height: 232,
    marginBottom: 20,
  },
  bottomText: {
    color: COLORS.black,
    fontSize: 12,
    fontFamily: 'KantumruyPro-Regular',
    paddingTop: 3,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  buttonText: {
    fontWeight: '500',
    color: COLORS.black,
  },
  buttonContainer: {
    width: 85,
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFB443',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'KantumruyPro-Light',
    fontSize: 12,
    color: '#494949',
  },
  publisher: {
    fontFamily: 'KantumruyPro-Light',
    fontSize: 10,
    color: '#494949',
    paddingTop: 8,
  },
  category: {
    fontSize: 12,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: '#F39200',
    color: COLORS.white,
  },
  description: {
    fontSize: 13,
    fontFamily: 'KantumruyPro-Light',
    color: '#494949',
  },
  flexBox: {flexDirection: 'row', alignItems: 'center', gap: 5},
});
