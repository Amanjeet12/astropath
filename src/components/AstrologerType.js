/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZES} from '../constant/theme';

const AstrologerType = ({data}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      setSelectedImage(data[0]);
    }
  }, [data]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => setSelectedImage(item)}
      style={[
        styles.thumbnailSinglecontainer,
        {marginRight: SIZES.width * 0.039},
      ]}>
      <Image source={item.image} style={[styles.thumbnail]} />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'KantumruyPro-Regular',
          fontSize: SIZES.width * 0.036,
          color: '#000',
          marginTop: SIZES.width * 0.026,
          paddingLeft: 1,
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.thumbnailContainer}
        contentContainerStyle={{paddingRight: SIZES.width * 0.051}}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default AstrologerType;

const styles = StyleSheet.create({
  thumbnailContainer: {
    height: SIZES.width * 0.33,
    marginTop: SIZES.width * 0.026,
    paddingLeft: SIZES.width * 0.051,
  },
  thumbnail: {
    width: SIZES.width * 0.2,
    height: SIZES.width * 0.18,
    resizeMode: 'contain',
    justifyContent: 'center',
    borderRadius: SIZES.width * 0.026,
  },
  thumbnailSinglecontainer: {
    width: SIZES.width * 0.33,
    height: SIZES.width * 0.33,
    backgroundColor: '#fae1d0',
    paddingRight: SIZES.width * 0.026,
    alignItems: 'center',
    borderRadius: SIZES.width * 0.039,
    paddingVertical: SIZES.width * 0.039,
    padding: 3,
  },
});
