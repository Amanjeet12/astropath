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
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Male', value: '1'},
  {label: 'Female', value: '2'},
];

const SingleForm = () => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [modeTime, setModeTime] = useState('date');
  const [showDateTime, setShowDateTime] = useState('');

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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

  // Time

  const showModeTime = currentMode => {
    if (Platform.OS === 'android') {
      setShowTime(false);
    }
    setModeTime(currentMode);
  };

  const showTimepicker = () => {
    showModeTime('time');
    setShowTime(true);
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowTime(false);
    setDateTime(currentDate);
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    setShowDateTime(timeString);
  };
  const handleNavigation = () => {
    console.log('');
  };
  return (
    <>
      <View>
        <Text style={styles.title}>Full Name</Text>
        <View style={styles.mainContainer}>
          <TextInput
            placeholder={'Enter your Full Name'}
            style={{paddingLeft: 20, color: COLORS.black}}
            keyboardType="default"
            placeholderTextColor={'grey'}
          />
        </View>
      </View>
      {/* <View style={{marginTop: 10}}>
        <Text style={styles.title}>Select Gender</Text>
        <View style={styles.mainContainer}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={{fontSize: 14, color: 'grey'}}
            selectedTextStyle={{fontSize: 14, color: 'grey'}}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Gender' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
      </View> */}
      <View style={{marginTop: 10}}>
        <Text style={styles.title}>Time of Birth</Text>
        <TouchableOpacity
          style={styles.mainContainer2}
          onPress={showTimepicker}
          activeOpacity={0.7}>
          <View style={{width: '90%', paddingLeft: 15}}>
            <Text style={{color: 'grey'}}>
              {showDateTime ? showDateTime : 'placeholder'}
            </Text>
          </View>
          {showTime && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateTime}
              mode={modeTime}
              is24Hour={true}
              onChange={onChangeTime}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.title}>Date of Birth</Text>
        <TouchableOpacity
          style={styles.mainContainer2}
          onPress={showDatepicker}
          activeOpacity={0.7}>
          <View style={{width: '90%', paddingLeft: 18}}>
            <Text style={{color: 'grey'}}>
              {showDate ? showDate : 'Enter DOB'}
            </Text>
          </View>
          <View>
            <Image
              source={images.calendet_icon}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
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
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.title}>Place of Birth</Text>
        <View style={styles.mainContainer}>
          <TextInput
            placeholder={'Enter your Full Name'}
            style={{paddingLeft: 20, color: COLORS.black}}
            keyboardType="default"
            placeholderTextColor={'grey'}
          />
        </View>
      </View>
      {/* <View style={styles.button_position}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handleNavigation()}>
          <Text style={styles.title}>Submit</Text>
        </TouchableOpacity>
      </View> */}
    </>
  );
};

export default SingleForm;

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    marginVertical: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  title: {
    fontSize: 14,
    color: '#000',
  },
  button_position: {
    position: 'relative',
  },
  buttonContainer: {
    height: 50,
    marginTop: 20,
    backgroundColor: '#FFB443',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer2: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  //

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
