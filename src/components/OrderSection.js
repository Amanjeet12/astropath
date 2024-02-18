import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constant/theme';
import Icon from 'react-native-vector-icons/Entypo';

const OrderSection = ({data}) => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <View key={index} style={styles.container}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.categories}>{item.categories}</Text>
              <Text style={styles.experience}>
                Exp: {item.experience}+ Years
              </Text>
              <Text style={styles.cost}>Total Cost -{item.cost}</Text>
            </View>
            <View
              style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <Text style={[styles.categories, {color: COLORS.black}]}>
                Duration - {item.duration}mins
              </Text>
              <TouchableOpacity style={styles.starContainer}>
                <Text style={[styles.categories, {color: '#000'}]}>Rate</Text>
                <Icon name={'star'} color={'#000'} size={16} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default OrderSection;

const styles = StyleSheet.create({
  container: {
    height: 120,
    marginTop: 20,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
    fontSize: 14,
  },
  categories: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: 12,
    color: '#707B81',
    paddingTop: 5,
  },
  experience: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: 12,
    color: '#707B81',
  },
  cost: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: 10,
    color: COLORS.black,
    paddingTop: 3,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 15,
    backgroundColor: '#FFB443',
  },
});
