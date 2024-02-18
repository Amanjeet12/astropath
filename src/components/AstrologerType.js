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
      style={[styles.thumbnailSinglecontainer, {marginRight: 15}]}>
      <Image source={item.image} style={[styles.thumbnail]} />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'KantumruyPro-Regular',
          fontSize: 14,
          color: '#000',
          marginTop: 10,
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
        contentContainerStyle={{paddingRight: 20}}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default AstrologerType;

const styles = StyleSheet.create({
  thumbnailContainer: {
    height: 130,
    marginTop: 10,
    paddingLeft: 20,
  },
  thumbnail: {
    width: 100,
    height: 70,
    resizeMode: 'contain',
    justifyContent: 'center',
    borderRadius: SIZES.width * 0.026,
  },
  thumbnailSinglecontainer: {
    width: 130,
    height: 130,
    backgroundColor: '#fae1d0',
    paddingRight: SIZES.width * 0.026,
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    padding: 3,
  },
});
