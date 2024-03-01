/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import DateTimePicker from '@react-native-community/datetimepicker';
import Preferences from '../api/Preferences';

const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [place, setPlace] = useState('');
  const [profile, setProfile] = useState('');

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [modeTime, setModeTime] = useState('date');
  const [showDateTime, setShowDateTime] = useState('');

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let token;
      try {
        token = await Preferences.getPreferences(Preferences.key.Token);
      } catch (error) {
        console.error('Error getting latitude and longitude:', error);
        return;
      }

      WebMethods.getRequestWithHeader(WebUrls.url.user_detail, token).then(
        response => {
          console.log(response);
          setName(response.name);
          setEmail(response.email);
          setShowDate(response.dob);
          setPlace(response.birth_location);
          setShowDateTime(response.birth_time);
          setProfile(response.profile_photo);
        },
      );
    } catch (error) {}
  };

  const selectImage = () => {
    Keyboard.dismiss();
    launchImageLibrary({quality: 0.5, selectionLimit: 1}, async fileobj => {
      if (fileobj.errorCode || fileobj.didCancel) {
        return console.log('You should handle errors or user cancellation!');
      }

      try {
        const imageUri = fileobj.assets[0].uri;
        const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        console.log(fileName);
        setSelectedOption(imageUri);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleUpdateProfile = async () => {
    try {
      var params = {
        name: name,
        email: email,
        dob: showDate,
        birth_location: place,
        birth_time: showDateTime,
        profile_photo: profile,
      };
      let token;
      try {
        token = await Preferences.getPreferences(Preferences.key.Token);
      } catch (error) {
        console.error('Error getting latitude and longitude:', error);
        return;
      }

      WebMethods.patchRequestWithHeader(
        WebUrls.url.user_detail,
        params,
        token,
      ).then(async response => {
        console.log(response);
        await Preferences.savePreferences(Preferences.key.Name, name);
        navigation.goBack();
      });
    } catch (error) {}
  };

  const handleName = text => {
    setName(text);
  };
  const handleEmail = text => {
    setEmail(text);
  };
  const handlePlaceSelect = (placeName, lat, lng) => {
    setPlace(placeName);
    console.log(placeName, lat, lng);
  };

  const handleNavigateToSearchPlaceScreen = () => {
    navigation.navigate('SearchPlaceScreen', {
      onPlaceSelect: handlePlaceSelect,
    });
  };

  return (
    <>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            <View style={{width: SIZES.width * 0.38}}>
              <BackButton placeholder={'Account'} />
            </View>
            <View
              style={{
                marginTop: SIZES.width * 0.051,
                alignItems: 'center',
              }}>
              <Image
                source={
                  selectedOption ? images.profile_image : images.profile_image
                }
                style={{
                  width: SIZES.width * 0.31,
                  height: SIZES.width * 0.31,
                  borderRadius: 300,
                  resizeMode: 'cover',
                }}
              />
              <TouchableOpacity
                onPress={() => selectImage()}
                activeOpacity={1}
                style={{
                  position: 'absolute',
                  bottom: SIZES.width * 0.051,
                  left: SIZES.width * 0.54,
                }}>
                <Image
                  source={images.image_selector}
                  style={{
                    width: SIZES.width * 0.077,
                    height: SIZES.width * 0.077,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={{fontSize: SIZES.width * 0.041, color: '#000'}}>
                User Name
              </Text>
              <View style={{marginTop: SIZES.width * 0.026}}>
                <View style={styles.mainContaine2}>
                  <TextInput
                    placeholder={'Enter your name'}
                    style={{
                      paddingLeft: SIZES.width * 0.051,
                      color: COLORS.black,
                      textTransform: 'capitalize',
                    }}
                    keyboardType="default"
                    placeholderTextColor={COLORS.black}
                    value={name}
                    onChangeText={handleName}
                  />
                </View>
              </View>
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={{fontSize: SIZES.width * 0.041, color: '#000'}}>
                Email
              </Text>
              <View style={{marginTop: SIZES.width * 0.026}}>
                <View style={styles.mainContaine2}>
                  <TextInput
                    placeholder={'Enter your email'}
                    style={{
                      paddingLeft: SIZES.width * 0.051,
                      color: COLORS.black,
                    }}
                    keyboardType="default"
                    placeholderTextColor={COLORS.black}
                    value={email}
                    onChangeText={handleEmail}
                  />
                </View>
              </View>
            </View>

            <View style={{marginTop: SIZES.width * 0.03}}>
              <Text style={{fontSize: SIZES.width * 0.041, color: '#000'}}>
                Date of birth
              </Text>
              <View style={{marginTop: SIZES.width * 0.026}}>
                <TouchableOpacity
                  style={styles.mainContainer3}
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
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={{fontSize: SIZES.width * 0.041, color: '#000'}}>
                Time of birth
              </Text>
              <View style={{marginTop: SIZES.width * 0.026}}>
                <TouchableOpacity
                  style={styles.mainContainer3}
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
            </View>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <Text style={{fontSize: SIZES.width * 0.041, color: '#000'}}>
                Birth place
              </Text>
              <View style={{marginTop: SIZES.width * 0.026}}>
                <TouchableOpacity
                  style={[styles.mainContaine2, {justifyContent: 'center'}]}
                  onPress={() => handleNavigateToSearchPlaceScreen()}>
                  <View
                    style={{
                      paddingLeft: SIZES.width * 0.051,
                      color: COLORS.black,
                      textTransform: 'capitalize',
                    }}>
                    <Text style={{fontSize: 14, color: '#000'}}>
                      {place ? place : `Enter Birth place`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginVertical: SIZES.width * 0.077}}>
              <TouchableOpacity
                style={styles.maincontainer}
                onPress={() => handleUpdateProfile()}>
                <Text style={styles.title}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  maincontainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.026,
    backgroundColor: '#FFB443',
    borderRadius: SIZES.width * 0.039,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: SIZES.width * 0.01,
  },
  title: {
    fontFamily: 'KantumruyPro-Regular',
    color: COLORS.black,
    fontSize: SIZES.width * 0.041,
  },
  mainContaine2: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    // elevation: SIZES.width * 0.01
    marginBottom: 3,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  mainContainer3: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.width * 0.013,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
});
