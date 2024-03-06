/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../../constant/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {images} from '../../constant';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import Preferences from '../api/Preferences';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';

const CompleteProfile = ({route, navigation}) => {
  const {response} = route.params;
  const [date, setDate] = useState(new Date('1985-01-01T11:05:00.000Z'));
  const [Time, setTime] = useState(new Date());
  const [openTime, setOpenTime] = useState(false);
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState('28.7041');
  const [lon, setLon] = useState('77.1025');
  const [place, setPlace] = useState('Delhi');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isMaleSelected, setMaleSelected] = useState(false);
  const [isFemaleSelected, setFemaleSelected] = useState(false);
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTime, setShowTime] = useState('');
  const [showDay, setShowDay] = useState('');

  const handlePlaceSelect = (placeName, lat, lng) => {
    setPlace(placeName);
    setLat(lat ? lat : '28.7041');
    setLon(lng ? lng : '77.1025');
    console.log(placeName, lat, lng);
  };

  const handleNavigateToSearchPlaceScreen = () => {
    navigation.navigate('SearchPlaceScreen', {
      onPlaceSelect: handlePlaceSelect,
    });
  };

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const handleNavigation = async () => {
    setLoading(true);
    try {
      console.log('enter', lat, lon, date, Time, place, name, email, gender);
      if (
        name &&
        place &&
        date &&
        Time &&
        lat &&
        lon &&
        email &&
        gender &&
        showDay &&
        showTime
      ) {
        try {
          await Preferences.savePreferences(
            Preferences.key.UserId,
            response.existingCustomer._id,
          );
          await Preferences.savePreferences(
            Preferences.key.phone,
            response.existingCustomer.phone,
          );
          await Preferences.savePreferences(
            Preferences.key.Token,
            response.jwt_token,
          );
          await Preferences.savePreferences(Preferences.key.Name, name);
          await Preferences.savePreferences(Preferences.key.email, email);
          await Preferences.savePreferences(
            Preferences.key.Time,
            Time.toString(),
          );
          await Preferences.savePreferences(Preferences.key.birthPlace, place);
          await Preferences.savePreferences(Preferences.key.gender, gender);
          await Preferences.savePreferences(
            Preferences.key.birthLat,
            lat.toString(),
          );
          await Preferences.savePreferences(
            Preferences.key.birthLon,
            lon.toString(),
          );
          console.log('done');
        } catch (error) {
          console.log(error);
        }

        var params = {
          email: email,
          name: name,
          profile_photo: null,
          fcmtoken: null,
          gender: gender,
          dob: date,
          birth_location: place,
          birth_time: Time,
          birth_lat: lat.toString(),
          birth_lon: lon.toString(),
        };

        WebMethods.patchRequestWithHeader(
          WebUrls.url.user_detail,
          params,
          response.jwt_token,
        ).then(response => {
          console.log('response', response);
          setLoading(false);
          navigation.navigate('SelectHoroScope');
        });
      } else {
        setToastMsg('All feilds are compalsary');
        setLoading(false);
      }
    } catch (error) {
      console.log('erroring', error);
      setLoading(false);
    }
  };
  const handleName = text => {
    setName(text);
  };
  const handleEmail = text => {
    setEmail(text);
  };

  const setHandleTime = item => {
    const birthTimeUTC = new Date(item);
    const birthTimeLocal = birthTimeUTC.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setShowTime(birthTimeLocal);
  };

  const setHandleDate = item => {
    const birthDayUTC = new Date(item);
    const birthDateLocal = birthDayUTC.toLocaleDateString();
    setShowDay(birthDateLocal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: SIZES.width * 0.026,
            width: SIZES.width,
            height: 200,
          }}>
          <Image
            source={images.astropath_logo}
            style={{
              width: SIZES.width,
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.description}>
              We just need a quick survey for your profile
            </Text>
          </View>
          <View style={{marginTop: SIZES.width * 0.051}}>
            <Text style={styles.title2}>Enter Name</Text>
            <View style={styles.mainContainer2}>
              <TextInput
                placeholder={response.name ? response.name : 'Enter Your name'}
                style={{
                  paddingLeft: SIZES.width * 0.051,
                  color: COLORS.black,
                  textTransform: 'capitalize',
                  width: '100%',
                }}
                keyboardType="default"
                placeholderTextColor={COLORS.black}
                onChangeText={handleName}
              />
            </View>
          </View>
          <View style={{marginTop: SIZES.width * 0.026}}>
            <Text style={styles.title2}>Enter Email</Text>
            <View style={styles.mainContainer2}>
              <TextInput
                placeholder={response.name ? response.name : 'Enter Your email'}
                style={{
                  paddingLeft: SIZES.width * 0.051,
                  color: COLORS.black,
                  textTransform: 'capitalize',
                  width: '100%',
                }}
                keyboardType="default"
                placeholderTextColor={COLORS.black}
                onChangeText={handleEmail}
              />
            </View>
          </View>
          <View style={{marginTop: SIZES.width * 0.026}}>
            <Text style={styles.title2}>Time of Birth</Text>
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
            <Text style={styles.title2}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.mainContainer2}
              onPress={() => {
                setOpen(true);
              }}>
              <Text style={{paddingLeft: SIZES.width * 0.051, color: '#000'}}>
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
            <Text style={styles.title2}>Phone No </Text>
            <View
              style={styles.mainContainer2}
              onPress={() => {
                setOpen(true);
              }}>
              <Text style={{paddingLeft: SIZES.width * 0.051, color: '#000'}}>
                {response.existingCustomer.phone}
              </Text>
            </View>
          </View>
          <View style={{marginTop: SIZES.width * 0.026}}>
            <Text style={styles.title2}>Place of Birth</Text>
            <TouchableOpacity
              style={[styles.mainContainer2]}
              onPress={() => handleNavigateToSearchPlaceScreen()}>
              <View
                style={{
                  paddingLeft: SIZES.width * 0.051,
                  color: COLORS.black,
                  textTransform: 'capitalize',
                }}>
                <Text style={{fontSize: SIZES.width * 0.036, color: '#000'}}>
                  {place ? place : 'Delhi'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: SIZES.width * 0.026}}>
            <Text style={styles.title2}>Select Gender</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  value={isMaleSelected}
                  onValueChange={newValue => {
                    setMaleSelected(newValue);
                    setFemaleSelected(false);
                    setGender(newValue ? 'male' : '');
                  }}
                />
                <Text style={styles.title2}>Male</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  value={isFemaleSelected}
                  onValueChange={newValue => {
                    setFemaleSelected(newValue);
                    setMaleSelected(false);
                    setGender(newValue ? 'female' : '');
                  }}
                />
                <Text style={styles.title2}>Female</Text>
              </View>
            </View>
          </View>
          <View style={styles.button_position}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleNavigation()}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color={COLORS.black} />
              ) : (
                <Text
                  style={[
                    styles.title,
                    {fontWeight: '500', fontSize: SIZES.width * 0.041},
                  ]}>
                  Submit
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    width: SIZES.width,
    backgroundColor: '#EDD498',
    borderTopRightRadius: SIZES.width * 0.08,
    borderTopLeftRadius: SIZES.width * 0.08,
    paddingTop: SIZES.width * 0.072,
    paddingHorizontal: SIZES.width * 0.051,
  },
  title: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: SIZES.width * 0.051,
    color: '#000',
  },
  description: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.036,
    color: '#000',
  },
  linkText: {
    color: '#F39200',
    textDecorationLine: 'underline',
  },
  skipButton: {
    width: '30%',
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.026,
    borderRadius: SIZES.width * 0.018,
    backgroundColor: '#fff',
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
  title2: {
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
    marginBottom: SIZES.width * 0.05,
  },
});
