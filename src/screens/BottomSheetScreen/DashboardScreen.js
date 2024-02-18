import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import HeaderSection from '../../components/HeaderSection';
import {images} from '../../constant';
import BannerSection from '../../components/BannerSection';
import SearchSection from '../../components/SearchSection';
import AstrologerType from '../../components/AstrologerType';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#F7F1E1'} barStyle={'dark-content'} />
      <ScrollView>
        <ImageBackground
          source={images.background_Image}
          style={{width: SIZES.width, height: 300}}
          imageStyle={{resizeMode: 'stretch'}}>
          <View style={styles.mainContainer}>
            <View style={{marginTop: 10}}>
              <HeaderSection />
            </View>
            <View style={{marginTop: 10}}>
              <SearchSection placeholder={' Search Astrologer'} />
            </View>
            <View style={{marginTop: 20}}>
              <BannerSection />
            </View>
          </View>
        </ImageBackground>
        <View>
          <AstrologerType />
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: 20,
  },
});
