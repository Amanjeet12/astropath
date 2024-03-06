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
import React, {useEffect, useState} from 'react';
import {images} from '../../constant';
import Cross from 'react-native-vector-icons/AntDesign';
import {Zodiac} from '../constant/data';
import {SIZES} from '../constant/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowPopUp = ({onHandle}) => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePopup = async () => {
    const selectedZodiacSign = Zodiac[selectedItem].title;
    const selectedItemIdString = selectedItem.toString(); // Convert selectedItem to a string

    try {
      await AsyncStorage.setItem('Zodic', selectedItemIdString);
      setShow(!show);
      onHandle(true);
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
        setShow(true);
        setSelectedItem(0);
      }
    };
    fetchHoroscope();
  }, []);

  return (
    <View>
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
                          fontSize: SIZES.width * 0.04,
                          color:
                            selectedItem === rowIndex * 3 + itemIndex
                              ? '#fff'
                              : '#000',
                          fontFamily: 'KantumruyPro-Regular',
                          textTransform: 'capitalize',
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
    </View>
  );
};

export default ShowPopUp;

const styles = StyleSheet.create({
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
});
