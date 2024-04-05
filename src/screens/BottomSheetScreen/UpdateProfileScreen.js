/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
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
import DatePicker from 'react-native-date-picker';
import storage from '@react-native-firebase/storage';

const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [place, setPlace] = useState('');
  const [openTime, setOpenTime] = useState(false);
  const [Time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [showDate, setShowDate] = useState('');
  const [response, setResponse] = useState('');
  const [pre, setPre] = useState('');
  const [change, setChnage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading_button, setLoading_Button] = useState(false);

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
          console.log(response.birth_time);
          setResponse(response);
          setName(response.name);
          setEmail(response.email);
          setShowDate(response.dob);
          setPlace(response.birth_location);
          setSelectedOption(response.profile_photo);

          const birthDate = new Date(response.dob);
          const birthDateLocal = birthDate.toLocaleDateString();
          console.log('birthDateLocal', birthDateLocal);
          setShowDate(birthDateLocal);

          const birthTimeUTC = new Date(response.birth_time);
          setPre(birthTimeUTC);
          const birthTimeLocal = birthTimeUTC.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
          console.log('birthTimeLocal', birthTimeUTC);

          setShowTime(birthTimeLocal);
          setLoading(false);
        },
      );
    } catch (error) {}
  };

  const selectImage = () => {
    setImageLoading(true);
    launchImageLibrary({quality: 0.5}, fileobj => {
      console.log(fileobj);
      if (fileobj.errorCode || fileobj.didCancel) {
        return console.log('You should handle errors or user cancellation!');
      }
      const img = fileobj.assets[0];
      const storageRef = storage().ref().child(`/userprofile/${Date.now()}`);
      const uploadTask = storageRef.putFile(img.uri);

      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          console.log(error.code);
          setImageLoading(false);

          switch (error.code) {
            case 'storage/unauthorized':
              console.log('User does not have permission to access the object');
              break;
            case 'storage/canceled':
              console.log('User canceled the upload');
              break;
            case 'storage/unknown':
              console.log(
                'Unknown error occurred, inspect error.serverResponse',
              );
              break;
          }
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            setSelectedOption(downloadURL);
            setImageLoading(false);
            console.log('Image uploaded successfully!');
          });
        },
      );
    });
  };
  const handleUpdateProfile = async () => {
    setLoading_Button(true);
    try {
      const parts = showDate.split('/');
      const formattedDate = new Date(
        `${parts[2]}-${parts[0]}-${parts[1]}`,
      ).toISOString();

      // Update the params object
      var params = {
        email: email,
        name: name,
        profile_photo: selectedOption,
        fcmtoken: null,
        gender: response.gender,
        dob: formattedDate,
        birth_location: place,
        birth_time: change ? Time : pre,
        birth_lat: response.birth_lat,
        birth_lon: response.birth_lon,
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
        await Preferences.savePreferences(Preferences.key.email, email);
        await Preferences.savePreferences(Preferences.key.birthPlace, place);
        await Preferences.savePreferences(
          Preferences.key.Profile_pic,
          selectedOption,
        );

        navigation.goBack();
      });
      setLoading_Button(false);
    } catch (error) {
      setLoading_Button(false);
    }
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

  const handleTime = time => {
    const birthTimeUTC = new Date(time);
    const birthTimeLocal = birthTimeUTC.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use 12-hour format
    });
    setShowTime(birthTimeLocal);
    setChnage(true);
  };

  const handleDate = date => {
    const birthDate = new Date(date);
    const birthDateLocal = birthDate.toLocaleDateString();
    console.log('birthDateLocal', birthDateLocal);
    setShowDate(birthDateLocal);
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

            {loading ? (
              <View
                style={{
                  marginTop: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={'large'} color={COLORS.primary} />
              </View>
            ) : (
              <View>
                <View
                  style={{
                    marginTop: SIZES.width * 0.051,
                    alignItems: 'center',
                  }}>
                  {imageLoading ? (
                    <View
                      style={{
                        width: SIZES.width * 0.31,
                        height: SIZES.width * 0.31,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 0.5,
                        borderColor: 'grey',
                        borderRadius: 300,
                      }}>
                      <ActivityIndicator size={'small'} color={'#000'} />
                    </View>
                  ) : selectedOption ? (
                    <Image
                      source={{uri: selectedOption}}
                      style={{
                        width: SIZES.width * 0.31,
                        height: SIZES.width * 0.31,
                        borderRadius: 300,
                        resizeMode: 'cover',
                      }}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/zegocloudvideocall-b50bd.appspot.com/o/userprofile%2FWhatsApp%20Image%202024-04-03%20at%2012.55.45%20PM.jpeg?alt=media&token=729aae36-a285-4ccb-802d-ea512cbadb07',
                      }}
                      style={{
                        width: SIZES.width * 0.31,
                        height: SIZES.width * 0.31,
                        borderRadius: 300,
                        resizeMode: 'cover',
                      }}
                    />
                  )}

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
                      style={[styles.mainContaine2, {justifyContent: 'center'}]}
                      onPress={() => {
                        setOpen(true);
                      }}>
                      <Text
                        style={{
                          paddingLeft: SIZES.width * 0.051,
                          color: '#000',
                        }}>
                        {showDate}
                      </Text>

                      <DatePicker
                        modal
                        open={open}
                        date={date}
                        mode="date"
                        onConfirm={date => {
                          setOpen(false);
                          setDate(date);
                          handleDate(date);
                          console.log(date);
                        }}
                        onCancel={() => {
                          setOpen(false);
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginTop: SIZES.width * 0.026}}>
                  <Text style={{fontSize: SIZES.width * 0.041, color: '#000'}}>
                    Time of birth
                  </Text>
                  <View style={{marginTop: SIZES.width * 0.026}}>
                    <TouchableOpacity
                      style={[styles.mainContaine2, {justifyContent: 'center'}]}
                      onPress={() => {
                        setOpenTime(true);
                      }}>
                      <Text
                        style={{
                          paddingLeft: SIZES.width * 0.051,
                          color: '#000',
                        }}>
                        {showTime}
                      </Text>

                      <DatePicker
                        modal
                        open={openTime}
                        date={Time}
                        mode="time"
                        onConfirm={time => {
                          setOpenTime(false);
                          setTime(time);
                          handleTime(time);
                        }}
                        onCancel={() => {
                          setOpenTime(false);
                        }}
                      />
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
                    {loading_button ? (
                      <ActivityIndicator color={COLORS.black} />
                    ) : (
                      <Text style={styles.title}>Update</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
