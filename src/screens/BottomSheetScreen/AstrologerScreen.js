import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '../../constant';
import {SIZES} from '../../constant/theme';

const AstrologerScreen = () => {
  return (
    <View>
      <ImageBackground
        source={images.blur}
        style={{width: SIZES.width, height: SIZES.height}}
        imageStyle={{resizeMode: 'cover'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'DMSerifDisplay-Regular',
              color: '#000',
            }}>
            Comming Soon
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AstrologerScreen;

const styles = StyleSheet.create({});
