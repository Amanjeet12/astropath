import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {images} from '../constant';
import {SIZES} from '../constant/theme';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const DashaSection = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <View style={styles.flexBox}>
        <View>
          <Text style={styles.title}>Mahadasha Chart</Text>
        </View>
        {/* <View style={{width: 120, backgroundColor: '#fff'}}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            itemContainerStyle={{}}
            itemTextStyle={{fontSize: 12, padding: 0}}
            data={data}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View> */}
      </View>
      <View style={styles.border} />
      <View style={{marginTop: SIZES.width * 0.026}}>
        <View>
          <Image
            source={images.table}
            style={{
              width: '100%',
              height: SIZES.width * 0.9,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text style={styles.description}>
          You may notice that you're in need of some serious self-care, sweet
          Scorpion, as the sun and Uranus square off. Consider your options
          before pursuing the day, taking a mental health breather if your
          schedule or work situation allows the reprieve. You'll have a chance
          to fully let go when your needs are met, thanks to a helpful union
          between the Aquarius moon and transformative Pluto. This cosmic
          climate also encourages domestic tidying, and you'll crave
          organization when Mercury activates later today. Emotional yet
          therapeutic conversations may emerge, making it important to speak
          from the heart while encouraging loved ones to do the same.
        </Text>
      </View>
    </>
  );
};

export default DashaSection;

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.width * 0.051,
    color: '#171532',
    fontFamily: 'KantumruyPro-Regular',
  },
  dropdown: {
    height: SIZES.width * 0.102,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: SIZES.width * 0.021,
    borderRadius: 4,
  },
  placeholderStyle: {
    fontSize: SIZES.width * 0.031,
  },
  selectedTextStyle: {
    fontSize: SIZES.width * 0.031,
  },
  iconStyle: {
    width: SIZES.width * 0.051,
    height: SIZES.width * 0.051,
  },
  inputSearchStyle: {
    height: SIZES.width * 0.051,
    fontSize: SIZES.width * 0.031,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    height: 1,
    borderWidth: 0.5,
    borderColor: '#F39200',
    marginTop: SIZES.width * 0.013,
  },
  description: {
    fontSize: SIZES.width * 0.041,
    fontFamily: 'KantumruyPro-Regular',
    color: '#000',
    lineHeight: SIZES.width * 0.064,
  },
});
