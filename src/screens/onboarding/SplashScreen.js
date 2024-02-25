/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Animated,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';

const Splashscreen = () => {
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const logoScaleValue = useRef(new Animated.Value(1)).current;
  const indicatorTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.sequence([
        Animated.delay(1000),

        Animated.timing(logoScaleValue, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(indicatorTranslateY, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowActivityIndicator(true);

        // setTimeout(() => {
        //   navigation.navigate('OnboardingScreen');
        // }, 1000);
      });
    };

    startAnimation();
  }, [logoScaleValue, indicatorTranslateY]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.black} barStyle={'light-content'} />

      <Animated.View style={{transform: [{scale: logoScaleValue}]}}>
        <Image
          source={images.astropath_logo}
          style={{
            width: SIZES.width * 0.6,
            height: SIZES.width * 0.5,
            resizeMode: 'contain',
          }}
        />
      </Animated.View>

      {showActivityIndicator && (
        <Animated.View
          style={{
            position: 'absolute',
            transform: [
              {
                translateY: indicatorTranslateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 80], // Adjust the offset as needed
                }),
              },
            ],
          }}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});

export default Splashscreen;
