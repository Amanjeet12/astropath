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
import Preferences from '../api/Preferences';

const MarraigeKundli = ({route}) => {
  const {
    name_m,
    lat_m,
    lon_m,
    date,
    Time,
    name_f,
    lat_f,
    lon_f,
    date_f,
    Time_f,
  } = route.params;
  const [loading, setLoading] = useState(true);
  const [birth_detail, setBirth_detail] = useState(null);

  const dateTimeObject = new Date(date);
  const dateObject = new Date(Time);

  // Extracting time parts
  const m_hour = dateTimeObject.getUTCHours().toString();
  const m_min = dateTimeObject.getUTCMinutes().toString();
  const m_sec = dateTimeObject.getUTCSeconds().toString();

  // Extracting date parts
  const m_day = dateObject.getUTCDate().toString();
  const m_month = (dateObject.getUTCMonth() + 1).toString();
  const m_year = dateObject.getUTCFullYear().toString();

  // female

  const dateTimeObject_f = new Date(date_f);
  const dateObject_f = new Date(Time_f);

  // Extracting time parts
  const f_hour = dateTimeObject_f.getUTCHours().toString();
  const f_min = dateTimeObject_f.getUTCMinutes().toString();
  const f_sec = dateTimeObject_f.getUTCSeconds().toString();

  // Extracting date parts
  const f_day = dateObject_f.getUTCDate().toString();
  const f_month = (dateObject_f.getUTCMonth() + 1).toString();
  const f_year = dateObject_f.getUTCFullYear().toString();

  console.log(SIZES.width * 0.3);

  useEffect(() => {
    if (birth_detail == null) {
      fetchData();
    }
  }, [birth_detail]);

  const fetchData = async () => {
    try {
      let token;
      try {
        token = await Preferences.getPreferences(Preferences.key.Token);
      } catch (error) {
        console.error('Error getting latitude and longitude:', error);
        return;
      }

      const params = {
        name: name_m,
        m_day,
        m_hour,
        m_min,
        m_month,
        m_year,
        m_lat: lat_m,
        m_lon: lon_m,
        m_tzone: '5.5',
        f_day,
        f_hour,
        f_month,
        f_min,
        f_year,
        f_lat: lat_f,
        f_lon: lon_f,
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
            <Text style={{fontSize: SIZES.width * 0.051, color: '#000'}}>
              {receivedPoints}{' '}
              <Text style={{fontSize: SIZES.width * 0.036, color: '#000'}}>
                / {totalPoints}
              </Text>
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
                <View style={{marginTop: SIZES.width * 0.05}}>
                  <Image
                    source={images.marriage_meter}
                    style={{
                      width: '100%',
                      height: SIZES.width * 0.46,
                      resizeMode: 'contain',
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: -20,
                      paddingVertical: 10,
                      paddingHorizontal: 18,
                      backgroundColor: '#ffcf87',
                      borderRadius: 30,
                      left: SIZES.width * 0.3,
                      right: SIZES.width * 0.3,

                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{fontSize: SIZES.width * 0.051, color: '#000'}}>
                        {birth_detail.total.received_points}{' '}
                        <Text
                          style={{
                            fontSize: SIZES.width * 0.036,
                            color: '#000',
                          }}>
                          / {birth_detail.total.total_points}
                        </Text>
                      </Text>
                    </View>
                  </View>
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
                    <Text style={styles.title}>Temperament ( gana )</Text>
                    <Text style={styles.description}>
                      Gana is the indicator of the behaviour, character and
                      temperament of the potential bride and groom towards each
                      other.
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
                      Bhakut is related to the couple's joys and sorrows
                      together and assesses the wealth and health after their
                      wedding.
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <ProgressCircle
                    label=" Dominance ( Vashya )"
                    receivedPoints={birth_detail.vashya.received_points}
                    totalPoints={birth_detail.vashya.total_points}
                    tintColor="#4D26B9"
                    backgroundColor="#946FFF"
                  />
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#946FFF'}]}>
                      Dominance ( Vashya )
                    </Text>
                    <Text style={styles.description}>
                      Vashya indicates the bride and the groom's tendency to
                      dominate or influence each other in a marriage.
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Health ( nadi' )"
                      receivedPoints={birth_detail.nadi.received_points}
                      totalPoints={birth_detail.nadi.total_points}
                      tintColor="#f1c21b"
                      backgroundColor="#f9e59e"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#D88200'}]}>
                      Health ( nadi )
                    </Text>
                    <Text style={styles.description}>
                      Nadi is related to the health compatibility of the couple.
                      Matters of childbirth and progeny are also determined with
                      this Guna.
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Destiny ( Tara )"
                      receivedPoints={birth_detail.tara.received_points}
                      totalPoints={birth_detail.tara.total_points}
                      tintColor="#ff6f6f"
                      backgroundColor="#ffb8b8"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#FF6F6F'}]}>
                      Destiny ( Tara )
                    </Text>
                    <Text style={styles.description}>
                      Tara is the indicator of the birth star compatibility of
                      the bride and the groom. It also indicates the fortune of
                      the couple.
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Physical compatibility ( Yoni )"
                      receivedPoints={birth_detail.yoni.received_points}
                      totalPoints={birth_detail.yoni.total_points}
                      tintColor="#4D26B9"
                      backgroundColor="#946FFF"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#946FFF'}]}>
                      Physical compatibility ( Yoni )
                    </Text>
                    <Text style={styles.description}>
                      Yoni is the indicator of the sexual or physical
                      compatibility between the bride and the groom in question.
                    </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <ProgressCircle
                      label=" Destiny ( Tara )"
                      receivedPoints={birth_detail.varna.received_points}
                      totalPoints={birth_detail.varna.total_points}
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
                      receivedPoints={birth_detail.maitri.received_points}
                      totalPoints={birth_detail.maitri.total_points}
                      tintColor="#ff6f6f"
                      backgroundColor="#ffb8b8"
                    />
                  </View>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.title, {color: '#FF6F6F'}]}>
                      Mental compatibility ( Maitri )
                    </Text>
                    <Text style={styles.description}>
                      Maitri assesses the mental compatibility and mutual love
                      between the partners to be married.
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
    marginTop: SIZES.width * 0.08,
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
