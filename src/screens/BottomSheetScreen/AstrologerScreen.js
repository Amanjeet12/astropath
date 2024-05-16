/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {images} from '../../constant';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import Preferences from '../api/Preferences';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import AstrologerComponent from '../../components/AstrologerComponent';
import {useIsFocused} from '@react-navigation/native';

const expertiseAreas = [
  'All', // Adding the 'All' option at the beginning of the list
  'Tarot',
  'Numerology',
  'KP',
  'Crystal',
  'Palmistry',
  'Vedic',
  'Nadal',
  'Psychic',
  'Face Reading',
  'Vastu',
  'Nadi',
  'Muhurat',
];

const AstrologerScreen = () => {
  const isFocused = useIsFocused();
  const [astrologers, setAstrologers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortedAstrologers, setSortedAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkConnectivity = async () => {
    const state = await NetInfo.fetch();
    const isConnected = state.isConnected;
    if (!isConnected) {
      ToastAndroid.showWithGravity(
        'No internet connection',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
    return isConnected;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true);
    const isConnected = await checkConnectivity();
    if (isConnected) {
      fetchAstrologers();
    } else {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchAstrologers = async () => {
    try {
      const isConnected = await checkConnectivity();
      if (!isConnected) {
        setLoading(false);
        return;
      }

      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        const response = await WebMethods.getRequestWithHeader(
          WebUrls.url.fetchAstrologer,
          token,
        );
        if (response != null) {
          setAstrologers(response.data);
          console.log(response.data);
          setSortedAstrologers(
            sortAndFilterAstrologers(response.data, selectedFilters),
          );
        } else {
          console.log('Error fetching astrologers');
        }
      }
    } catch (error) {
      console.error('Error fetching astrologers:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (refreshing || isFocused) {
      fetchAstrologers();
    }
  }, [refreshing, isFocused]);

  useEffect(() => {
    setSortedAstrologers(
      sortAndFilterAstrologers(astrologers, selectedFilters),
    );
  }, [astrologers, selectedFilters]);

  const handleFilterChange = itemValue => {
    let newFilters = [];
    if (itemValue === 'All') {
      newFilters = []; // Clear all filters if 'All' is selected
    } else {
      newFilters = selectedFilters.includes('All')
        ? [itemValue]
        : [...selectedFilters];
      const index = newFilters.indexOf(itemValue);
      if (index > -1) {
        newFilters.splice(index, 1); // Remove filter if it's already selected
      } else {
        newFilters.push(itemValue); // Add filter if not selected
      }
    }
    setSelectedFilters(newFilters);
  };

  function sortAndFilterAstrologers(astrologers, filters) {
    // Create a copy of the astrologers array to avoid modifying the original
    const sortedAstrologers = [...astrologers].sort((a, b) => {
      if (a.featured === b.featured) {
        return a.name.localeCompare(b.name);
      }
      return a.featured ? -1 : 1;
    });

    // Filtering Logic
    if (filters.length === 0 || filters.includes('All')) {
      return sortedAstrologers;
    }

    return sortedAstrologers.filter(astrologer =>
      filters.some(filter => astrologer.expertise.includes(filter)),
    );
  }

  return (
    <>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.mainContainer}>
            <View style={{marginTop: SIZES.width * 0.026}}>
              <HeaderSection />
            </View>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              <View style={{marginTop: SIZES.width * 0.031}}>
                <FlatList
                  data={expertiseAreas}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => handleFilterChange(item)}
                      style={{
                        padding: 5,
                        borderWidth:
                          (selectedFilters.length === 0 && item === 'All') ||
                          selectedFilters.includes(item)
                            ? 1.5
                            : 0.5,
                        marginHorizontal: 3,
                        paddingHorizontal: 15,
                        borderRadius: 15,
                        backgroundColor: COLORS.white,
                        borderColor:
                          (selectedFilters.length === 0 && item === 'All') ||
                          selectedFilters.includes(item)
                            ? COLORS.primary
                            : COLORS.black,
                      }}>
                      <Text
                        style={[
                          styles.tagLine,
                          {
                            color: selectedFilters.includes(item)
                              ? COLORS.black
                              : COLORS.black,
                          },
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item}
                  horizontal
                />
                <View style={{marginTop: 15}}>
                  <AstrologerComponent
                    data={sortedAstrologers}
                    filters={selectedFilters}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default AstrologerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  mainContainers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.width * 0.051,
  },
  tagLine: {
    fontSize: SIZES.width * 0.031,
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
