import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../constant/theme';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Preferences from '../screens/api/Preferences';

const LiveStreamSection = () => {
  const navigation = useNavigation();
  const {liveData} = useSelector(state => state.live);

  const onJoinPress = async (isHost, astrologer) => {
    const name = await Preferences.getPreferences(Preferences.key.Name);

    navigation.navigate(isHost ? 'HostPage' : 'AudiencePage', {
      userID: userID,
      userName: name,
      liveID: astrologer.live_id,
    });
  };

  const [userID, setUserID] = useState('');
  useEffect(() => {
    setUserID(String(Math.floor(Math.random() * 100000)));
  }, []);

  console.log('liveAstrologer ===>', liveData);

  return (
    <View style={styles.astrologerList}>
      {liveData &&
        liveData.data.map(astrologer => (
          <>
            <View
              style={{
                marginVertical: SIZES.width * 0.016,
                paddingHorizontal: SIZES.width * 0.05,
              }}>
              <Text style={styles.tagLine}>Live Astrologer</Text>
              <TouchableOpacity
                key={astrologer._id}
                onPress={() => onJoinPress(false, astrologer)}>
                <View style={styles.astrologerContainer}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: astrologer.profile_photo}}
                      style={styles.profilePhoto}
                    />
                    <View style={{alignItems: 'center'}}>
                      <View style={styles.liveBadge}>
                        <Text style={styles.liveText}>LIVE</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.name} numberOfLines={2}>
                    {astrologer.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ))}
    </View>
  );
};

export default LiveStreamSection;

const styles = StyleSheet.create({
  tagLine: {
    fontSize: SIZES.width * 0.046,
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
  },
  astrologerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  astrologerContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primary, // Example background color
    borderRadius: 10,
    padding: 10,
    width: SIZES.width * 0.3,
    marginBottom: 15,
    marginTop: 15,
  },
  imageContainer: {
    position: 'relative',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  liveBadge: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffffff',
    padding: 2,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveText: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  name: {
    fontSize: SIZES.width * 0.035,
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
    marginTop: 5,
    textAlign: 'center',
  },
});
