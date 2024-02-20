import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {COLORS, SIZES} from '../constant/theme';

const Otptextinput = () => {
  const [otp, setOtp] = useState('');

  return (
    <View>
      <OTPInputView
        style={{width: '80%', height: SIZES.width * 0.13, alignSelf: 'center'}}
        pinCount={4}
        autoFocusOnLoad={true}
        editable={true}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          setOtp(code);
        }}
      />
    </View>
  );
};

export default Otptextinput;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: SIZES.width * 0.14,
    height: SIZES.width * 0.14,
    borderRadius: SIZES.width * 0.031,
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },

  underlineStyleHighLighted: {},
});
