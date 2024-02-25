import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {COLORS, SIZES} from '../constant/theme';

const Otptextinput = ({onOtpFilled}) => {
  const [otp, setOtp] = useState('');

  const handleOtpFilled = code => {
    if (code.length === 6) {
      setOtp(code);
      onOtpFilled(code);
    }
  };

  return (
    <View>
      <OTPInputView
        style={{width: '100%', height: SIZES.width * 0.13, alignSelf: 'center'}}
        pinCount={6}
        autoFocusOnLoad={true}
        editable={true}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={handleOtpFilled}
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
