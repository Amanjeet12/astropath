import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.flexBox}
      onPress={() => navigation.goBack()}>
      <Icon
        name="chevron-thin-left"
        color={'#000'}
        size={24}
        style={{paddingTop: 5}}
      />
      <Text style={styles.title}>Account</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: 22,
    color: '#000',
  },
});
