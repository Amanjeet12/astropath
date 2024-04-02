/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Alert} from 'react-native';
import {TimerContext} from '../constant/TimerContext';
import {COLORS} from '../constant/theme';
import Icon from 'react-native-vector-icons/AntDesign';

const TimerComponent = () => {
  const [second, setSeconds] = useState('');
  const {
    seconds,
    isActive,
    toggleTimer,
    resetTimer,
    isVisible,
    showTimer,
    hideTimer,
  } = useContext(TimerContext);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  useEffect(() => {
    if (isActive && seconds > 0) {
      const timer = setInterval(() => {
        // Update the timer context's seconds
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isActive, seconds]);

  const handleRequest = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to cancel the request?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            hideTimer();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    isVisible && (
      <View style={styles.container}>
        <View>
          <Icon name={'clockcircleo'} size={20} color={'#fff'} />
        </View>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}>
            Our astrologer connect with you in
          </Text>
          <View>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                paddingTop: 10,
                paddingRight: 30,
              }}>
              {minutes < 10 ? '0' + minutes : minutes}:
              {remainingSeconds < 10
                ? '0' + remainingSeconds
                : remainingSeconds}
            </Text>
          </View>
          <TouchableOpacity style={{marginRight: 10}} onPress={handleRequest}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
                borderWidth: 1,
                marginTop: 7,
                padding: 5,
                borderColor: '#fff',
              }}>
              <Text>Cancel Request</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    gap: 10,
    height: 120,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  timer: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
});

export default TimerComponent;
