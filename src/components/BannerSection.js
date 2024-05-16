import React, {useRef} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {SIZES} from '../constant/theme';

const {width: viewportWidth} = Dimensions.get('window');

const BannerSection = ({data, set}) => {
  const carouselRef = useRef(null);

  const renderItem = ({item}) => {
    return (
      <View style={styles.slideContainer}>
        <Image source={{uri: item}} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Carousel
        ref={carouselRef}
        data={data?.data?.[set]?.photos || []}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth * 0.85} // Adjusted to create margin
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        loop
      />
    </View>
  );
};

export default BannerSection;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: SIZES.height * 0.2,
    resizeMode: 'cover',
    borderRadius: 10, // Add some border radius if needed
  },
});
