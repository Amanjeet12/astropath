import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constant/theme';

const CommontextinputWE = ({placeholder}) => {
  return (
    <View style={styles.mainContainer}>
      <TextInput
        placeholder={placeholder}
        style={{paddingLeft: 20, color: COLORS.black}}
        keyboardType="default"
        placeholderTextColor={COLORS.black}
      />
    </View>
  );
};

export default CommontextinputWE;

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 3,
  },
});
