/* eslint-disable quotes */
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
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import RecentKundali from '../../components/RecentKundali';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
  {label: 'Male', value: '1'},
  {label: 'Female', value: '2'},
];

const NumerologyFormScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date('1985-01-01T11:05:00.000Z'));
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [value, setValue] = useState(data[0].label); // Selects 'Male' by default
  const [isFocus, setIsFocus] = useState(false);
  const [lat, setLat] = useState('28.7041');
  const [lon, setLon] = useState('77.1025');
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [Time, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showTime, setShowTime] = useState('');
  const [hour, setHour] = useState('');
  const [min, setMinute] = useState('');
  const [showDay, setShowDay] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [recent, setRecent] = useState('');
  const [timeZone, setTimeZone] = useState('+5.30');

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  useEffect(() => {
    const retrieveItems = async () => {
      try {
        const items = await AsyncStorage.getItem('kundliItems');
        if (items !== null) {
          const parsedItems = JSON.parse(items);
          // Use parsedItems array as needed
          console.log(items);
          setRecent(parsedItems);
        }
      } catch (error) {
        console.error('Error retrieving items from AsyncStorage:', error);
      }
    };

    retrieveItems();
  }, []);

  const handleNavigation = async () => {
    const item = {name, day, month, year, hour, min, lat, lon, value, timeZone};
    console.log(item);
    dispatch(addToCart(item));
    try {
      console.log(name, day, month, year, hour, min, lat, lon, value);
      try {
        const existingItems = await AsyncStorage.getItem('kundliItems');
        let items = existingItems ? JSON.parse(existingItems) : [];
        items.push(item);
        await AsyncStorage.setItem('kundliItems', JSON.stringify(items));
      } catch (error) {
        console.log(error);
      }

      if (
        name &&
        day &&
        month &&
        year &&
        hour !== null &&
        min !== null &&
        lat &&
        lon &&
        value &&
        timeZone
      ) {
        navigation.navigate('NumerologyScreen', {
          name,
          day,
          month,
          year,
          hour,
          min,
          lat,
          lon,
          timeZone,
        });
      } else {
        console.log('Some values are missing');
        setToastMsg('All feilds are compalsary');
      }
    } catch (error) {
      console.log('erroring', error);
    }
  };

  const handlePlaceSelect = (placeName, lat, lng, timeZone) => {
    setPlace(placeName);
    setLat(lat ? lat : '28.7041');
    setLon(lng ? lng : '77.1025');
    setTimeZone(timeZone ? timeZone : '+5.30');
    console.log(placeName, lat, lng, timeZone);
  };

  const handleNavigateToSearchPlaceScreen = () => {
    navigation.navigate('SearchPlaceScreen', {
      onPlaceSelect: handlePlaceSelect,
    });
  };

  const setHandleTime = item => {
    const birthTimeUTC = new Date(item);
    const birthTimeLocal = birthTimeUTC.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    setShowTime(birthTimeLocal);
    setHour(birthTimeUTC.getHours());
    setMinute(birthTimeUTC.getMinutes());
    console.log(birthTimeUTC.getHours(), birthTimeUTC.getMinutes());
  };

  const setHandleDate = item => {
    const birthDayUTC = new Date(item);
    const birthDateLocal = birthDayUTC.toLocaleDateString();
    setDay(birthDayUTC.getDate());
    const month = birthDayUTC.getMonth() + 1;
    setMonth(month);
    setYear(birthDayUTC.getFullYear());
    setShowDay(birthDateLocal);
    console.log(
      birthDayUTC.getDate(),
      birthDayUTC.getMonth() + 1,
      birthDayUTC.getFullYear(),
    );
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
              <BackButton placeholder={'Numerology'} />
            </View>
            {recent && recent.length > 0 && (
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
                      fontFamily: 'KantumruyPro-Regular',
                      color: '#000',
                    }}>
                    Recent Search
                  </Text>
                </View>
                <View>
                  <RecentKundali data={recent} screen={'NumerologyScreen'} />
                </View>
              </View>
            )}

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
                    fontFamily: 'KantumruyPro-Regular',
                    color: '#000',
                  }}>
                  Create a new numerology
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
                onPress={() => {
                  setOpenTime(true);
                }}>
                <Text
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: '#000',
                  }}>
                  {showTime ? showTime : 'Enter Time Of Birth'}
                </Text>

                <DatePicker
                  modal
                  open={openTime}
                  date={Time}
                  mode="time"
                  is24hourSource="locale"
                  locale="en-GB" // Use a locale that defaults to 24-hour format
                  onConfirm={time => {
                    setOpenTime(false);
                    setTime(time);
                    setHandleTime(time);
                    console.log(time);
                  }}
                  onCancel={() => {
                    setOpenTime(false);
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={styles.title}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.mainContainer2}
                onPress={() => {
                  setOpen(true);
                }}>
                <Text style={{paddingLeft: SIZES.width * 0.051, color: '#000'}}>
                  {/* {date.toLocaleDateString()} */}
                  {showDay ? showDay : 'Enter You Birth Date'}
                </Text>

                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode="date"
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                    setHandleDate(date);
                    console.log(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
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
                      {place ? place : 'Delhi'}
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

export default NumerologyFormScreen;

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
    marginBottom: SIZES.width * 0.06,
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
