/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unstable-nested-components */
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
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import DaySelection from '../../components/DaySelection';
import {Zodiac} from '../../constant/data';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import Preferences from '../api/Preferences';

const HoroscopeScreen = ({route}) => {
  const {todayHoroscope, selectedItem} = route.params;
  const [selectedItems, setSelectedItems] = useState(selectedItem);
  const [horoscope, setHoroscope] = useState(todayHoroscope);
  const [loading, setloading] = useState(false);
  const [currentDaySelected, setCurrentDaySelected] = useState('');

  const handleSelection = async selectedItem => {
    setCurrentDaySelected(selectedItem);
    let fetchUrl = '';
    let preferenceKey = '';

    switch (selectedItem) {
      case 'Previous':
        fetchUrl = WebUrls.url.previous_horoscope;
        preferenceKey = Preferences.horoscope.yesterday;
        break;
      case 'Today':
        fetchUrl = WebUrls.url.today_horoscope;
        preferenceKey = Preferences.horoscope.today;
        break;
      case 'Tommorrow':
        fetchUrl = WebUrls.url.tommorrow_horoscope;
        preferenceKey = Preferences.horoscope.tommorow;
        break;
      default:
        fetchUrl = WebUrls.url.monthly_horoscope;
    }

    try {
      const cachedHoroscope = await Preferences.getJsonPreferences(
        preferenceKey,
      );
      if (cachedHoroscope) {
        setHoroscope(cachedHoroscope);
        return;
      }
    } catch (error) {}

    const params = {
      zodiacName: Zodiac[selectedItems].title,
      tzone: '5.5',
    };

    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      const response = await WebMethods.postRequestWithHeader(
        fetchUrl,
        params,
        token,
      );
      if (response.data != null) {
        setHoroscope(response.data);
        handleSaveData(response.data, selectedItem);
        setloading(false);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('erroring', error);
    }
  };

  const handleSaveData = async (value, key) => {
    const preferenceKey = {
      Today: Preferences.horoscope.today,
      Previous: Preferences.horoscope.yesterday,
      Tommorrow: Preferences.horoscope.tommorow,
    }[key];

    await Preferences.saveJsonPerences(preferenceKey, value);
    console.log('done');
  };

  const Loading = () => {
    return (
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    );
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
            <View style={styles.fleBox}>
              <BackButton placeholder={'Horoscope'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.width * 0.051,
                alignItems: 'center',
                gap: SIZES.width * 0.031,
              }}>
              <View style={styles.imageContainer}>
                <Image
                  source={Zodiac[selectedItems].image}
                  style={styles.image}
                />
              </View>
              <View>
                <Text style={styles.headline}>
                  {Zodiac[selectedItems].title}
                </Text>
              </View>
            </View>
            <View>
              <DaySelection onSelect={handleSelection} />
            </View>
            {loading ? (
              <View style={{marginTop: 50}}>
                <Loading />
              </View>
            ) : (
              <>
                {currentDaySelected === 'Monthly' ? (
                  <>
                    <View
                      style={{
                        marginTop: SIZES.width * 0.051,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginBottom: 50,
                      }}>
                      <Text
                        style={[
                          styles.description,
                          {fontWeight: '700', marginBottom: 10},
                        ]}></Text>
                      <Text style={styles.description}>
                        {horoscope.prediction ? horoscope.prediction : null}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={{marginTop: SIZES.width * 0.051}}>
                      <Text style={styles.text}>
                        {horoscope.prediction_date}
                      </Text>
                      <View style={styles.border} />
                    </View>
                    <View style={styles.boxContainer}>
                      <Text
                        style={[
                          styles.description,
                          {fontWeight: '700', marginBottom: 10},
                        ]}>
                        Emotions
                      </Text>
                      <Text style={[styles.description, {color: '#000'}]}>
                        {horoscope.prediction
                          ? horoscope.prediction.emotions
                          : null}
                      </Text>
                    </View>
                    <View style={styles.boxContainer}>
                      <Text
                        style={[
                          styles.description,
                          {fontWeight: '700', marginBottom: 10},
                        ]}>
                        Health
                      </Text>
                      <Text style={[styles.description, {color: '#000'}]}>
                        {horoscope.prediction
                          ? horoscope.prediction.health
                          : null}
                      </Text>
                    </View>
                    <View style={styles.boxContainer}>
                      <Text
                        style={[
                          styles.description,
                          {fontWeight: '700', marginBottom: 10},
                        ]}>
                        Personal Life
                      </Text>
                      <Text style={[styles.description, {color: '#000'}]}>
                        {horoscope.prediction
                          ? horoscope.prediction.personal_life
                          : null}
                      </Text>
                    </View>
                    <View style={[styles.boxContainer, {marginBottom: 50}]}>
                      <Text
                        style={[
                          styles.description,
                          {fontWeight: '700', marginBottom: 10},
                        ]}>
                        Profession
                      </Text>
                      <Text style={[styles.description, {color: '#000'}]}>
                        {horoscope.prediction
                          ? horoscope.prediction.profession
                          : null}
                      </Text>
                    </View>
                  </>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default HoroscopeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  boxContainer: {
    marginTop: SIZES.width * 0.051,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    padding: SIZES.width * 0.03,
    backgroundColor: '#fff',
    borderColor: '#7d3807',
    borderRadius: 5,
  },
  maincontainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.026,
    backgroundColor: '#FFB443',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  title: {
    fontFamily: 'KantumruyPro-Regular',
    color: COLORS.black,
    fontSize: SIZES.width * 0.041,
  },
  imageContainer: {
    width: SIZES.width * 0.25,
    height: SIZES.width * 0.25,
    borderRadius: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  headline: {
    fontSize: SIZES.width * 0.072,
    fontFamily: 'KantumruyPro-Regular',
    color: '#F76B1C',
    textTransform: 'uppercase',
  },
  text: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.051,
    color: '#171532',
    textTransform: 'capitalize',
  },
  border: {
    height: 1,
    borderWidth: 1,
    borderColor: '#FFB443',
  },
  description: {
    fontSize: SIZES.width * 0.041,
    fontFamily: 'KantumruyPro-Regular',
    color: '#7d3807',
    lineHeight: SIZES.width * 0.064,
  },
  fleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ModelBox: {
    width: SIZES.width * 0.95,
    height: SIZES.height * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  ModelBoxContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#fee4d4',
    height: SIZES.width * 0.205,
    padding: SIZES.width * 0.026,
    paddingTop: SIZES.width * 0.051,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  crossContainer: {
    position: 'absolute',
    right: SIZES.width * 0.051,
    top: SIZES.width * 0.051,
  },
  buttonContainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.051,
    backgroundColor: '#FFB443',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SIZES.width * 0.051,
    marginBottom: SIZES.width * 0.051,
  },
});
