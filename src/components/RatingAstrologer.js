/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constant/theme';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/FontAwesome';

const RatingAstrologer = ({data}) => {
  if (!data) {
    return null;
  }
  return (
    <View
      style={{
        marginTop: 30,
        padding: 10,
        backgroundColor: '#fff',
        paddingBottom: 20,
      }}>
      {data.map((item, index) => {
        const stars = [];
        for (let i = 0; i < item.rating; i++) {
          stars.push(
            <Icon key={i} name={'star'} size={14} color={'#FFB443'} />,
          );
        }
        return (
          <View key={index} style={styles.container}>
            <View>
              <Image
                source={images.Profile1}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  borderRadius: 55,
                  borderColor: 'red',
                  borderWidth: 0.5,
                }}
              />
            </View>
            <View>
              <Text
                key={index}
                style={{
                  fontSize: 18,
                  color: '#000',
                  textTransform: 'capitalize',
                }}>
                {item.customerName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 5,
                }}>
                {stars}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  textTransform: 'capitalize',
                  paddingTop: 5,
                }}>
                {item.review}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default RatingAstrologer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
});
