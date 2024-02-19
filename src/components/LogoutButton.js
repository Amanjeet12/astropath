import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {images} from '../constant';

const LogoutButton = () => {
  return (
    <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.6}>
      <Image
        source={images.logout}
        style={{width: 20, height: 20, resizeMode: 'contain'}}
      />
      <Text style={styles.button_text}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 210,
    height: 45,
    borderWidth: 1,
    backgroundColor: '#FFB443',
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 10,
    elevation: 4,
  },
  button_text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
