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
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import DatePicker from 'react-native-date-picker';
import {useTranslation} from 'react-i18next';
import NetInfo from '@react-native-community/netinfo';

const MarraigeScreenForm = ({navigation}) => {
  const {t} = useTranslation();

  const [name_m, setName_m] = useState('');
  const [place_m, setPlace_m] = useState('');
  const [lon_m, setLon_m] = useState('28.7041');
  const [lat_m, setLat_m] = useState('77.1025');
  const [day_m, setDay_m] = useState('');
  const [month_m, setMonth_m] = useState('');
  const [year_m, setYear_m] = useState('');
  const [hour_m, setHour_m] = useState('');
  const [min_m, setMin_m] = useState('');
  const [showTime, setShowTime] = useState('');
  const [showDay, setShowDay] = useState('');

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date('1985-01-01T11:05:00.000Z'));
  const [openTime, setOpenTime] = useState(false);
  const [Time, setTime] = useState(new Date());

  const [open_f, setOpen_F] = useState(false);
  const [date_f, setDate_f] = useState(new Date('1985-01-01T11:05:00.000Z'));
  const [openTime_f, setOpenTime_f] = useState(false);
  const [Time_f, setTime_f] = useState(new Date());
  const [day_f, setDay_f] = useState('');
  const [month_f, setMonth_f] = useState('');
  const [year_f, setYear_f] = useState('');
  const [hour_f, setHour_f] = useState('');
  const [min_f, setMin_f] = useState('');
  const [showTime_f, setShowTime_f] = useState('');
  const [showDay_f, setShowDay_f] = useState('');

  //female

  const [name_f, setName_f] = useState('');
  const [place_f, setPlace_f] = useState('');
  const [lon_f, setLon_f] = useState('28.7041');
  const [lat_f, setLat_f] = useState('77.1025');

  const checkConnectivity = async () => {
    const state = await NetInfo.fetch();
    const isConnected = state.isConnected;
    if (!isConnected) {
      ToastAndroid.showWithGravity(
        'No internet connection',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
    return isConnected;
  };

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const resetDate_f = () => {
    setDate(new Date());
  };

  const resetTime_f = () => {
    setTime(new Date());
  };

  const handleNavigation = async () => {
    const isConnected = await checkConnectivity();
    if (!isConnected) {
      return;
    }

    console.log(
      name_m,
      lat_m,
      lon_m,
      day_m,
      month_m,
      year_m,
      hour_m,
      min_m,
      name_f,
      lat_f,
      lon_f,
      day_f,
      month_f,
      year_f,
      hour_f,
      min_f,
    );

    if (
      name_m &&
      lat_m &&
      lon_m &&
      day_m &&
      month_m &&
      year_m &&
      hour_m &&
      min_m &&
      name_f &&
      lat_f &&
      lon_f &&
      day_f &&
      month_f &&
      year_f &&
      hour_f &&
      min_f
    ) {
      try {
        navigation.navigate('MarraigeKundli', {
          name_m,
          lat_m,
          lon_m,
          day_m,
          month_m,
          year_m,
          hour_m,
          min_m,
          name_f,
          lat_f,
          lon_f,
          day_f,
          month_f,
          year_f,
          hour_f,
          min_f,
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
    setLat_m(lat ? lat : '28.7041');
    setLon_m(lng ? lng : '77.1025');
    console.log(placeName, lat, lng);
  };

  const handleNavigateToSearchPlaceScreen = () => {
    navigation.navigate('SearchPlaceScreen', {
      onPlaceSelect: handlePlaceSelect,
    });
  };
  const handlePlaceSelectF = (placeName, lat, lng) => {
    setPlace_f(placeName);
    setLat_f(lat ? lat : '28.7041');
    setLon_f(lng ? lng : '77.1025');
    console.log(placeName, lat, lng);
  };

  const handleNavigateToSearchPlaceScreenF = () => {
    navigation.navigate('SearchPlaceScreen', {
      onPlaceSelect: handlePlaceSelectF,
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
    setHour_m(birthTimeUTC.getHours());
    setMin_m(birthTimeUTC.getMinutes());
    console.log(birthTimeUTC.getHours(), birthTimeUTC.getMinutes());
  };

  const setHandleDate = item => {
    const birthDayUTC = new Date(item);
    const birthDateLocal = birthDayUTC.toLocaleDateString();
    setDay_m(birthDayUTC.getDate());
    const month = birthDayUTC.getMonth() + 1;
    setMonth_m(month);
    setYear_m(birthDayUTC.getFullYear());
    setShowDay(birthDateLocal);
    console.log(
      birthDayUTC.getDate(),
      birthDayUTC.getMonth() + 1,
      birthDayUTC.getFullYear(),
    );
  };

  const setHandleTimeF = item => {
    const birthTimeUTC = new Date(item);
    const birthTimeLocal = birthTimeUTC.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    setShowTime_f(birthTimeLocal);
    setHour_f(birthTimeUTC.getHours());
    setMin_f(birthTimeUTC.getMinutes());
    console.log(birthTimeUTC.getHours(), birthTimeUTC.getMinutes());
  };

  const setHandleDateF = item => {
    const birthDayUTC = new Date(item);
    const birthDateLocal = birthDayUTC.toLocaleDateString();
    setShowDay_f(birthDateLocal);

    setDay_f(birthDayUTC.getDate());
    const month = birthDayUTC.getMonth() + 1;
    setMonth_f(month);
    setYear_f(birthDayUTC.getFullYear());
    console.log(
      birthDayUTC.getDate(),
      birthDayUTC.getMonth() + 1,
      birthDayUTC.getFullYear(),
    );
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
                <BackButton placeholder={t('Free Kundli')} />
              </View>
              <View style={{marginTop: SIZES.width * 0.06}}>
                <View
                  style={{
                    paddingBottom: SIZES.width * 0.021,
                    borderBottomWidth: 2,
                    borderColor: '#F39200',
                  }}>
                  <Text style={{fontSize: 21, fontFamily: '', color: '#000'}}>
                    Enter Boy's details
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
                  <Text
                    style={{paddingLeft: SIZES.width * 0.051, color: '#000'}}>
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
                      <Text style={{fontSize: 14, color: '#000'}}>
                        {place_m ? place_m : `Delhi`}
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
                    Enter Girl's details
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
                  onPress={() => {
                    setOpenTime_f(true);
                  }}>
                  <Text
                    style={{
                      paddingLeft: SIZES.width * 0.051,
                      color: '#000',
                    }}>
                    {showTime_f ? showTime_f : 'Enter Time Of Birth'}
                  </Text>

                  <DatePicker
                    modal
                    open={openTime_f}
                    date={Time_f}
                    mode="time"
                    is24hourSource="locale"
                    locale="en-GB" // Use a locale that defaults to 24-hour format
                    onConfirm={time => {
                      setOpenTime_f(false);
                      setTime_f(time);
                      setHandleTimeF(time);
                      console.log(time);
                    }}
                    onCancel={() => {
                      setOpenTime_f(false);
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: SIZES.width * 0.026}}>
                <Text style={styles.title}>Date of Birth</Text>
                <TouchableOpacity
                  style={styles.mainContainer2}
                  onPress={() => {
                    setOpen_F(true);
                  }}>
                  <Text
                    style={{paddingLeft: SIZES.width * 0.051, color: '#000'}}>
                    {showDay_f ? showDay_f : 'Enter Time Of Birth'}
                  </Text>

                  <DatePicker
                    modal
                    open={open_f}
                    date={date_f}
                    mode="date"
                    onConfirm={date => {
                      setOpen_F(false);
                      setDate_f(date);
                      setHandleDateF(date);
                      console.log(date);
                    }}
                    onCancel={() => {
                      setOpen_F(false);
                    }}
                  />
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
                        {place_f ? place_f : `Delhi`}
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
    borderRadius: SIZES.width * 0.02,
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
