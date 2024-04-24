/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import BackButton from '../../components/BackButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Chat from 'react-native-vector-icons/Ionicons';
import AboutAstrologer from '../../components/AboutAstrologer';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import Preferences from '../api/Preferences';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';
import {fetchWalletbalance} from '../../redux/WalletBalanceSlice';
import {useDispatch, useSelector} from 'react-redux';
import {TimerContext} from '../../constant/TimerContext';
import RatingAstrologer from '../../components/RatingAstrologer';
import RatingSection from '../../components/RatingSection';
import Triangle from 'react-native-vector-icons/Octicons';
import Cross from 'react-native-vector-icons/Entypo';
import {Circle} from 'react-native-svg';

const SingleAstrologer = ({route, navigation}) => {
  const {item} = route.params;
  console.log(item);
  const dispatch = useDispatch();
  const {isVisible, hideTimer} = useContext(TimerContext);
  const [showRate, setShowRate] = useState(false);
  const [show, setShow] = useState(false);
  const {isData, walletBalance} = useSelector(state => state.wallet);

  const handleTilTop = () => {
    setShowRate(true);
    setTimeout(() => {
      setShowRate(false);
    }, 3000); // 3 seconds
  };

  const onUserLogin = async (userID, userName) => {
    return ZegoUIKitPrebuiltCallService.init(
      95716287,
      'b9d92528359b15d3038a79816eb37fac308c5a1c1bc221190598bfd2e47d5b56',
      userID,
      userName,
      [ZIM, ZPNs],
      {
        onIncomingCallReceived: (
          callID,
          inviter,
          type,
          invitees,
          customData,
        ) => {
          hideTimer();
        },

        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        notifyWhenAppRunningInBackgroundOrQuit: true,
        androidNotificationConfig: {
          channelId: 'zego_video_call',
          channelName: 'zego_video_call',
        },
        avatarBuilder: ({userInfo}) => {
          return (
            <View style={{width: '100%', height: '100%'}}>
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/zegocloudvideocall-b50bd.appspot.com/o/userprofile%2FWhatsApp%20Image%202024-04-03%20at%2012.55.45%20PM.jpeg?alt=media&token=729aae36-a285-4ccb-802d-ea512cbadb07',
                }}
              />
            </View>
          );
        },
        requireConfig: data => {
          return {
            timingConfig: {
              isDurationVisible: true,
              onDurationUpdate: duration => {
                console.log(
                  '########CallWithInvitation onDurationUpdate',
                  duration,
                );
              },
            },

            onHangUp: duration => {
              handleWalletBalance();
              navigation.navigate('DashboardScreen');
            },

            hangUpConfirmInfo: {
              title: 'Hangup confirm',
              message: 'Do you want to hangup?',
              cancelButtonName: 'Cancel',
              confirmButtonName: 'Confirm',
            },

            topMenuBarConfig: {
              buttons: [ZegoMenuBarButtonName.minimizingButton],
            },
            onWindowMinimized: () => {
              console.log('[Demo]CallInvitation onWindowMinimized');
              navigation.navigate('DashboardScreen');
            },
            onWindowMaximized: () => {
              console.log('[Demo]CallInvitation onWindowMaximized');
              navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
            },
          };
        },
      },
    );
  };

  useEffect(() => {
    const fetch = async () => {
      const userName = await Preferences.getPreferences(Preferences.key.Name);
      const phone = await Preferences.getPreferences(Preferences.key.phone);
      onUserLogin(phone, userName);
    };

    fetch();
  }, []);

  const handleWalletBalance = async () => {
    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        dispatch(fetchWalletbalance(token));
      }
    } catch {}
  };

  const handlCallAndVideoCallRequest = async (service, price) => {
    if (walletBalance < price) {
      setShow(true);
      return;
    }
    if (isVisible) {
      Alert.alert(
        'Cannot Make Another Call',
        "You're already in a queue, please cancel current request to send another.",
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      return;
    }
    var datas = {
      astrologerId: item._id,
      services: service,
      service_cost: item.voice_call_price,
    };
    try {
      console.log('request send', service);
      navigation.navigate('CallInTakeFormScreen', {datas});
    } catch (error) {}
  };

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
              <BackButton placeholder={'Astrologer'} />
            </View>
            <View style={styles.mainBoxContainer}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '40%'}}>
                  <View>
                    <Image
                      source={{uri: item?.profile_photo}}
                      style={styles.profile}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        bottom: SIZES.width * 0.051,
                        right: 15,
                      }}>
                      <Image
                        source={images.verified_icon}
                        style={{
                          width: SIZES.width * 0.06,
                          height: SIZES.width * 0.06,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <View style={styles.ratingContainer}>
                      <Image
                        source={images.star_icon}
                        style={{
                          width: SIZES.width * 0.051,
                          height: SIZES.width * 0.051,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text style={{color: 'grey'}}>{item.totalCount}</Text>
                    </View>
                  </View>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={styles.profile_name}>{item?.name}</Text>
                  <View style={styles.flexBox}>
                    <Image source={images.knowledge} style={styles.icon} />
                    <Text style={styles.profile_categories}>
                      {item?.gender}
                    </Text>
                  </View>
                  <View style={[styles.flexBox, {marginTop: 3}]}>
                    <Image source={images.language} style={styles.icon} />
                    <Text style={styles.profile_language}>
                      {item?.language}
                    </Text>
                  </View>
                  <View style={[styles.flexBox, {marginTop: 3}]}>
                    <Image source={images.experiance} style={styles.icon} />
                    <Text style={styles.profile_experience}>7 Years</Text>
                  </View>
                  <View style={[styles.flexBox, {gap: 15, marginLeft: -3}]}>
                    <Text style={styles.profile_rate}>
                      ₹ {item?.chat_price}/ min - Chat
                    </Text>
                    {showRate && (
                      <View style={styles.tiltop}>
                        <Text style={[styles.profile_rate, {fontSize: 12}]}>
                          Charges
                        </Text>
                        <Text
                          style={[
                            styles.profile_rate,
                            {fontSize: 10, color: 'grey'},
                          ]}>
                          ₹ {item?.chat_price}/ min - Chat
                        </Text>
                        <Text
                          style={[
                            styles.profile_rate,
                            {fontSize: 10, color: 'grey'},
                          ]}>
                          ₹ {item?.voice_call_price}/ min - Call
                        </Text>
                        <Text
                          style={[
                            styles.profile_rate,
                            {fontSize: 10, color: 'grey'},
                          ]}>
                          ₹ {item?.video_call_price}/ min - VC
                        </Text>
                        <View
                          style={{
                            position: 'absolute',
                            bottom: -15,
                            right: 20,
                          }}>
                          <Triangle
                            name={'triangle-down'}
                            size={25}
                            color={COLORS.primary}
                          />
                        </View>
                      </View>
                    )}
                    <TouchableOpacity
                      style={styles.flexBox}
                      onPress={handleTilTop}>
                      <Text style={{fontSize: 12, color: 'green'}}>
                        View Charge
                      </Text>
                      <Icon
                        name={'error-outline'}
                        size={12}
                        color={'grey'}
                        style={{transform: [{rotate: '180deg'}]}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.border} />
              <View style={styles.featuresContainer}>
                <TouchableOpacity
                  style={[
                    styles.flexBox,
                    styles.singlebox,
                    {width: '25%'},
                    !item.work_schedule?.services.includes('chat') && {
                      opacity: 0.5,
                    },
                  ]}
                  disabled={!item.work_schedule?.services.includes('chat')}>
                  <Text style={{fontSize: 15, color: '#000'}}>Chat</Text>
                  <Chat
                    name={'chatbubble-ellipses-outline'}
                    color={'#000'}
                    size={15}
                  />
                </TouchableOpacity>
                <View style={styles.verticalBorder} />
                <TouchableOpacity
                  style={[
                    styles.flexBox,
                    styles.singlebox,
                    {width: '30%'},
                    !item.work_schedule?.services.includes('voice call') && {
                      opacity: 0.5,
                    },
                  ]}
                  disabled={
                    !item.work_schedule?.services.includes('voice call')
                  }
                  onPress={() =>
                    handlCallAndVideoCallRequest(
                      'voice call',
                      item.video_call_price,
                    )
                  }>
                  <Text style={{fontSize: 15, color: '#000'}}>Call</Text>
                  <Chat name={'call'} color={'#000'} size={15} />
                </TouchableOpacity>
                <View style={styles.verticalBorder} />

                <TouchableOpacity
                  style={[
                    styles.flexBox,
                    styles.singlebox,
                    {width: '40%'},
                    !item.work_schedule?.services.includes('video call') && {
                      opacity: 0.5,
                    },
                  ]}
                  disabled={
                    !item.work_schedule?.services.includes('video call')
                  }
                  onPress={() =>
                    handlCallAndVideoCallRequest(
                      'video call',
                      item.video_call_price,
                    )
                  }>
                  <Text style={{fontSize: 15, color: '#000'}}>Video Call</Text>
                  <Chat name={'videocam'} color={'#000'} size={15} />
                </TouchableOpacity>
              </View>
            </View>
            <AboutAstrologer data={item?.bio} />
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 10,
                marginTop: 15,
                marginBottom: 50,
              }}>
              <RatingSection data={item?.ratingStats} />
              <RatingAstrologer data={item?.reviews} />
            </View>
          </View>
        </ScrollView>
        <Modal animationType="fade" transparent={true} visible={show}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{position: 'absolute', right: 10, top: 10}}
                onPress={() => setShow(false)}>
                <Cross name={'cross'} size={24} color={COLORS.black} />
              </TouchableOpacity>

              <View
                style={{
                  alignItems: 'center',
                }}>
                <Image
                  source={images.erroricon}
                  style={{width: 70, height: 70}}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '800',
                    color: 'red',
                    textTransform: 'capitalize',
                    marginTop: 0,
                    textAlign: 'left',
                  }}>
                  Insufficient Funds !!
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'grey',
                    marginTop: 5,
                    textTransform: 'capitalize',
                    textAlign: 'center',
                  }}>
                  Please Update your wallet to start the conversation to
                  Astrologer
                </Text>
                <TouchableOpacity
                  style={[styles.button, {marginTop: 15}]}
                  onPress={() => {
                    setShow(false), navigation.navigate('WalletScreen');
                  }}>
                  <Text
                    style={[
                      {color: '#fff', textTransform: 'uppercase', fontSize: 12},
                    ]}>
                    Add Money
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </>
  );
};

export default SingleAstrologer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 120,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  mainContainer: {
    marginHorizontal: SIZES.width * 0.051,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    width: '90%',
    height: '30%',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
  },
  mainBoxContainer: {
    width: '100%',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: SIZES.width * 0.039,
    borderColor: '#843c14',
  },
  featuresContainer: {
    height: 50,
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
  profile: {
    width: SIZES.width * 0.26,
    height: SIZES.width * 0.26,
    resizeMode: 'cover',
    borderRadius: 55,
  },
  profile_name: {
    color: COLORS.black,
    fontFamily: 'DMSerifDisplay-Regular',
    fontSize: 18,
  },
  profile_categories: {
    color: '#707B81',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.035,
    paddingTop: 3,
  },
  profile_language: {
    color: '#707B81',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.031,
  },
  profile_experience: {
    color: '#707B81',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.031,
  },
  profile_rate: {
    color: '#000',
    fontFamily: 'KantumruyPro-Regular',
    fontSize: SIZES.width * 0.031,
    paddingTop: 5,
    paddingLeft: 5,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  ratingContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.width * 0.026,
    borderRadius: SIZES.width * 0.026,
    paddingVertical: 3,
    bottom: -SIZES.width * 0.026,
    elevation: 3,
    left: SIZES.width * 0.061,
    borderColor: '#843c14',
  },
  flexBox: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    gap: 5,
  },
  icon: {width: 15, height: 15, resizeMode: 'contain'},
  border: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFB443',
    marginTop: 20,
  },
  singlebox: {
    padding: 5,
    backgroundColor: '#FFB443',
    width: '33%',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 0.5,
  },
  verticalBorder: {
    borderWidth: 1,
    borderColor: '#FFB443',
    marginTop: 5,
  },
  tiltop: {
    position: 'absolute',
    zIndex: 999,
    top: -105,
    left: 60,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
  },
});
