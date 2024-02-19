/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import Commontextinput from '../../components/Commontextinput';
import Dobtextinput from '../../components/Dobtextinput';
import TimePickerComponent from '../../components/TimePickerComponent';
import Custombutton from '../../components/Custombutton';

const UpdateProfileScreen = () => {
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
              <BackButton />
            </View>
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <Image
                source={images.Profile2}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
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
                <Commontextinput placeholder={'Address'} />
              </View>
            </View>
            <View>
              <Custombutton placeholder={'Update'} />
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
});
