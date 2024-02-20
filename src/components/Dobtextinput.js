import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../constant/theme';
import {images} from '../constant';
import DateTimePicker from '@react-native-community/datetimepicker';

const Dobtextinput = ({placeholder}) => {
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

  const showDatepicker = () => {
    showMode('date');
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    let filter = currentDate;
    const dateToSave = currentDate.toLocaleDateString(); // convert date to string
    setShowDate(dateToSave);
  };

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={showDatepicker}
      activeOpacity={0.7}>
      <View style={{width: '90%', paddingLeft: SIZES.width * 0.039}}>
        <Text style={{color: '#000'}}>{showDate ? showDate : placeholder}</Text>
      </View>
      <View>
        <Image
          source={images.calendet_icon}
          style={{
            width: SIZES.width * 0.051,
            height: SIZES.width * 0.051,
            resizeMode: 'contain',
          }}
        />
      </View>
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

export default Dobtextinput;

const styles = StyleSheet.create({
  mainContainer: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.width * 0.039,
    elevation: SIZES.width * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
