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

const TimePickerComponent = ({placeholder}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState('');

  const showMode = currentMode => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    setShowDate(timeString);
  };
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={showTimepicker}
      activeOpacity={0.7}>
      <View style={{width: '90%', paddingLeft: 15}}>
        <Text style={{color: '#000'}}>{showDate ? showDate : placeholder}</Text>
      </View>
      {/* <View>
        <Image
          source={images.calendet_icon}
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />
      </View> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
  );
};

export default TimePickerComponent;

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
