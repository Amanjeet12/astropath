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
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import DaySelection from '../../components/DaySelection';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Zodic} from '../../constant/data';
import Cross from 'react-native-vector-icons/AntDesign';

const HoroscopeScreen = () => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0); // Initialize with the index of the first item

  const handleItemPress = index => {
    setSelectedItem(index);
  };
  const handlePopup = () => {
    setShow(!show);
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
              <Image source={images.Sagittarius} style={styles.image} />
            </View>
            <View
              style={{alignItems: 'center', marginTop: SIZES.width * 0.051}}>
              <Text style={styles.headline}>Sagittarius</Text>
            </View>
            <View>
              <DaySelection />
            </View>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <Text style={styles.text}>09th feb 2024</Text>
              <View style={styles.border} />
            </View>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <Text style={styles.description}>
                You may notice that you're in need of some serious self-care,
                sweet Scorpion, as the sun and Uranus square off. Consider your
                options before pursuing the day, taking a mental health breather
                if your schedule or work situation allows the reprieve. You'll
                have a chance to fully let go when your needs are met, thanks to
                a helpful union between the Aquarius moon and transformative
                Pluto. This cosmic climate also encourages domestic tidying, and
                you'll crave organization when Mercury activates later today.
                Emotional yet therapeutic conversations may emerge, making it
                important to speak from the heart while encouraging loved ones
                to do the same.
              </Text>
            </View>
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
                  {fontWeight: '700', textTransform: 'capitalize'},
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
              {Zodic.reduce((rows, item, index) => {
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
                          selectedItem === rowIndex * 3 + itemIndex
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
                            selectedItem === rowIndex * 3 + itemIndex
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
