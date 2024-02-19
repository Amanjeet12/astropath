/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';

const TermsAndConditionScreen = () => {
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
            <View style={{width: 250}}>
              <BackButton placeholder={'Terms & Conditions'} />
            </View>
            <View style={{marginTop: 20}}>
              <View>
                <Text style={{fontSize: 20, color: '#000'}}>Clause 1</Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Viverra condimentum eget purus in. Consectetur eget id morbi
                  amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper
                  suspendisse aenean leo pharetra in sit semper et. Amet quam
                  placerat sem.
                </Text>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <View>
                <Text style={{fontSize: 20, color: '#000'}}>Clause 2</Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Viverra condimentum eget purus in. Consectetur eget id morbi
                  amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper
                  suspendisse aenean leo pharetra in sit semper et. Amet quam
                  placerat sem.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default TermsAndConditionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#000',
    lineHeight: 22,
  },
});
