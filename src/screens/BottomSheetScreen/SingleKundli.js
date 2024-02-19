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
import BasicSection from '../../components/BasicSection';
import ChartsSection from '../../components/ChartsSection';
import AshtakvargaSSection from '../../components/AshtakvargaSSection';
import DashaSection from '../../components/DashaSection';

const SingleKundli = () => {
  const [selected, setSelected] = useState('Basic');
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
                    fontSize: 12,
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
                    fontSize: 12,
                  }}>
                  Charts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.singleContainer,
                  {
                    backgroundColor:
                      selected === 'Ashtakvarga' ? '#F39200' : '#fff',
                  },
                ]}
                onPress={() => handleSelecter('Ashtakvarga')}>
                <Text
                  style={{
                    color: selected === 'Ashtakvarga' ? '#fff' : '#000',
                    fontSize: 12,
                  }}>
                  Ashtakvarga
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
                    fontSize: 12,
                  }}>
                  Dasha
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 30}}>
              {selected === 'Basic' ? (
                <BasicSection />
              ) : selected === 'Charts' ? (
                <ChartsSection />
              ) : selected === 'Ashtakvarga' ? (
                <AshtakvargaSSection />
              ) : (
                <DashaSection />
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
    marginHorizontal: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 30,
    backgroundColor: '#fff',
    width: '100%',
    height: 54,
    alignSelf: 'center',
    borderRadius: 30,
  },
  singleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
