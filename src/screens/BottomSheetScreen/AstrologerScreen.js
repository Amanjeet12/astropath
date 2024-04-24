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
} from 'react-native';
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
  const IsFocused = useIsFocused();
  const [astrologers, setAstrologers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchAstrologers();
    }, 2000);
  };

  useEffect(() => {
    fetchAstrologers();
  }, [refreshing, IsFocused]);

  const fetchAstrologers = async () => {
    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        const response = await WebMethods.getRequestWithHeader(
          WebUrls.url.fetchAstrologer,
          token,
        );
        if (response != null) {
          setAstrologers(response.data);
        } else {
          console.log('error fetching astrologers');
        }
      }
    } catch (error) {
      console.error('Error fetching astrologers:', error);
    }
  };

  const handleFilterChange = itemValue => {
    if (itemValue === 'All') {
      setSelectedFilters([]); // Clear all filters if 'All' is selected
    } else {
      const newFilters = selectedFilters.includes('All')
        ? [itemValue] // Start new filter array with the selected item if 'All' was previously selected
        : [...selectedFilters];
      const index = newFilters.indexOf(itemValue);
      if (index > -1) {
        newFilters.splice(index, 1); // Remove filter if it's already selected
      } else {
        newFilters.push(itemValue); // Add filter if not selected
      }
      setSelectedFilters(newFilters);
    }
  };

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
            <View style={{marginTop: SIZES.width * 0.051}}>
              <FlatList
                data={expertiseAreas}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleFilterChange(item)}
                    style={{
                      padding: 5,
                      borderWidth: 1,
                      marginHorizontal: 3,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      backgroundColor:
                        (selectedFilters.length === 0 && item === 'All') ||
                        selectedFilters.includes(item)
                          ? COLORS.primary
                          : COLORS.transparent,
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
              <View style={{marginTop: 30}}>
                <AstrologerComponent
                  data={astrologers}
                  filters={selectedFilters}
                />
              </View>
            </View>
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
  tagLine: {
    fontSize: SIZES.width * 0.051,
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
    textTransform: 'capitalize',
  },
});
