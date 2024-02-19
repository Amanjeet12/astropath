/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import Commontextinput from '../../components/Commontextinput';
import Dobtextinput from '../../components/Dobtextinput';
import TimePickerComponent from '../../components/TimePickerComponent';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNavigation = () => {
    navigation.goBack();
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
  return (
    <>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={{marginTop: 10}}>
              <HeaderSection />
            </View>
            <View style={{width: 150}}>
              <BackButton placeholder={'Account'} />
            </View>
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <Image
                source={selectedOption ? images.Profile2 : images.Profile2}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
              <TouchableOpacity
                onPress={() => selectImage()}
                activeOpacity={1}
                style={{
                  position: 'absolute',
                  bottom: 5,
                  left: 200,
                }}>
                <Image
                  source={images.image_selector}
                  style={{width: 30, height: 30, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 16, color: '#000'}}>Account Name</Text>
              <View style={{marginTop: 10}}>
                <Commontextinput placeholder={'Tanmay Singh'} />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 16, color: '#000'}}>Email</Text>
              <View style={{marginTop: 10}}>
                <Commontextinput placeholder={'astrologer@gmail.com'} />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 16, color: '#000'}}>Contact</Text>
              <View style={{marginTop: 10}}>
                <Commontextinput placeholder={'+91 7717755785'} />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 16, color: '#000'}}>Date of birth</Text>
              <View style={{marginTop: 10}}>
                <Dobtextinput placeholder={'24/05/1999'} />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 16, color: '#000'}}>Time of birth</Text>
              <View style={{marginTop: 10}}>
                <TimePickerComponent placeholder={'24/05/1999'} />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 16, color: '#000'}}>Address</Text>
              <View style={{marginTop: 10}}>
                <Commontextinput placeholder={'Bermo, Jharkhand'} />
              </View>
            </View>
            <View style={{marginVertical: 30}}>
              <TouchableOpacity
                style={styles.maincontainer}
                onPress={() => handleNavigation()}>
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
    marginHorizontal: 20,
  },
  maincontainer: {
    height: 50,
    marginTop: 10,
    backgroundColor: '#FFB443',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  title: {
    fontFamily: 'KantumruyPro-Regular',
    color: COLORS.black,
    fontSize: 16,
  },
});
