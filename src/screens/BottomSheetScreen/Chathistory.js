/* eslint-disable react/no-unstable-nested-components */
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Preferences from '../api/Preferences';
import {useDispatch, useSelector} from 'react-redux';
import {fetchChatHistrory} from '../../redux/FetchChatHistroySlice';
import {images} from '../../constant';
import HeaderSection from '../../components/HeaderSection';
import NewBackButton from '../../components/NewBackButton';
import {COLORS, SIZES} from '../../constant/theme';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import NetInfo from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';
import {TimerContext} from '../../constant/TimerContext';

const Chathistory = ({navigation}) => {
  const dispatch = useDispatch();
  const {isChatData} = useSelector(state => state.chat);
  const [chatHistory, setChatHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const {hideTimer} = useContext(TimerContext);

  const checkConnectivity = async () => {
    const state = await NetInfo.fetch();
    const isConnected = state.isConnected;
    if (!isConnected) {
      ToastAndroid.showWithGravity(
        'No internet connection',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
    return isConnected;
  };

  const onUserLogin = async (userID, userName) => {
    return ZegoUIKitPrebuiltCallService.init(
      1759920386,
      '1bed4d8b514a73e376a4251a5e7f7d6f85952b98976dba33a30404f18646a37a',
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
        ) => {},

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
              navigation.navigate('OrderScreen');
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
              navigation.navigate('OrderScreen');
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

  useFocusEffect(
    React.useCallback(() => {
      // Fetch new data when the screen comes into focus
      fetchChatHistroryData();
      fetch();
    }, []),
  );
  const fetch = async () => {
    const userName = await Preferences.getPreferences(Preferences.key.Name);
    const phone = await Preferences.getPreferences(Preferences.key.phone);
    onUserLogin(phone, userName);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true);
    const isConnected = await checkConnectivity();
    if (isConnected) {
      fetchChatHistroryData();
    } else {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (refreshing || refresh) {
      fetchChatHistroryData();
    }
  }, [refreshing, refresh]);

  const fetchChatHistroryData = async () => {
    console.log('chek');
    setLoading(true);

    const isConnected = await checkConnectivity();
    if (!isConnected) {
      return;
    }
    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);
      if (token) {
        dispatch(fetchChatHistrory(token));
      }
    } catch (err) {
      console.error('Failed to fetch chat history:', err);
      // Implement error handling or UI feedback here
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isChatData?.data) {
      const sortedData = [...isChatData.data].sort((a, b) => {
        if (a.status === 'In-Progress' && b.status !== 'In-Progress') {
          return -1;
        } else if (a.status !== 'In-Progress' && b.status === 'In-Progress') {
          return 1;
        }
        return new Date(b.date) - new Date(a.date);
      });
      setChatHistory(sortedData);
    }
  }, [isChatData?.data]);

  const handleNavigation = item => {
    hideTimer();
    navigation.navigate('ChatingScreen', {item});
  };

  const formateDate = dateString => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    return formattedDate;
  };

  const ListEmptyComponent = () => (
    <Text style={styles.noDataText}>No data is available</Text>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        item.status === 'In-Progress' && styles.highlight,
      ]}
      onPress={() => handleNavigation(item)}>
      <Text style={styles.itemText}>
        Astrologer Name: {item.astrologerName}
      </Text>
      <Text style={styles.itemText}>Status: {item.status}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.itemText}>Date: {formateDate(item.date)}</Text>
        {item.status === 'In-Progress' && (
          <TouchableOpacity
            style={styles.goChatButton}
            onPress={() => handleNavigation(item)}>
            <Text style={styles.goChatButtonText}>View</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={images.mobile_bg}
        style={{width: SIZES.width, height: SIZES.height, flex: 1}}
        imageStyle={{resizeMode: 'stretch'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.mainContainer}>
            <HeaderSection />
            <View>
              <Text style={styles.tagLine}>Chat History</Text>
            </View>
            <FlatList
              data={chatHistory}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              style={styles.list}
              scrollEnabled={false}
              ListEmptyComponent={ListEmptyComponent}
            />
          </View>
        </ScrollView>
        {loading && (
          <Modal transparent={true} animationType="none" visible={loading}>
            <View style={styles.modalBackground}>
              <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            </View>
          </Modal>
        )}
      </ImageBackground>
    </View>
  );
};

export default Chathistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#843c14',
  },
  highlight: {
    borderColor: '#ff9900', // Highlight color for "In-Progress" status
  },
  itemText: {
    fontSize: 14,
    color: '#000',
  },
  goChatButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ff9900',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  goChatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    borderRadius: 10,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  tagLine: {
    fontSize: SIZES.width * 0.051,
    fontFamily: 'DMSerifDisplay-Regular',
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
