/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constant/theme';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/Octicons';

const AstrologerComponent = ({data}) => {
  return (
    <View>
      {data.map((item, index) => {
        return (
          <View key={index} style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '31%'}}>
                <View>
                  <Image source={item.profile} style={styles.profile} />
                  <View style={{position: 'absolute', bottom: 20, right: 5}}>
                    <Image
                      source={images.verified_icon}
                      style={{width: 20, height: 20, resizeMode: 'contain'}}
                    />
                  </View>
                  <View style={styles.ratingContainer}>
                    <Image
                      source={images.star_icon}
                      style={{width: 20, height: 20, resizeMode: 'contain'}}
                    />
                    <Text>5</Text>
                  </View>
                </View>
              </View>
              <View style={{width: '45%'}}>
                <Text style={styles.profile_name}>{item.name}</Text>
                <Text style={styles.profile_categories}>{item.categories}</Text>
                <Text style={styles.profile_language}>{item.language}</Text>
                <Text style={styles.profile_experience}>
                  Exp {item.experience}+ Years
                </Text>
                <Text style={styles.profile_rate}>₹ {item.rate}/min -Chat</Text>
              </View>
              <View style={{width: '25%', alignItems: 'flex-end'}}>
                <View style={styles.statusContainer}>
                  <Icon name="dot-fill" color={'#409261'} size={12} />
                  <Text style={styles.status}>{item.status}</Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>View</Text>
                  <Image
                    source={images.button_icon}
                    style={{width: 15, height: 15, resizeMode: 'contain'}}
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
    height: 125,
    backgroundColor: COLORS.white,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 12,
    padding: 15,
  },
  profile: {
    width: 86,
    height: 86,
    resizeMode: 'contain',
  },
  profile_name: {
    color: COLORS.black,
    fontFamily: 'DMSerifDisplay-Regular',
  },
  profile_categories: {
    color: '#707B81',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: 12,
    paddingTop: 3,
  },
  profile_language: {
    color: '#0D6EFD',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: 8,
  },
  profile_experience: {
    color: '#707B81',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: 10,
  },
  profile_rate: {
    color: '#000',
    fontFamily: 'KantumruyPro-Bold',
    fontSize: 12,
    paddingTop: 5,
  },
  status: {
    fontSize: 9,
    color: '#409261',
    fontFamily: 'KantumruyPro-Regular',
  },
  statusContainer: {
    width: 60,
    height: 20,
    backgroundColor: '#e9ffef',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    gap: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 30,
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
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 3,
    bottom: -10,
    elevation: 3,
    left: 20,
  },
});
