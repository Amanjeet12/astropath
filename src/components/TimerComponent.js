import React, {useContext} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {TimerContext} from '../constant/TimerContext';

const TimerComponent = () => {
  const {seconds, isActive, toggleTimer, resetTimer} = useContext(TimerContext);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Timer: {seconds}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          <Text>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
