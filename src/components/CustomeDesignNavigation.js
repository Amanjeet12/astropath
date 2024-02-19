import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {images} from '../constant';
import Icon from 'react-native-vector-icons/Entypo';

const CustomeDesignNavigation = ({title, icon, screen}) => {
  return (
    <TouchableOpacity style={styles.flexContainer}>
      <View style={{width: '10%'}}>
        <Image
          source={icon}
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />
      </View>
      <View style={{width: '75%'}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{width: '15%', alignItems: 'center'}}>
        <Icon name={'chevron-small-right'} size={30} color={'#000'} />
      </View>
    </TouchableOpacity>
  );
};

export default CustomeDesignNavigation;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    marginTop: 5,
    borderColor: '#FFD9A0',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
});
