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
  Modal,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import DaySelection from '../../components/DaySelection';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Zodiac} from '../../constant/data';
import Cross from 'react-native-vector-icons/AntDesign';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Preferences from '../api/Preferences';

const HoroscopeScreen = ({route}) => {
  const {todayHoroscope, selectedItem} = route.params;
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState(selectedItem);
  const [horoscope, setHoroscope] = useState(todayHoroscope);
  const [loading, setloading] = useState(false);
  const [currentDaySelected, setCurrentDaySelected] = useState('');
  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const handleItemPress = index => {
    console.log(index);
    setSelectedItems(index);
  };
  const handlePopup = async () => {
    const selectedItemIdString = selectedItems.toString();

    try {
      await AsyncStorage.setItem('Zodic', selectedItemIdString);
      setShow(!show);
      handleSelection(currentDaySelected);
    } catch (error) {
      console.log(error);
    }
    setShow(!show);
  };

  const handleSelection = async selectedItem => {
    setCurrentDaySelected(selectedItem);
    setloading(true);
    let fetchUrl = '';
    if (selectedItem === 'Previous') {
      fetchUrl = WebUrls.url.previous_horoscope;
    } else if (selectedItem === 'Today') {
      fetchUrl = WebUrls.url.today_horoscope;
    } else if (selectedItem === 'Tommorrow') {
      fetchUrl = WebUrls.url.tommorrow_horoscope;
    } else {
      fetchUrl = WebUrls.url.monthly_horoscope;
    }

    try {
      var params = {
        zodiacName: Zodiac[selectedItems].title,
        tzone: '5.5',
      };

      let token;
      try {
        token = await Preferences.getPreferences(Preferences.key.Token);
      } catch (error) {
        console.error('Error getting latitude and longitude:', error);
        return;
      }
      WebMethods.postRequestWithHeader(fetchUrl, params, token).then(
        response => {
          if (response.data != null) {
            setHoroscope(response.data);
            setloading(false);
          } else {
            console.log('error');
          }
        },
      );
    } catch (error) {
      console.log('erroring', error);
    }
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
              <TouchableOpacity onPress={() => handlePopup()}>
                <Icon
                  name={'refresh'}
                  size={SIZES.width * 0.051}
                  color={'#000'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={Zodiac[selectedItems].image}
                style={styles.image}
              />
            </View>
            <View
              style={{alignItems: 'center', marginTop: SIZES.width * 0.051}}>
              <Text style={styles.headline}>{Zodiac[selectedItems].title}</Text>
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
                    <View
                      style={{
                        marginTop: SIZES.width * 0.051,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      <Text
                        style={[
                          styles.description,
                          {fontWeight: '700', marginBottom: 10},
                        ]}>
                        "Emotions"
                      </Text>
                      <Text style={styles.description}>
                        {horoscope.prediction
                          ? horoscope.prediction.emotions
                          : null}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: SIZES.width * 0.051,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      <Text
                        style={[
                          styles.description,
                          {fontWeight: '700', marginBottom: 10},
                        ]}>
                        "Health"
                      </Text>
                      <Text style={styles.description}>
                        {horoscope.prediction
                          ? horoscope.prediction.health
                          : null}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: SIZES.width * 0.051,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      <Text
                        style={[
                          styles.description,
                          {fontWeight: '700', marginBottom: 10},
                        ]}>
                        "Personal Life"
                      </Text>
                      <Text style={styles.description}>
                        {horoscope.prediction
                          ? horoscope.prediction.personal_life
                          : null}
                      </Text>
                    </View>
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
                        ]}>
                        "Profession"
                      </Text>
                      <Text style={styles.description}>
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

      <Modal
        visible={show}
        transparent={true}
        onRequestClose={() => handlePopup()}>
        <View style={styles.ModelBoxContainer}>
          <View style={styles.ModelBox}>
            <View style={styles.headerContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    fontWeight: '700',
                    textTransform: 'capitalize',
                    color: '#000',
                  },
                ]}>
                select Your Zodic Sign
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    color: '#475467',
                    textTransform: 'capitalize',
                    paddingTop: SIZES.width * 0.01,
                    fontSize: SIZES.width * 0.031,
                  },
                ]}>
                Select Your Zodic Sign for horoscope
              </Text>
              <TouchableOpacity
                style={styles.crossContainer}
                onPress={() => handlePopup()}>
                <Cross name={'close'} size={25} color={'#667085'} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {Zodiac.reduce((rows, item, index) => {
                if (index % 3 === 0) {
                  rows.push([]);
                }
                rows[rows.length - 1].push(item);
                return rows;
              }, []).map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  style={{flexDirection: 'row', padding: SIZES.width * 0.026}}>
                  {row.map((item, itemIndex) => (
                    <TouchableOpacity
                      key={itemIndex}
                      style={{
                        flex: 1,
                        backgroundColor:
                          selectedItems === rowIndex * 3 + itemIndex
                            ? '#FFB443'
                            : 'white',
                        alignItems: 'center',
                        paddingVertical: SIZES.width * 0.039,
                        borderRadius: 20,
                      }}
                      onPress={() => handleItemPress(rowIndex * 3 + itemIndex)}>
                      <Image
                        source={item.image}
                        style={{
                          width: SIZES.width * 0.255,
                          height: SIZES.width * 0.255,
                          marginBottom: SIZES.width * 0.013,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: SIZES.width * 0.031,
                          color:
                            selectedItems === rowIndex * 3 + itemIndex
                              ? '#fff'
                              : '#000',
                          fontFamily: 'KantumruyPro-Regular',
                        }}>
                        {item.title}
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
                    {fontWeight: '500', fontSize: SIZES.width * 0.041},
                  ]}>
                  Update
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    marginTop: SIZES.width * 0.051,
    width: SIZES.width * 0.382,
    height: SIZES.width * 0.382,
    alignSelf: 'center',
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
    color: '#000',
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
