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
import DatePicker from 'react-native-date-picker';

const data = [
  {label: 'Male', value: '1'},
  {label: 'Female', value: '2'},
];

const MarraigeScreenForm = ({navigation}) => {
  const [name_m, setName_m] = useState('');
  const [place_m, setPlace_m] = useState('');
  const [lon_m, setLon_m] = useState('');
  const [lat_m, setLat_m] = useState('');

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [openTime, setOpenTime] = useState(false);
  const [Time, setTime] = useState(new Date());

  const [open_f, setOpen_F] = useState(false);
  const [date_f, setDate_f] = useState(new Date());
  const [openTime_f, setOpenTime_f] = useState(false);
  const [Time_f, setTime_f] = useState(new Date());

  //female

  const [name_f, setName_f] = useState('');
  const [place_f, setPlace_f] = useState('');
  const [lon_f, setLon_f] = useState('');
  const [lat_f, setLat_f] = useState('');

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const resetDate = () => {
    setDate(new Date());
  };

  const resetTime = () => {
    setTime(new Date());
  };

  const resetDate_f = () => {
    setDate(new Date());
  };

  const resetTime_f = () => {
    setTime(new Date());
  };

  const handleNavigation = () => {
    if (
      name_m &&
      lat_m &&
      lon_m &&
      date &&
      Time &&
      name_f &&
      lat_f &&
      lon_f &&
      date_f &&
      Time_f
    ) {
      console.log(
        name_m,
        lat_m,
        lon_m,
        date,
        Time,
        name_f,
        lat_f,
        lon_f,
        date_f,
        Time_f,
      );
      try {
        navigation.navigate('MarraigeKundli', {
          name_m,
          lat_m,
          lon_m,
          date,
          Time,
          name_f,
          lat_f,
          lon_f,
          date_f,
          Time_f,
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
                    resetTime(); // Reset date when opening the modal
                  }}>
                  <Text
                    style={{
                      paddingLeft: SIZES.width * 0.051,
                      color: '#000',
                    }}>
                    {Time.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>

                  <DatePicker
                    modal
                    open={openTime}
                    date={Time}
                    mode="time"
                    onConfirm={time => {
                      setOpenTime(false);
                      setTime(time);
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
                    resetDate(); // Reset date when opening the modal
                  }}>
                  <Text
                    style={{paddingLeft: SIZES.width * 0.051, color: '#000'}}>
                    {date.toLocaleDateString()}
                  </Text>

                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
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
                    resetTime_f(); // Reset date when opening the modal
                  }}>
                  <Text
                    style={{
                      paddingLeft: SIZES.width * 0.051,
                      color: '#000',
                    }}>
                    {Time_f.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>

                  <DatePicker
                    modal
                    open={openTime_f}
                    date={Time_f}
                    mode="time"
                    onConfirm={time => {
                      setOpenTime_f(false);
                      setTime_f(time);
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
                    resetDate_f(); // Reset date when opening the modal
                  }}>
                  <Text
                    style={{paddingLeft: SIZES.width * 0.051, color: '#000'}}>
                    {date_f.toLocaleDateString()}
                  </Text>

                  <DatePicker
                    modal
                    open={open_f}
                    date={date_f}
                    mode="date"
                    onConfirm={date => {
                      setOpen_F(false);
                      setDate_f(date);
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
