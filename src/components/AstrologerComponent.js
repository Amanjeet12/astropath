/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constant/theme';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

const AstrologerComponent = ({data}) => {
  const navigation = useNavigation();
  const handlenavigation = item => {
    navigation.navigate('SingleAstrologer', {item});
  };
  return (
    <View>
      {data &&
        data.map((item, index) => {
          return (
            <View key={index} style={styles.container}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '31%'}}>
                  <View>
                    <Image
                      source={{uri: item.profile_photo}}
                      style={styles.profile}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        bottom: SIZES.width * 0.051,
                        right: 5,
                      }}>
                      <Image
                        source={images.verified_icon}
                        style={{
                          width: SIZES.width * 0.051,
                          height: SIZES.width * 0.051,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <View style={styles.ratingContainer}>
                      <Image
                        source={images.star_icon}
                        style={{
                          width: SIZES.width * 0.051,
                          height: SIZES.width * 0.051,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text style={{color: 'grey'}}>5</Text>
                    </View>
                  </View>
                </View>
                <View style={{width: '45%'}}>
                  <Text style={styles.profile_name}>{item.name}</Text>
                  <Text style={styles.profile_categories}>{item.gender}</Text>
                  <Text style={styles.profile_language}>{item.language}</Text>
                  <Text style={styles.profile_experience}>Exp 4+ Years</Text>
                  <Text style={styles.profile_rate}>
                    ₹ {item.chat_price}/min - chat
                  </Text>
                </View>
                <View style={{width: '25%', alignItems: 'flex-end'}}>
                  <View style={styles.statusContainer}>
                    <Icon
                      name="dot-fill"
                      color={'#409261'}
                      size={SIZES.width * 0.031}
                    />
                    <Text style={styles.status}>
                      {item.is_active ? 'online' : 'offline'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => handlenavigation(item)}>
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
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default AstrologerComponent;

const styles = StyleSheet.create({
  container: {
    height: SIZES.width * 0.32,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.width * 0.051,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: SIZES.width * 0.031,
    padding: SIZES.width * 0.039,
  },
  profile: {
    width: SIZES.width * 0.22,
    height: SIZES.width * 0.22,
    resizeMode: 'contain',
  },
  profile_name: {
    color: COLORS.black,
    fontFamily: 'DMSerifDisplay-Regular',
  },
  profile_categories: {
    color: '#707B81',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.031,
    paddingTop: 3,
  },
  profile_language: {
    color: '#0D6EFD',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.021,
  },
  profile_experience: {
    color: '#707B81',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.026,
  },
  profile_rate: {
    color: '#000',
    fontFamily: 'KantumruyPro-regular',
    fontSize: SIZES.width * 0.028,
    paddingTop: 5,
  },
  status: {
    fontSize: SIZES.width * 0.023,
    color: '#409261',
    fontFamily: 'KantumruyPro-Regular',
  },
  statusContainer: {
    width: SIZES.width * 0.13,
    height: SIZES.width * 0.051,
    backgroundColor: '#e9ffef',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.width * 0.031,
    justifyContent: 'center',
    gap: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: SIZES.width * 0.051,
    paddingVertical: SIZES.width * 0.021,
    borderWidth: 1,
    borderRadius: SIZES.width * 0.077,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFB443',
  },
  buttonText: {
    fontWeight: '700',
    color: COLORS.black,
  },
  ratingContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.width * 0.026,
    borderRadius: SIZES.width * 0.026,
    paddingVertical: 3,
    bottom: -SIZES.width * 0.026,
    elevation: 3,
    left: SIZES.width * 0.051,
  },
});
