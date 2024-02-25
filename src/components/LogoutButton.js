import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {images} from '../constant';
import {SIZES} from '../constant/theme';

const LogoutButton = () => {
  return (
    <View style={styles.buttonContainer}>
      <Image
        source={images.logout}
        style={{
          width: SIZES.width * 0.051,
          height: SIZES.width * 0.051,
          resizeMode: 'contain',
        }}
      />
      <Text style={styles.button_text}>Logout</Text>
    </View>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: SIZES.width * 0.51,
    height: SIZES.width * 0.115,
    borderWidth: 1,
    backgroundColor: '#FFB443',
    marginBottom: SIZES.width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.width * 0.039,
    flexDirection: 'row',
    gap: SIZES.width * 0.026,
    elevation: 4,
  },
  button_text: {
    fontSize: SIZES.width * 0.041,
    color: '#000',
    fontWeight: '500',
  },
});
