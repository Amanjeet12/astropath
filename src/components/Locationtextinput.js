import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constant/theme';
import {images} from '../constant';
import DateTimePicker from '@react-native-community/datetimepicker';

const Locationtextinput = ({placeholder}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={{width: '90%'}}>
        <TextInput
          placeholder={placeholder}
          style={{paddingLeft: 20, color: COLORS.black}}
          keyboardType="default"
          placeholderTextColor={COLORS.black}
        />
      </View>
      <View>
        <Image
          source={images.location_icon}
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />
      </View>
    </View>
  );
};

export default Locationtextinput;

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
