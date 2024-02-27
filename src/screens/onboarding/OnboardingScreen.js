/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {onBoardingSlider} from '../../constant/data';
import {COLORS, SIZES} from '../../constant/theme';
import {Circle, G, Svg} from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';

const OnboardingScreen = ({navigation}) => {
  const slides = onBoardingSlider;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [animatedOffset] = useState(new Animated.Value(0));

  // console.log('Se', SIZES.width * 0.9);

  const size = SIZES.width * 0.24;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const ref = React.useRef();

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SIZES.width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * SIZES.width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.replace('LoginScreen');
    }
  };

  const desiredOffsets = [33, 66, 100];

  const getDesiredOffset = () => {
    if (currentSlideIndex < desiredOffsets.length) {
      return desiredOffsets[currentSlideIndex];
    }
    return 0;
  };

  const offset = getDesiredOffset();

  const Slide = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={item?.image}
            style={{width: '95%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.spaceContainer} />
        <View>
          <View>
            <Text style={styles.title}>{item?.title}</Text>
          </View>
          <View>
            <Text style={styles.description}>{item?.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  const Footer = () => {
    if (currentSlideIndex === slides.length - 1) {
      // Check if it's the last slide
      return (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: SIZES.width * 0.13,
            left: SIZES.width * 0.051,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={goToNextSlide}
            style={{
              width: SIZES.width - SIZES.width * 0.1,
              height: SIZES.width * 0.15,
              backgroundColor: '#FFB443',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.width * 0.8,
              borderWidth: 1,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4}, // Change shadow offset if needed
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: SIZES.width * 0.051,
                fontFamily: 'KantumruyPro-Bold',
              }}>
              Started Now
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Original circle design
    return (
      <View
        style={{
          position: 'absolute',
          right: SIZES.width * 0.051,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: SIZES.width * 0.13,
        }}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={center}>
            <Circle
              stroke={'#fff'}
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <Circle
              stroke={'#843c14'}
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * offset) / 100}
              fill={'#fff'}
            />
          </G>
        </Svg>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goToNextSlide}
          style={styles.btn}>
          <Icon name="right" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.black} barStyle={'light-content'} />

      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: SIZES.height}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        bounces={false}
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainContainer: {
    height: SIZES.height,
    width: SIZES.width,
    alignItems: 'center',
  },
  spaceContainer: {
    height: '5%',
  },
  circleContainer: {
    height: '75%',
    backgroundColor: '#33FF9B',
    position: 'relative',
    borderTopRightRadius: SIZES.width * 0.83,
    justifyContent: 'center',
  },
  imageContainer: {
    width: '80%',
    height: '50%',
    alignItems: 'center',
    marginTop: SIZES.width * 0.08,
  },
  btn: {
    position: 'absolute',
    width: SIZES.width * 0.211,
    height: SIZES.width * 0.211,
    borderRadius: SIZES.width * 0.13,
    backgroundColor: '#FFB443',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: SIZES.width * 0.078,
    lineHeight: SIZES.width * 0.13,
    color: COLORS.black,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'KantumruyPro-Light',
    fontSize: SIZES.width * 0.044,
    lineHeight: SIZES.width * 0.064,
    color: COLORS.black,
    textAlign: 'center',
  },
});
