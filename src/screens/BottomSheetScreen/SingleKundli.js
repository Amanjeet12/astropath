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
import ChartsSection from '../../components/ChartsSection';
import AshtakvargaSSection from '../../components/AshtakvargaSSection';
import DashaSection from '../../components/DashaSection';
import BasicSection from '../../components/BasicSection';

const SingleKundli = ({route}) => {
  const [selected, setSelected] = useState('Basic');
  const handleSelecter = option => {
    setSelected(option);
  };
  const {name, value, date, Time, lat, lon} = route.params;
  console.log('params', name, value, date, Time, lat, lon);

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
              <BackButton placeholder={'Your Kundli'} />
            </View>
            <View style={styles.boxContainer}>
              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor: selected === 'Basic' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('Basic')}>
                <Text
                  style={{
                    color: selected === 'Basic' ? '#fff' : '#000',
                    fontSize: SIZES.width * 0.031,
                  }}>
                  Basic
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor: selected === 'Charts' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('Charts')}>
                <Text
                  style={{
                    color: selected === 'Charts' ? '#fff' : '#000',
                    fontSize: SIZES.width * 0.031,
                  }}>
                  Charts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor: selected === 'KP' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('KP')}>
                <Text
                  style={{
                    color: selected === 'KP' ? '#fff' : '#000',
                    fontSize: SIZES.width * 0.031,
                  }}>
                  KP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor: selected === 'Dasha' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('Dasha')}>
                <Text
                  style={{
                    color: selected === 'Dasha' ? '#fff' : '#000',
                    fontSize: SIZES.width * 0.031,
                  }}>
                  Dasha
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: SIZES.width * 0.077}}>
              {selected === 'Basic' ? (
                <BasicSection
                  name={name}
                  value={value}
                  showDateTime={date}
                  showDate={Time}
                  lat={lat}
                  lon={lon}
                />
              ) : selected === 'Charts' ? (
                <ChartsSection
                  name={name}
                  value={value}
                  showDateTime={date}
                  showDate={Time}
                  lat={lat}
                  lon={lon}
                />
              ) : selected === 'KP' ? (
                <AshtakvargaSSection
                  name={name}
                  value={value}
                  showDateTime={date}
                  showDate={Time}
                  lat={lat}
                  lon={lon}
                />
              ) : (
                <DashaSection
                  name={name}
                  value={value}
                  showDateTime={date}
                  showDate={Time}
                  lat={lat}
                  lon={lon}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default SingleKundli;

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
    width: '100%',
    height: SIZES.width * 0.139,
    alignSelf: 'center',
    borderRadius: SIZES.width * 0.077,
  },
  singleContainer: {
    paddingHorizontal: SIZES.width * 0.039,
    paddingVertical: SIZES.width * 0.026,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
});
