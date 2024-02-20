import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import Custombutton from '../../components/Custombutton';
import {useNavigation} from '@react-navigation/native';
import {language} from '../../constant/data';

const LanguageScreen = () => {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.goBack();
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={{marginRight: SIZES.width * 0.026}}>
      <View style={styles.language_Container}>
        <Text style={styles.text_container}>{item.title}</Text>
        <Text style={styles.text_container}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );
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
            <View style={{width: SIZES.width * 0.38}}>
              <BackButton placeholder={'Language'} />
            </View>
            <View style={{marginTop: SIZES.width * 0.051}}>
              <FlatList
                horizontal
                data={language}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  buttonContainer: {
    height: SIZES.width * 0.013,
    marginTop: SIZES.width * 0.026,
    backgroundColor: '#FFB443',
    borderRadius: SIZES.width * 0.039,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: SIZES.width * 0.01,
  },
  title: {
    fontFamily: 'KantumruyPro-Regular',
    color: COLORS.black,
    fontSize: SIZES.width * 0.041,
  },
  button_position: {
    position: 'absolute',
    width: '100%',
    bottom: SIZES.width * 0.102,
    paddingHorizontal: SIZES.width * 0.051,
  },
  language_Container: {
    width: SIZES.width * 0.205,
    height: SIZES.width * 0.153,
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#F39200',
    borderRadius: SIZES.width * 0.021,
  },
  text_container: {
    color: '#000',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.036,
  },
});
