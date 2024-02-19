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
            <View style={{marginTop: 10}}>
              <HeaderSection />
            </View>
            <View style={{width: 250}}>
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
            <View style={{marginTop: 30}}>
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
    marginHorizontal: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 30,
    backgroundColor: '#fff',
    width: 300,
    height: 40,
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 4,
  },
  singleContainer: {
    width: 140,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});
