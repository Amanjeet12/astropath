/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../components/BackButton';
import HeaderSection from '../../components/HeaderSection';
import {COLORS, SIZES} from '../../constant/theme';
import images from '../../constant/images';
import Icon from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import {question} from '../../constant/data';
import Add from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
// import {supportCreate} from '../../redux/features/StatusSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Preferences from '../api/Preferences';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import NetInfo from '@react-native-community/netinfo';

const CustomerSupportScreen = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const uploadImage = async () => {
    const isConnected = await checkConnectivity();
    if (!isConnected) {
      setLoading(false);
      return;
    }
    launchImageLibrary({quality: 0.5}, fileobj => {
      console.log(fileobj);
      if (fileobj.errorCode || fileobj.didCancel) {
        return console.log('You should handle errors or user cancellation!');
      }
      setLoading(true);

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
          setLoading(false);

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
            setImageUrl(downloadURL);
            setLoading(false);
            console.log('Image uploaded successfully!');
          });
        },
      );
    });
  };

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const isValidEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateInputs = () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return false;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return false;
    }

    if (!imageUrl) {
      alert('Please upload a screenshot');
      return false;
    }

    if (!message.trim()) {
      alert('Please enter your message');
      return false;
    }

    return true;
  };

  const renderItem = ({item, index}) => {
    const isQuestionSelected = index === selectedQuestionIndex;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedQuestionIndex(isQuestionSelected ? null : index);
        }}
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          backgroundColor: '#fff',
          paddingVertical: 20,
          paddingLeft: 10,
          borderRadius: 5,
          borderColor: COLORS.borderColor,
          borderWidth: 1,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#000', width: '85%', fontSize: 16}}>
            {item.question}
          </Text>
          {isQuestionSelected ? (
            <TouchableOpacity>
              <Add name={'close'} color={'#FFB443'} size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Add name={'plus'} color={'#FFB443'} size={20} />
            </TouchableOpacity>
          )}
        </View>

        {isQuestionSelected && (
          <Text
            style={{color: 'grey', width: '85%', fontSize: 12, paddingTop: 20}}>
            {item.answer}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const handleFormSubmit = async () => {
    if (!validateInputs()) {
      return;
    }
    const isConnected = await checkConnectivity();
    if (!isConnected) {
      setLoading(false);
      return;
    }
    setLoading(true);

    var params = {
      name: name,
      email: email,
      photo: imageUrl,
      description: message,
    };
    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        const response = await WebMethods.postRequestWithHeader(
          WebUrls.url.support,
          params,
          token,
        );
        if (response != null) {
          console.log('response===>', response.msg);
          setToastMsg(response.msg);
          navigation.goBack();
        } else {
          console.log('error');
        }
      }
    } catch (error) {
      console.error('Error handling payment:', error);
    }
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
            <View>
              <BackButton placeholder={'Customer Support'} />
            </View>
            <View style={{marginTop: 40}}>
              <Text style={{color: '#000', marginBottom: 5}}>Name *</Text>
              <View style={styles.mainContainer3}>
                <TextInput
                  placeholder={'Enter name'}
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: COLORS.black,
                  }}
                  keyboardType="default"
                  placeholderTextColor={COLORS.black}
                  onChangeText={setName}
                />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{color: '#000', marginBottom: 5}}>Email *</Text>
              <View style={styles.mainContainer3}>
                <TextInput
                  placeholder={'Enter Email'}
                  style={{
                    paddingLeft: SIZES.width * 0.051,
                    color: COLORS.black,
                  }}
                  keyboardType="default"
                  placeholderTextColor={COLORS.black}
                  onChangeText={setEmail}
                />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{color: '#000', marginBottom: 5}}>
                Upload Screenshot *
              </Text>
              <View style={[styles.flex, {paddingTop: 10, gap: 10}]}>
                {imageUrl != '' ? (
                  <View>
                    <Image
                      source={{uri: imageUrl}}
                      style={{width: 50, height: 50, resizeMode: 'contain'}}
                    />
                  </View>
                ) : (
                  <Image
                    source={images.upload}
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                  />
                )}

                <TouchableOpacity
                  style={[
                    styles.flex,

                    {
                      width: 150,
                      height: 50,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 5,
                      borderRadius: 5,
                      backgroundColor: '#fff',
                    },
                  ]}
                  disabled={loading}
                  onPress={() => uploadImage()}>
                  {loading ? (
                    <ActivityIndicator size={'small'} color={COLORS.black} />
                  ) : (
                    <>
                      <Icon name={'upload'} size={20} color={'#000'} />
                      <Text style={{color: '#000'}}>Upload Image</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 15}}>
              <Text style={{color: '#000', marginBottom: 5}}>Message *</Text>
              <View style={styles.mainContainer2}>
                <TextInput
                  placeholder={'Write Message'}
                  style={{
                    paddingLeft: SIZES.width * 0.025,
                    color: COLORS.black,
                    textTransform: 'capitalize',
                    textAlignVertical: 'top',
                    paddingTop: SIZES.width * 0.035,
                    width: '100%',
                    height: '100%',
                  }}
                  multiline={true}
                  numberOfLines={10}
                  maxLength={150}
                  onChangeText={setMessage}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleFormSubmit}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size={'small'} color={COLORS.black} />
              ) : (
                <Text style={{color: '#000'}}>SUBMIT</Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderWidth: 1,
              marginTop: 50,
              marginHorizontal: 20,
              borderColor: COLORS.borderColor,
            }}
          />
          <View>
            <FlatList
              data={question}
              renderItem={renderItem}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{marginBottom: 50}}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default CustomerSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer2: {
    height: SIZES.width * 0.4,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginBottom: 3,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFB443',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  mainContainer3: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginBottom: 3,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
  },
});
