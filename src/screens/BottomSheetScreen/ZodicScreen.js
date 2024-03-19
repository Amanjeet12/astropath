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
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import {Zodiac} from '../../constant/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Preferences from '../api/Preferences';
import {useTranslation} from 'react-i18next';

const ZodicScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePopup = async () => {
    const selectedZodiacSign = Zodiac[selectedItem].title;
    const selectedItemIdString = selectedItem.toString();

    try {
      await AsyncStorage.setItem('Zodic', selectedItemIdString);
      await Preferences.saveJsonPerences(Preferences.horoscope.today, null);
      await Preferences.saveJsonPerences(Preferences.horoscope.tommorow, null);
      await Preferences.saveJsonPerences(Preferences.horoscope.yesterday, null);

      navigation.replace('BottomTabScreen');
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemPress = async index => {
    console.log(index);
    setSelectedItem(index);
  };

  useEffect(() => {
    const fetchHoroscope = async () => {
      const ZodicSign = await AsyncStorage.getItem('Zodic');
      if (ZodicSign !== null) {
        const selectedItemnumber = parseInt(ZodicSign);
        setSelectedItem(selectedItemnumber);
      } else {
        setSelectedItem(0);
      }
    };
    fetchHoroscope();
  }, []);

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
              <BackButton placeholder={'Change Zodic Sign'} />
            </View>

            {Zodiac.reduce((rows, item, index) => {
              if (index % 3 === 0) {
                rows.push([]);
              }
              rows[rows.length - 1].push(item);
              return rows;
            }, []).map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  flexDirection: 'row',
                  padding: SIZES.width * 0.026,
                  marginTop: 3,
                }}>
                {row.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={{
                      flex: 1,
                      backgroundColor:
                        selectedItem === rowIndex * 3 + itemIndex
                          ? '#FFB443'
                          : 'transparent',
                      alignItems: 'center',
                      paddingVertical: SIZES.width * 0.039,
                      borderRadius: 20,
                    }}
                    onPress={() => handleItemPress(rowIndex * 3 + itemIndex)}>
                    <Image
                      source={item.image}
                      style={{
                        width: SIZES.width * 0.13,
                        height: SIZES.width * 0.13,
                        marginBottom: SIZES.width * 0.012,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: SIZES.width * 0.04,
                        color:
                          selectedItem === rowIndex * 3 + itemIndex
                            ? '#fff'
                            : '#000',
                        fontFamily: 'KantumruyPro-Regular',
                        textTransform: 'capitalize',
                      }}>
                      {t(item.title)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handlePopup()}>
              <Text
                style={[
                  styles.title,
                  {fontWeight: '700', fontSize: SIZES.width * 0.041},
                ]}>
                Update Sign
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default ZodicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },

  buttonContainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.051,
    backgroundColor: '#FFB443',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SIZES.width * 0.051,
    marginBottom: SIZES.width * 0.051,
  },
});
