/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const MarraigeKundli = () => {
  const [loading, setLoading] = useState(false);
  const [birth_detail, setBirth_detail] = useState(null);
  const [matching_report, setMatching_report] = useState(null);
  const [manglik_report, setManglik_report] = useState(null);

  useEffect(() => {
    if (birth_detail == null) {
      fetchData();
    }
  }, [birth_detail]);

  const fetchData = async () => {
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdXBlcl9hZG1pbl91c2VyX2lkIjpudWxsLCJhc3Ryb2xvZ2VyX3VzZXJfaWQiOm51bGwsImN1c3RvbWVyX3VzZXJfaWQiOiI2NWRhZWIxZDEyYjlhYTQ3Mjk2YTg1YjgiLCJpYXQiOjE3MDg4NDU4NTN9.BnuhdqU2HBfnK4pyCBEYVr3bDnezteegc-hQnNHzEow';
      const params = {
        name: 'ttt',
        m_day: '10',
        m_month: '5',
        m_year: '1990',
        m_hour: '11',
        m_min: '55',
        m_lat: '19.20',
        m_lon: '25.2',
        m_tzone: '5.5',
        f_day: '10',
        f_month: '5',
        f_year: '1990',
        f_hour: '11',
        f_min: '55',
        f_lat: '19.20',
        f_lon: '25.2',
        f_tzone: '5.5',
      };

      const [birthDetailData] = await Promise.all([
        WebMethods.postRequestWithHeader(
          WebUrls.url.match_ashtakoot_points,
          params,
          token,
        ),
      ]);

      setBirth_detail(birthDetailData.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const data = {
    data: {
      bhakut: {
        description:
          'Constructive Ability / Constructivism / Society and Couple',
        female_koot_attribute: 'Scorpio',
        male_koot_attribute: 'Scorpio',
        received_points: 7,
        total_points: 7,
      },
      conclusion: {
        report:
          'The match has scored 28 points outs of 36 points. This is a reasonably good score. Moreover,your rashi lords are friendly with each other thereby signifying mental compatibility and mutual affection between the two. Hence, this is a favourable Ashtakoota match.',
        status: true,
      },
      gan: {
        description: 'Temperament',
        female_koot_attribute: 'Rakshasa',
        male_koot_attribute: 'Rakshasa',
        received_points: 6,
        total_points: 6,
      },
      maitri: {
        description: 'Friendship',
        female_koot_attribute: 'Mars',
        male_koot_attribute: 'Mars',
        received_points: 5,
        total_points: 5,
      },
      nadi: {
        description: 'Progeny / Excess',
        female_koot_attribute: 'Ant',
        male_koot_attribute: 'Ant',
        received_points: 0,
        total_points: 8,
      },
      tara: {
        description: 'Comfort - Prosperity - Health',
        female_koot_attribute: 'Vishakha',
        male_koot_attribute: 'Vishakha',
        received_points: 3,
        total_points: 3,
      },
      total: {minimum_required: 18, received_points: 28, total_points: 36},
      varna: {
        description: 'Natural Refinement  / Work',
        female_koot_attribute: 'Vipra',
        male_koot_attribute: 'Vipra',
        received_points: 1,
        total_points: 1,
      },
      vashya: {
        description: 'Innate Giving / Attraction  towards each other',
        female_koot_attribute: 'Keetak',
        male_koot_attribute: 'Keetak',
        received_points: 2,
        total_points: 2,
      },
      yoni: {
        description: 'Intimate Physical',
        female_koot_attribute: 'Vyaaghra',
        male_koot_attribute: 'Vyaaghra',
        received_points: 4,
        total_points: 4,
      },
    },
    msg: 'Successfully Fetched data',
    success: 1,
  };
  const ProgressCircle = ({
    label,
    receivedPoints,
    totalPoints,
    tintColor,
    backgroundColor,
  }) => (
    <View style={{width: '20%', alignItems: 'center'}}>
      <AnimatedCircularProgress
        size={60}
        width={5}
        fill={(receivedPoints / totalPoints) * 100}
        tintColor={tintColor}
        backgroundColor={backgroundColor}
        onAnimationComplete={() => console.log('onAnimationComplete')}>
        {fill => (
          <View>
            <Text style={{fontSize: 20, color: '#000'}}>
              {receivedPoints}{' '}
              <Text style={{fontSize: 14, color: '#000'}}>/ {totalPoints}</Text>
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
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
            <View style={{width: SIZES.width * 0.65}}>
              <BackButton placeholder={'Marraige Kundli'} />
            </View>

            {loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 100,
                }}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <>
                <View style={{marginTop: SIZES.width * 0.04}}>
                  <Image
                    source={images.marriage_meter}
                    style={{
                      width: '100%',
                      height: SIZES.width * 0.46,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View style={styles.boxContainer}>
                  <ProgressCircle
                    label=" Temperament  ( gan )"
                    receivedPoints={birth_detail.gan.received_points}
                    totalPoints={birth_detail.gan.total_points}
                    tintColor="#f1c21b"
                    backgroundColor="#f9e59e"
                  />
                  <View style={{width: '80%'}}>
                    <Text style={styles.title}>Temperament ( gan )</Text>
                    <Text style={styles.description}>
                      Varna refers to the mental compatibility of two persons
                      involved. It holds nominal effect in the matters of
                      marriage compatibility
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <ProgressCircle
                    label="Love ( Bhakut )"
                    receivedPoints={birth_detail.bhakut.received_points}
                    totalPoints={birth_detail.bhakut.total_points}
                    tintColor="#ff6f6f"
                    backgroundColor="#ffb8b8"
                  />
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#FF6F6F'}]}>
                      Love ( Bhakut )
                    </Text>
                    <Text style={styles.description}>
                      Varna refers to the mental compatibility of two persons
                      involved. It holds nominal effect in the matters of
                      marriage compatibility
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <ProgressCircle
                    label=" Dominance ( Vashya )"
                    receivedPoints={birth_detail.bhakut.received_points}
                    totalPoints={birth_detail.bhakut.total_points}
                    tintColor="#4D26B9"
                    backgroundColor="#946FFF"
                  />
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#946FFF'}]}>
                      Dominance ( Vashya )
                    </Text>
                    <Text style={styles.description}>
                      Varna refers to the mental compatibility of two persons
                      involved. It holds nominal effect in the matters of
                      marriage compatibility
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Health ( nadi' )"
                      receivedPoints={birth_detail.bhakut.received_points}
                      totalPoints={birth_detail.bhakut.total_points}
                      tintColor="#f1c21b"
                      backgroundColor="#f9e59e"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#D88200'}]}>
                      Health ( nadi )
                    </Text>
                    <Text style={styles.description}>
                      Varna refers to the mental compatibility of two persons
                      involved. It holds nominal effect in the matters of
                      marriage compatibility
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Destiny ( Tara )"
                      receivedPoints={birth_detail.bhakut.received_points}
                      totalPoints={birth_detail.bhakut.total_points}
                      tintColor="#ff6f6f"
                      backgroundColor="#ffb8b8"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#FF6F6F'}]}>
                      Destiny ( Tara )
                    </Text>
                    <Text style={styles.description}>
                      Varna refers to the mental compatibility of two persons
                      involved. It holds nominal effect in the matters of
                      marriage compatibility
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Physical compatibility ( Yoni )"
                      receivedPoints={birth_detail.bhakut.received_points}
                      totalPoints={birth_detail.bhakut.total_points}
                      tintColor="#4D26B9"
                      backgroundColor="#946FFF"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#946FFF'}]}>
                      Physical compatibility ( Yoni )
                    </Text>
                    <Text style={styles.description}>
                      Varna refers to the mental compatibility of two persons
                      involved. It holds nominal effect in the matters of
                      marriage compatibility
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Destiny ( Tara )"
                      receivedPoints={birth_detail.bhakut.received_points}
                      totalPoints={birth_detail.bhakut.total_points}
                      tintColor="#f1c21b"
                      backgroundColor="#f9e59e"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#D88200'}]}>
                      Compatibility ( Varna )
                    </Text>
                    <Text style={styles.description}>
                      Varna refers to the mental compatibility of two persons
                      involved. It holds nominal effect in the matters of
                      marriage compatibility
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.boxContainer,
                    {marginBottom: SIZES.width * 0.041},
                  ]}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Destiny ( Tara )"
                      receivedPoints={birth_detail.bhakut.received_points}
                      totalPoints={birth_detail.bhakut.total_points}
                      tintColor="#ff6f6f"
                      backgroundColor="#ffb8b8"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#FF6F6F'}]}>
                      Mental compatibility ( maitri )
                    </Text>
                    <Text style={styles.description}>
                      Varna refers to the mental compatibility of two persons
                      involved. It holds nominal effect in the matters of
                      marriage compatibility
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default MarraigeKundli;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  boxContainer: {
    flexDirection: 'row',
    width: '100%',
    height: SIZES.width * 0.255,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: SIZES.width * 0.026,
    paddingHorizontal: SIZES.width * 0.026,
    borderRadius: SIZES.width * 0.01,
    marginTop: SIZES.width * 0.051,
  },
  title: {
    fontFamily: 'KantumruyPro-Bold',
    fontSize: SIZES.width * 0.041,
    color: '#D88200',
  },
  description: {
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.026,
    color: '#525252',
  },
});
