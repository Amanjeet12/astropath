/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS} from '../../constant/theme';

const SearchPlaceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const onPlaceSelect = route.params?.onPlaceSelect;

  const handlePlaceSelected = (data, details) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${details.place_id}&key=AIzaSyA4zDlvsu-YT1dSdDvkJ39QONZw3hKuWuI`,
    )
      .then(response => response.json())
      .then(json => {
        const {lat, lng} = json.result.geometry.location;
        console.log('Latitude:', lat);
        console.log('Longitude:', lng);
        if (onPlaceSelect) {
          onPlaceSelect(data.structured_formatting.main_text, lat, lng);
        }
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error fetching place details:', error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 16,
        marginTop: 10,
      }}>
      <GooglePlacesAutocomplete
        placeholder="Search Place (min 3 characters)"
        textInputProps={{
          placeholderTextColor: '#808080',
          returnKeyType: 'search',
        }}
        onPress={(data, details = null) => {
          handlePlaceSelected(data, details);
        }}
        query={{
          key: 'AIzaSyA4zDlvsu-YT1dSdDvkJ39QONZw3hKuWuI',
          language: 'en',
        }}
        enablePoweredByContainer={false}
        renderLeftButton={() => (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={20} color="#000" />
          </TouchableOpacity>
        )}
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            flexDirection: 'row',
            backgroundColor: '#FBF8F2',
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 5,
          },
          textInput: {
            backgroundColor: '#FBF8F2',
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
            color: '#000',
          },
          poweredContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: '#c8c7cc',
            borderTopWidth: 0.5,
          },
          powered: {},
          listView: {},
          row: {
            padding: 13,
            height: 44,
            flexDirection: 'row',
          },
          separator: {
            height: 0.5,
            backgroundColor: '#000',
          },
          description: {
            color: '#000',
          },
          loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
          },
        }}
      />
    </View>
  );
};

export default SearchPlaceScreen;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10, // Adjust the padding as needed
    marginRight: 10,
  },
});
