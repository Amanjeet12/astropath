/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Alert} from 'react-native';
import {TimerContext} from '../constant/TimerContext';
import {COLORS} from '../constant/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  console.log(remainingSeconds);

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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: '13%'}}>
            <Icon name={'telegram'} size={30} color={'#843c14'} />
          </View>
          <View style={{width: '65%'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                fontWeight: '600',
                textTransform: 'capitalize',
              }}>
              Chat Request Send
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
                textTransform: 'capitalize',
              }}>
              Our astrologer will revert in
            </Text>
          </View>
          {remainingSeconds !== 0 ? (
            <View>
              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingRight: 30,
                }}>
                {minutes < 10 ? '0' + minutes : minutes}:
                {remainingSeconds < 10
                  ? '0' + remainingSeconds
                  : remainingSeconds}
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleRequest}>
              <View
                style={{
                  textAlign: 'center',
                  borderWidth: 1,
                  marginTop: 7,
                  padding: 5,
                  borderColor: '#fff',
                  paddingHorizontal: 15,
                }}>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}> Cancel</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 75,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#ffb443',
    flexDirection: 'row',
    gap: 10,
    height: 70,
    justifyContent: 'flex-start',
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
