/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';

const data = [
  {label: 'Male', value: '1'},
  {label: 'Female', value: '2'},
];

const SingleKundaliForm = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [modeTime, setModeTime] = useState('date');
  const [showDateTime, setShowDateTime] = useState('');
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [value, setValue] = useState(data[0].label); // Selects 'Male' by default
  const [isFocus, setIsFocus] = useState(false);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

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
    try {
      if (name && value && showDateTime && showDate && lat && lon) {
        console.log(name, value, showDateTime, showDate, lat, lon);
        navigation.navigate('SingleKundli', {
          name,
          value,
          showDateTime,
          showDate,
          lat,
          lon,
        });
      } else {
        console.log('Some values are missing');
        setToastMsg('All feilds are compalsary');
      }
    } catch (error) {
      console.log('erroring', error);
    }
  };

  const handlePlaceSelect = (placeName, lat, lng) => {
    setPlace(placeName);
    setLat(lat);
    setLon(lng);
    console.log(placeName, lat, lng);
  };

  const handleNavigateToSearchPlaceScreen = () => {
    navigation.navigate('SearchPlaceScreen', {
      onPlaceSelect: handlePlaceSelect,
    });
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />

      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 20}}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View style={{width: SIZES.width * 0.65}}>
              <BackButton placeholder={'Your Kundli'} />
            </View>
            <View style={{marginTop: SIZES.width * 0.06}}>
              <View
                style={{
                  paddingBottom: SIZES.width * 0.021,
                  borderBottomWidth: 2,
                  borderColor: '#F39200',
                }}>
                <Text
                  style={{
                    fontSize: SIZES.width * 0.051,
                    fontFamily: '',
                    color: '#000',
                  }}>
                  Create a new kundli
                </Text>
              </View>
              <Text style={[styles.title, {marginTop: SIZES.width * 0.051}]}>
                Full Name
              </Text>
              <View style={styles.mainContainer}>
                <TextInput
                  placeholder={'Enter your Full Name'}
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: COLORS.black,
                    fontSize: SIZES.width * 0.036,
                  }}
                  keyboardType="default"
                  placeholderTextColor={'#000'}
                  onChangeText={text => setName(text)}
                />
              </View>
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={styles.title}>Select Gender</Text>
              <View style={styles.mainContainer}>
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                  placeholderStyle={{
                    fontSize: SIZES.width * 0.036,
                    color: '#000',
                    paddingLeft: SIZES.width * 0.026,
                  }}
                  selectedTextStyle={{
                    fontSize: SIZES.width * 0.036,
                    color: '#000',
                    paddingLeft: SIZES.width * 0.026,
                  }}
                  itemTextStyle={{
                    fontSize: SIZES.width * 0.031,
                    padding: 0,
                    color: 'grey',
                  }}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select Gender' : '...'}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.label);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={styles.title}>Time of Birth</Text>
              <TouchableOpacity
                style={styles.mainContainer2}
                onPress={showTimepicker}
                activeOpacity={0.7}>
                <View style={{width: '90%', paddingLeft: SIZES.width * 0.039}}>
                  <Text style={{color: '#000', fontSize: SIZES.width * 0.036}}>
                    {showDateTime ? showDateTime : 'Enter Birth Time'}
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
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={styles.title}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.mainContainer2}
                onPress={showDatepicker}
                activeOpacity={0.7}>
                <View style={{width: '90%', paddingLeft: SIZES.width * 0.046}}>
                  <Text style={{color: '#000', fontSize: SIZES.width * 0.036}}>
                    {showDate ? showDate : 'Enter DOB'}
                  </Text>
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
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={styles.title}>Place of Birth</Text>
              <View style={{marginTop: SIZES.width * 0.026}}>
                <TouchableOpacity
                  style={[styles.mainContainer2]}
                  onPress={() => handleNavigateToSearchPlaceScreen()}>
                  <View
                    style={{
                      paddingLeft: SIZES.width * 0.051,
                      color: COLORS.black,
                      textTransform: 'capitalize',
                    }}>
                    <Text
                      style={{fontSize: SIZES.width * 0.036, color: '#000'}}>
                      {place ? place : `Enter Birth place`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.button_position}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleNavigation()}>
                <Text
                  style={[
                    styles.title,
                    {fontWeight: '500', fontSize: SIZES.width * 0.041},
                  ]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SingleKundaliForm;

const styles = StyleSheet.create({
  mainContainer: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.width * 0.01,
    marginVertical: SIZES.width * 0.013,
    borderColor: 'gray',
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  title: {
    fontSize: SIZES.width * 0.036,
    color: '#000',
  },
  button_position: {
    position: 'relative',
  },
  buttonContainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.051,
    backgroundColor: '#FFB443',
    borderRadius: SIZES.width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer2: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.width * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.width * 0.013,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  //

  dropdown: {
    height: SIZES.width * 0.13,
    borderColor: 'gray',
    borderWidth: 0.1,
    // borderRadius: 8,
    paddingHorizontal: 8,
  },
});
