/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constant/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

const RatingSection = ({data}) => {
  console.log('data===>', data.ratingStats);
  if (!data) {
    return null;
  }
  const sortedRatingStats = [...data.ratingStats].sort((a, b) => b._id - a._id);

  console.log(data.ratingStats);
  const renderItem = ({item, index}) => {
    return (
      <View style={[styles.flexBox, {gap: 5}]}>
        <Text style={{fontSize: 16, color: '#000'}}>{item._id}</Text>
        <View>
          <Progress.Bar
            progress={item.totalRating / 100}
            width={130}
            height={8}
            color="#FFB443"
            unfilledColor="#D9D9D9"
            borderColor="#fff"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.flexBox}>
        <View
          style={{
            width: '45%',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <Text style={{fontSize: 18, color: '#000', letterSpacing: 1.5}}>
            Your Rating
          </Text>
          <Text style={{fontSize: 35, color: '#000', fontWeight: '700'}}>
            {data.averageRating ? Math.floor(data.averageRating) : 0}/
            <Text style={{fontSize: 20}}>5 </Text>
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon name={'star'} size={15} color={'gold'} />
            <Icon name={'star'} size={15} color={'gold'} />
            <Icon name={'star'} size={15} color={'gold'} />
            <Icon name={'star'} size={15} color={'gold'} />
            <Icon name={'star'} size={15} color={'gold'} />
          </View>
          <Text style={{fontSize: 16, color: 'grey', marginTop: 15}}>
            {data.totalCount ? data.totalCount : 0} Reviews
          </Text>
        </View>
        <View>
          <FlatList
            data={sortedRatingStats}
            scrollEnabled={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default RatingSection;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: SIZES.width * 0.051,
    height: 200,
    borderWidth: 1,
    borderColor: '#843c14',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff',
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
