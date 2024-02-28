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

const MarraigeScreenForm = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [modeTime, setModeTime] = useState('date');
  const [showDateTime, setShowDateTime] = useState('');
  const [name_m, setName_m] = useState('');
  const [place_m, setPlace_m] = useState('');
  const [lon_m, setLon_m] = useState('');
  const [lat_m, setLat_m] = useState('');
  //female

  const [name_f, setName_f] = useState('');
  const [place_f, setPlace_f] = useState('');
  const [lon_f, setLon_f] = useState('');
  const [lat_f, setLat_f] = useState('');
  const [show_f, setShow_f] = useState(false);
  const [date_f, setDate_f] = useState(new Date());
  const [mode_f, setMode_f] = useState('date');
  const [showDate_f, setShowDate_f] = useState('');
  const [showTime_f, setShowTime_f] = useState(false);
  const [dateTime_f, setDateTime_f] = useState(new Date());
  const [modeTime_f, setModeTime_f] = useState('date');
  const [showDateTime_f, setShowDateTime_f] = useState('');

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

  //female

  const showMode_f = currentMode => {
    if (Platform.OS === 'android') {
      setShow_f(false);
    }
    setMode_f(currentMode);
  };

  const showDatepicker_f = () => {
    showMode_f('date');
    setShow_f(true);
  };

  const onChange_f = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow_f(false);
    setDate_f(currentDate);
    let filter = currentDate;
    const dateToSave = currentDate.toLocaleDateString(); // convert date to string
    setShowDate_f(dateToSave);
  };

  // Time
  const showModeTime_f = currentMode => {
    if (Platform.OS === 'android') {
      setShowTime_f(false);
    }
    setModeTime_f(currentMode);
  };

  const showTimepicker_f = () => {
    showModeTime_f('time');
    setShowTime_f(true);
  };

  const onChangeTime_f = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowTime_f(false);
    setDateTime_f(currentDate);
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    setShowDateTime_f(timeString);
  };

  const handleNavigation = () => {
    if (
      name_m &&
      lat_m &&
      lon_m &&
      showDate &&
      showDateTime &&
      name_f &&
      lat_f &&
      lon_f &&
      showDate_f &&
      showDateTime_f
    ) {
      console.log(
        name_m,
        lat_m,
        lon_m,
        showDate,
        showDateTime,
        name_f,
        lat_f,
        lon_f,
        showDate_f,
        showDateTime_f,
      );
      try {
        navigation.navigate('MarraigeKundli', {
          name_m,
          lat_m,
          lon_m,
          showDate,
          showDateTime,
          name_f,
          lat_f,
          lon_f,
          showDate_f,
          showDateTime_f,
        });
      } catch (error) {
        console.log('erroring', error);
      }
    } else {
      console.log('Some values are missing');
      setToastMsg('Some values are missing');
    }
  };

  const handlePlaceSelect = (placeName, lat, lng) => {
    setPlace_m(placeName);
    setLat_m(lat);
    setLon_m(lng);
    console.log(placeName, lat, lng);
  };

  const handleNavigateToSearchPlaceScreen = () => {
    navigation.navigate('SearchPlaceScreen', {
      onPlaceSelect: handlePlaceSelect,
    });
  };
  const handlePlaceSelectF = (placeName, lat, lng) => {
    setPlace_f(placeName);
    setLat_f(lat);
    setLon_f(lng);
    console.log(placeName, lat, lng);
  };

  const handleNavigateToSearchPlaceScreenF = () => {
    navigation.navigate('SearchPlaceScreen', {
      onPlaceSelect: handlePlaceSelectF,
    });
  };

  return (
    <>
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
                <BackButton placeholder={'Free Kundli'} />
              </View>
              <View style={{marginTop: SIZES.width * 0.06}}>
                <View
                  style={{
                    paddingBottom: SIZES.width * 0.021,
                    borderBottomWidth: 2,
                    borderColor: '#F39200',
                  }}>
                  <Text style={{fontSize: 21, fontFamily: '', color: '#000'}}>
                    Enter boy's details
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
                    }}
                    keyboardType="default"
                    placeholderTextColor={'#000'}
                    onChangeText={text => setName_m(text)}
                  />
                </View>
              </View>
              <View style={{marginTop: SIZES.width * 0.026}}>
                <Text style={styles.title}>Time of Birth</Text>
                <TouchableOpacity
                  style={styles.mainContainer2}
                  onPress={showTimepicker}
                  activeOpacity={0.7}>
                  <View
                    style={{width: '90%', paddingLeft: SIZES.width * 0.039}}>
                    <Text style={{color: '#000'}}>
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
                  <View
                    style={{width: '90%', paddingLeft: SIZES.width * 0.046}}>
                    <Text style={{color: '#000'}}>
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
                      <Text style={{fontSize: 14, color: '#000'}}>
                        {place_m ? place_m : `Enter Birth place`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* // girl details */}
              <View style={{marginTop: SIZES.width * 0.06}}>
                <View
                  style={{
                    paddingBottom: SIZES.width * 0.021,
                    borderBottomWidth: 2,
                    borderColor: '#F39200',
                  }}>
                  <Text style={{fontSize: 21, fontFamily: '', color: '#000'}}>
                    Enter girl's details
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
                    }}
                    keyboardType="default"
                    placeholderTextColor={'#000'}
                    onChangeText={text => setName_f(text)}
                  />
                </View>
              </View>

              <View style={{marginTop: SIZES.width * 0.026}}>
                <Text style={styles.title}>Time of Birth</Text>
                <TouchableOpacity
                  style={styles.mainContainer2}
                  onPress={showTimepicker_f}
                  activeOpacity={0.7}>
                  <View
                    style={{width: '90%', paddingLeft: SIZES.width * 0.039}}>
                    <Text style={{color: '#000'}}>
                      {showDateTime_f ? showDateTime_f : 'Enter Birth Time'}
                    </Text>
                  </View>
                  {showTime_f && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dateTime}
                      mode={modeTime}
                      is24Hour={true}
                      onChange={onChangeTime_f}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{marginTop: SIZES.width * 0.026}}>
                <Text style={styles.title}>Date of Birth</Text>
                <TouchableOpacity
                  style={styles.mainContainer2}
                  onPress={showDatepicker_f}
                  activeOpacity={0.7}>
                  <View
                    style={{width: '90%', paddingLeft: SIZES.width * 0.046}}>
                    <Text style={{color: '#000'}}>
                      {showDate_f ? showDate_f : 'Enter DOB'}
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
                  {show_f && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      onChange={onChange_f}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{marginTop: SIZES.width * 0.026}}>
                <Text style={styles.title}>Place of Birth</Text>
                <View style={{marginTop: SIZES.width * 0.026}}>
                  <TouchableOpacity
                    style={[styles.mainContainer2]}
                    onPress={() => handleNavigateToSearchPlaceScreenF()}>
                    <View
                      style={{
                        paddingLeft: SIZES.width * 0.051,
                        color: COLORS.black,
                        textTransform: 'capitalize',
                      }}>
                      <Text style={{fontSize: 14, color: '#000'}}>
                        {place_f ? place_f : `Enter Birth place`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.button_position}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleNavigation()}>
                  <Text style={styles.title}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
};

export default MarraigeScreenForm;

const styles = StyleSheet.create({
  mainContainer: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    marginVertical: SIZES.width * 0.013,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  title: {
    fontSize: SIZES.width * 0.036,
    color: '#000',
  },
  button_position: {
    position: 'relative',
    marginBottom: SIZES.width * 0.05,
  },
  buttonContainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.051,
    backgroundColor: '#FFB443',
    borderRadius: SIZES.width * 0.039,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer2: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: 8,
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
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
