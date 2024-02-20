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
  Button,
  FlatList,
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
            <View style={{marginTop: 10}}>
              <HeaderSection />
            </View>
            <View style={styles.fleBox}>
              <BackButton placeholder={'Horoscope'} />
              <TouchableOpacity onPress={() => handlePopup()}>
                <Icon name={'refresh'} size={20} color={'#000'} />
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <Image source={images.Sagittarius} style={styles.image} />
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text style={styles.headline}>Sagittarius</Text>
            </View>
            <View>
              <DaySelection />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.text}>09th feb 2024</Text>
              <View style={styles.border} />
            </View>
            <View style={{marginTop: 20}}>
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
                    paddingTop: 3,
                    fontSize: 12,
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
                  style={{flexDirection: 'row', padding: 10}}>
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
                        paddingVertical: 15,
                        borderRadius: 20,
                      }}
                      onPress={() => handleItemPress(rowIndex * 3 + itemIndex)}>
                      <Image
                        source={item.image}
                        style={{width: 100, height: 100, marginBottom: 5}}
                      />
                      <Text
                        style={{
                          fontSize: 12,
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
                <Text style={[styles.title, {fontWeight: '500', fontSize: 16}]}>
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
  imageContainer: {
    marginTop: 20,
    width: 150,
    height: 150,
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
    fontSize: 28,
    fontFamily: 'KantumruyPro-Regular',
    color: '#F76B1C',
  },
  text: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: 20,
    color: '#171532',
    textTransform: 'capitalize',
  },
  border: {
    height: 1,
    borderWidth: 1,
    borderColor: '#FFB443',
  },
  description: {
    fontSize: 16,
    fontFamily: 'KantumruyPro-Regular',
    color: '#000',
    lineHeight: 25,
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
    height: 80,
    padding: 10,
    paddingTop: 20,
  },
  crossContainer: {position: 'absolute', right: 20, top: 20},
  buttonContainer: {
    height: 50,
    marginTop: 20,
    backgroundColor: '#FFB443',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
