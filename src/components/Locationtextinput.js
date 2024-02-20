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
import {COLORS, SIZES} from '../constant/theme';
import {images} from '../constant';
import DateTimePicker from '@react-native-community/datetimepicker';

const Locationtextinput = ({placeholder}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={{width: '90%'}}>
        <TextInput
          placeholder={placeholder}
          style={{paddingLeft: SIZES.width * 0.051, color: COLORS.black}}
          keyboardType="default"
          placeholderTextColor={COLORS.black}
        />
      </View>
      <View>
        <Image
          source={images.location_icon}
          style={{
            width: SIZES.width * 0.051,
            height: SIZES.width * 0.051,
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
};

export default Locationtextinput;

const styles = StyleSheet.create({
  mainContainer: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.width * 0.039,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
