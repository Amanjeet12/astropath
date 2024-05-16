/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, SIZES} from '../constant/theme';
import Icon from 'react-native-vector-icons/Entypo';
import RBSheet from 'react-native-raw-bottom-sheet';
import StarRating from 'react-native-star-rating';
import {TextInput} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import Preferences from '../screens/api/Preferences';
import WebMethods from '../screens/api/WebMethods';
import WebUrls from '../screens/api/WebUrls';

const OrderSection = ({data, refreshing}) => {
  const refRBSheet = useRef();
  const [rating, setRating] = useState(0);
  const [bio, setBio] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState(null);

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  useEffect(() => {
    const isFirstItemNotRated = data && data.length > 0 && !data[0].rating;

    if (isFirstItemNotRated) {
      setTimeout(() => {
        refRBSheet.current.open();
        setID(data[0]._id);
      }, 1000);
    }
  }, [data]);

  const checkConnectivity = async () => {
    const state = await NetInfo.fetch();
    const isConnected = state.isConnected;
    if (!isConnected) {
      setToastMsg('No internet connection');
    }
    return isConnected;
  };

  const fetchDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationInSeconds = (endTime - startTime) / 1000;
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    if (isNaN(minutes) || isNaN(seconds)) {
      return '0 sec';
    }

    return `${minutes} min ${seconds} sec`;
  };

  const formateDate = dateString => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    return formattedDate;
  };

  const onStarRatingPress = rating => {
    setRating(rating);
  };

  const handleBioChange = text => {
    setBio(text);
    setWordCount(text.split(' ').filter(Boolean).length);
  };

  const handleNavigation = async () => {
    if (!rating || !bio) {
      setToastMsg('Fill All The Details');
    } else {
      setLoading(true);
      const isConnected = await checkConnectivity();
      if (!isConnected) {
        setLoading(false);
        return;
      }

      const params = {
        interactionId: id,
        review: bio,
        rating: rating,
      };
      try {
        const token = await Preferences.getPreferences(Preferences.key.Token);
        if (token) {
          const response = await WebMethods.postRequestWithHeader(
            WebUrls.url.review_to_astrologer,
            params,
            token,
          );
          if (response != null) {
            console.log(response.data);
            setRating(0);
            setBio('');
            refreshing(true);
            setLoading(false);
            setToastMsg('Thanks For Rating');
            refRBSheet.current.close();
          } else {
            console.log('Error posting review');
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error posting review:', error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <View key={index} style={styles.container}>
              <View>
                <Text style={styles.name}>{item.astrologerName}</Text>
                <Text style={styles.categories}>
                  date - {formateDate(item.date)}
                </Text>
                <Text style={styles.experience}>service - {item.service}</Text>
                <Text style={styles.experience}>status - {item.status}</Text>
                <Text style={styles.cost}>Total Cost - {item.cost}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <Text style={[styles.categories, {color: COLORS.black}]}>
                  Duration: {fetchDuration(item.startTime, item.endTime)}
                </Text>
                {item.rating ? (
                  <TouchableOpacity style={styles.starContainer}>
                    <Text style={[styles.categories, {color: '#000'}]}>
                      {item.rating}
                    </Text>
                    <Icon
                      name={'star'}
                      color={'#000'}
                      size={SIZES.width * 0.041}
                    />
                  </TouchableOpacity>
                ) : item.status === 'Rejected' ? null : (
                  <TouchableOpacity
                    style={styles.starContainer}
                    onPress={() => {
                      refRBSheet.current.open(), setID(item._id);
                    }}>
                    <Text style={[styles.categories, {color: '#000'}]}>
                      Rate Astrologer
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}

      <RBSheet
        ref={refRBSheet}
        height={355}
        openDuration={100}
        closeDuration={1}
        customStyles={{
          container: {
            borderTopEndRadius: 32,
            borderTopStartRadius: 32,
          },
        }}>
        <View style={styles.mainContainer}>
          <View>
            <Text style={{fontSize: 16, color: '#000', fontWeight: '700'}}>
              RATE US
            </Text>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <View style={{width: '90%'}}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={rating}
                  selectedStar={rating => onStarRatingPress(rating)}
                  fullStarColor={'#f1c40f'}
                  starSize={30}
                />
              </View>
            </View>
            <View style={[styles.mainContainer2, {height: SIZES.width * 0.4}]}>
              <TextInput
                placeholder={'Your Feedback'}
                style={{
                  paddingLeft: SIZES.width * 0.025,
                  color: COLORS.black,
                  textTransform: 'capitalize',
                  textAlignVertical: 'top',
                  paddingTop: SIZES.width * 0.035,
                  width: '100%',
                  height: '100%',
                }}
                multiline={true}
                numberOfLines={10}
                maxLength={250}
                placeholderTextColor={COLORS.black}
                onChangeText={handleBioChange}
                value={bio}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleNavigation()}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color={COLORS.black} />
              ) : (
                <Text
                  style={[
                    styles.title2,
                    {fontWeight: '500', fontSize: SIZES.width * 0.041},
                  ]}>
                  Submit
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </>
  );
};

export default OrderSection;

const styles = StyleSheet.create({
  title2: {
    fontSize: SIZES.width * 0.036,
    color: '#000',
    textTransform: 'capitalize',
  },
  buttonContainer: {
    height: SIZES.width * 0.13,
    marginTop: SIZES.width * 0.051,
    backgroundColor: '#FFB443',
    borderRadius: SIZES.width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.width * 0.05,
  },
  container: {
    height: SIZES.width * 0.31,
    marginTop: SIZES.width * 0.051,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.width * 0.02,
    padding: SIZES.width * 0.041,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#843c14',
  },
  name: {
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
    fontSize: SIZES.width * 0.036,
    textTransform: 'capitalize',
  },
  categories: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.031,
    color: '#707B81',
    paddingTop: SIZES.width * 0.01,
    textTransform: 'capitalize',
  },
  experience: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.031,
    color: '#707B81',
    textTransform: 'capitalize',
  },
  cost: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: SIZES.width * 0.026,
    color: COLORS.black,
    paddingTop: 3,
    textTransform: 'capitalize',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: SIZES.width * 0.039,
    paddingVertical: 3,
    borderRadius: SIZES.width * 0.039,
    backgroundColor: '#FFB443',
  },
  mainContainer: {
    flex: 1,
    padding: 25,
  },
  mainContainer2: {
    height: SIZES.width * 0.13,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.width * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.width * 0.013,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginTop: 15,
  },
});
