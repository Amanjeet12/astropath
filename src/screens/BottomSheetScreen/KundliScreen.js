/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
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
import SingleFormSection from '../../components/SingleFormSection';
import MultiFormSection from '../../components/MultiFormSection';

const KundliScreen = () => {
  const [selected, setSelected] = useState('Single Kundli');
  const handleSelecter = option => {
    setSelected(option);
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
            <View style={{width: SIZES.width * 0.65}}>
              <BackButton placeholder={'Free Kundli'} />
            </View>
            <View style={styles.boxContainer}>
              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor:
                      selected === 'Single Kundli' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('Single Kundli')}>
                <Text
                  style={{
                    color: selected === 'Single Kundli' ? '#fff' : '#000',
                  }}>
                  Single Kundli
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor:
                      selected === 'Marraige' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('Marraige')}>
                <Text
                  style={{
                    color: selected === 'Marraige' ? '#fff' : '#000',
                  }}>
                  Marriage Kundli
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: SIZES.width * 0.077}}>
              {selected === 'Single Kundli' ? (
                <SingleFormSection />
              ) : (
                <MultiFormSection />
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default KundliScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: SIZES.width * 0.077,
    backgroundColor: '#fff',
    width: SIZES.width * 0.78,
    height: SIZES.width * 0.102,
    alignSelf: 'center',
    borderRadius: SIZES.width * 0.016,
    paddingHorizontal: SIZES.width * 0.01,
  },
  singleContainer: {
    width: SIZES.width * 0.36,
    height: SIZES.width * 0.077,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
