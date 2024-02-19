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
    <TouchableOpacity style={{marginRight: 10}}>
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
            <View style={{marginTop: 10}}>
              <HeaderSection />
            </View>
            <View style={{width: 150}}>
              <BackButton placeholder={'Language'} />
            </View>
            <View style={{marginTop: 20}}>
              <FlatList
                horizontal
                data={language}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.button_position}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleNavigation()}>
            <Text style={styles.title}>Update</Text>
          </TouchableOpacity>
        </View>
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
    marginHorizontal: 20,
  },
  buttonContainer: {
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
  button_position: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    paddingHorizontal: 20,
  },
  language_Container: {
    width: 80,
    height: 60,
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#F39200',
    borderRadius: 8,
  },
  text_container: {
    color: '#000',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: 14,
  },
});
