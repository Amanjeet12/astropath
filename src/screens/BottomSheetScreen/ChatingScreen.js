/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import ZIM from 'zego-zim-react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, SIZES} from '../../constant/theme';
import Preferences from '../api/Preferences';
import WebMethods from '../api/WebMethods';
import WebUrls from '../api/WebUrls';

const ChatingScreen = ({navigation, route}) => {
  const {item} = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [hideTextInput, setHideTextInput] = useState(false);
  const scrollViewRef = useRef();
  const cameraRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [canSendMessages, setCanSendMessages] = useState(true);

  const startTime = new Date(item.startTime); // Example start time
  const DURATION = 300; // Timer duration in seconds (e.g., 5 minutes)
  const [remainingTime, setRemainingTime] = useState(DURATION);
  const intervalRef = useRef(null);
  const currentUserID = item?.astrologerPhone || '+919546938484';
  const [status, setStatus] = useState(item.status);

  const calculateRemainingTime = () => {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    return Math.max(DURATION - elapsedTime, 0);
  };

  const startCountdown = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const time = calculateRemainingTime();
      setRemainingTime(time);

      // Call terminateCall when time reaches zero
      if (time === 0) {
        clearInterval(intervalRef.current);
        terminateCall();
      }
    }, 1000);
  };

  useEffect(() => {
    const timeLeft = calculateRemainingTime();
    setRemainingTime(timeLeft);

    if (status === 'Completed' && timeLeft < DURATION) {
      clearInterval(intervalRef.current);
      setRemainingTime(0);
      setCanSendMessages(false);
      setHideTextInput(true);
    } else {
      startCountdown();
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const terminateCall = async () => {
    setCanSendMessages(false);
    clearInterval(intervalRef.current);
    setRemainingTime(0);
    if (status === 'In-Progress') {
      handleTerminateCall(item._id);
    } else if (status === 'Completed') {
      setStatus('Completed');
      setRemainingTime(0);
    }
  };

  const handleTerminateCall = async id => {
    try {
      const token = await Preferences.getPreferences(Preferences.key.Token);

      if (token) {
        const params = {
          orderId: id,
        };
        const response = await WebMethods.postRequestWithHeader(
          WebUrls.url.terminate_chat,
          params,
          token,
        );
        if (response != null) {
          console.log('Terminate response:', response);
          setStatus('Completed');
          setRemainingTime(0);
        } else {
          console.log('Error in termination');
        }
      }
    } catch (error) {
      console.error('Error terminating call:', error);
    }
  };

  const handleStopTimer = () => {
    Alert.alert(
      'Warning ',
      `Are you sure you want to terminate this chat?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              terminateCall();
            } catch (error) {
              console.error('Error removing items:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const zim = ZIM.getInstance();

  useEffect(() => {
    if (initialLoad) {
      fetchHistory(true);
      setInitialLoad(false);
    } else {
      fetchHistory(false);
    }
  }, []);

  const fetchHistory = fetchAll => {
    const count = 300; // Fetch only one message if not initial load
    const configs = {
      nextMessage: null,
      count: count,
      reverse: true,
    };

    const type = 0;
    zim
      .queryHistoryMessage(currentUserID, type, configs)
      .then(response => {
        // console.log(response);
        if (response.messageList && response.messageList.length > 0) {
          setMessages(prevMessages =>
            fetchAll
              ? response.messageList
              : [...prevMessages, ...response.messageList],
          );
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch history:', err);
        setIsLoading(false);
      });
  };

  const sendMessage = () => {
    if (!canSendMessages) {
      Alert.alert(
        'Alert ',
        `Time is up! You can't send messages now.`,
        [
          {
            text: 'ok',
            onPress: async () => {
              try {
              } catch (error) {
                console.error('Error removing items:', error);
              }
            },
          },
        ],
        {cancelable: false},
      );
      return;
    }
    if (!messageText.trim()) return;
    const messageObj = {type: 1, message: messageText};
    const config = {priority: 1};
    const type = 0;
    zim
      .sendMessage(messageObj, currentUserID, type, config, {
        onMessageAttached: function (message) {
          // console.log('send', message);
          setMessages(prev => [...prev, message]);
          setMessageText('');
        },
      })
      .catch(err => {
        console.log('message error==>', err);
      });
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.5}, response => {
      if (response.didCancel || response.error) {
        console.log('User cancelled or error:', response.error);
      } else {
        const uri = response.assets[0].uri;
        uploadImage(uri);
      }
    });
  };

  const uploadImage = async uri => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = storage().ref().child(`uploads/${filename}`);
    setIsUploading(true);

    storageRef.putFile(uri).on(
      'state_changed',
      snapshot => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      error => {
        console.error('Upload error:', error);
        setIsUploading(false);
      },
      () => {
        storageRef.getDownloadURL().then(downloadURL => {
          sendImageMessage(downloadURL);
          setIsUploading(false);
        });
      },
    );
  };

  const sendImageMessage = async imageUrl => {
    var mediaMessageObj = {
      fileDownloadUrl: imageUrl,
      thumbnailDownloadUrl: imageUrl,
      largeImageDownloadUrl: imageUrl,
      type: 11,
    };
    const config = {priority: 1};

    const type = 0; // Adjust if needed

    zim.sendMediaMessage(mediaMessageObj, currentUserID, type, config, {
      onMessageAttached: function (message) {
        setMessages(prev => [...prev, message]);
        setMessageText('');
      },
    });
  };

  const messageStyle = message => {
    return message.senderUserID === currentUserID
      ? styles.otherMessage
      : styles.myMessage;
  };

  const goBack = () => {
    // Function to handle back navigation
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: false};
      const data = await cameraRef.current.takePictureAsync(options);
      setCameraActive(false); // Close camera
      uploadImage(data.uri);
    }
  };

  zim.on(
    'receivePeerMessage',
    function (zim, {messageList, fromConversationID}) {
      console.log(messageList[0], fromConversationID);
      setMessages(prev => [...prev, messageList[0]]);
    },
  );

  // check status

  useEffect(() => {
    // Function to check the status and call terminateCall if status is 'Completed'
    const checkStatus = async () => {
      console.log('c');
      try {
        const token = await Preferences.getPreferences(Preferences.key.Token);
        if (token) {
          const response = await WebMethods.postRequestWithHeader(
            WebUrls.url.check_status,
            {orderId: item._id},
            token,
          );
          if (response?.data.status === 'Completed') {
            Alert.alert('Alert', 'Chat is Ended From Astrologer Side ');
            setStatus('Completed');
            terminateCall();
          }
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };

    // Check status initially
    checkStatus();

    // Check status every 31 seconds
    const interval = setInterval(() => {
      checkStatus();
    }, 15000); // 31 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#f7f1e1'} barStyle={'dark-content'} />
      <ImageBackground
        source={require('../../assets/images/chatbg.png')}
        style={styles.fullScreen}
        imageStyle={{opacity: 0.8}}
        resizeMode="cover">
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.container}>
            {cameraActive ? (
              <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                captureAudio={false}>
                <Image
                  style={styles.overlay}
                  source={require('./../../assets/images/hand.png')}
                />
                <View style={styles.captureContainer}>
                  <TouchableOpacity
                    onPress={takePicture}
                    style={styles.capture}>
                    <Text style={{fontSize: 14}}>SNAP</Text>
                  </TouchableOpacity>
                </View>
              </RNCamera>
            ) : (
              <>
                <View style={styles.header}>
                  <TouchableOpacity
                    onPress={goBack}
                    style={{
                      paddingHorizontal: 18,
                      width: '15%',
                      height: '100%',
                      justifyContent: 'center',
                    }}>
                    <Icon name="arrow-back-ios" size={24} color="black" />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '50%',
                      height: '100%',
                    }}>
                    <View>
                      {item.astrologerProfile ? (
                        <Image
                          source={{uri: item.astrologerProfile}}
                          style={styles.image}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/images/astropath_logo.png')}
                          style={styles.image}
                        />
                      )}
                    </View>
                    <View>
                      <Text style={styles.headerTitle} numberOfLines={1}>
                        {item.astrologerName}
                      </Text>
                      <Text numberOfLines={1} style={{color: '#000'}}>
                        {item.status === 'Rejected' ? (
                          <Text style={{fontSize: 12, color: '#000'}}>
                            Chat ended
                          </Text>
                        ) : (
                          <Text style={{fontSize: 12, color: '#000'}}>
                            {formatTime(remainingTime)}
                          </Text>
                        )}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleStopTimer()}
                      disabled={!canSendMessages}>
                      <Text
                        style={{
                          padding: 7,
                          backgroundColor: !canSendMessages
                            ? 'grey'
                            : COLORS.primary,
                          color: '#fff',
                          borderRadius: 3,
                        }}>
                        End Chat
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <ScrollView
                  ref={scrollViewRef}
                  onContentSizeChange={() =>
                    scrollViewRef.current.scrollToEnd({animated: true})
                  }
                  style={styles.messagesContainer}>
                  <View style={styles.predefinedMessageContainer}>
                    <Text style={styles.predefinedMessage}>
                      Welcome to Astropath. Astrologer will take a minute to
                      prepare your chart. You may ask your question.
                    </Text>
                  </View>
                  {isLoading ? (
                    <Text>Loading chat history...</Text>
                  ) : messages.length > 0 ? (
                    messages.map((msg, index) => (
                      <View key={index} style={messageStyle(msg)}>
                        {msg.type === 11 ? (
                          <Image
                            source={{uri: msg.largeImageDownloadUrl}}
                            style={styles.imageStyle}
                            resizeMode="cover"
                          />
                        ) : (
                          <Text style={{color: '#000'}}>{msg.message}</Text>
                        )}
                      </View>
                    ))
                  ) : (
                    <Text style={{color: '#000', textAlign: 'center'}}>
                      No conversation yet.
                    </Text>
                  )}
                </ScrollView>
                {isUploading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{color: 'black'}}>Uploading Image...</Text>
                  </View>
                )}
                {hideTextInput || item.status === 'Rejected' ? null : (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={messageText}
                      onChangeText={setMessageText}
                      placeholder="Type your message here..."
                      multiline={true}
                      placeholderTextColor={'grey'}
                    />
                    <TouchableOpacity
                      onPress={handleChoosePhoto}
                      style={styles.iconButton}>
                      <Icon
                        name="photo-library"
                        size={24}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setCameraActive(true)}
                      style={styles.iconButton}>
                      <Icon
                        name="camera-alt"
                        size={24}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={sendMessage}
                      style={styles.iconButton}>
                      <Icon name="send" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    width: SIZES.width,
    height: SIZES.height,
    top: 0,
    left: 0,
  },
  predefinedMessageContainer: {
    backgroundColor: '#f7f1e1', // Light background color for the notification
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 0.5,
  },
  predefinedMessage: {
    color: '#333', // Dark text color for contrast
    fontSize: 14,
    textAlign: 'center', // Center align the text
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: '#f7f1e1',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 30,
    resizeMode: 'cover',
    marginRight: 10,
  },
  iconButton: {
    paddingHorizontal: 3,
  },
  backButton: {
    marginRight: 20,
    fontSize: 18,
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    width: '80%',
    color: '#000',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#DCF8C6', // Light green for visual distinction
    borderRadius: 10,
    marginBottom: 10,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: '#FFFFFF', // White background for other's messages
    borderRadius: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 30,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    marginRight: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  imageStyle: {
    width: 200, // Set your desired width
    height: 200, // Set your desired height
    borderRadius: 10, // Optional: if you want rounded corners
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 30,
    width: 30,
    padding: 30,
    // paddingHorizontal: 30,
    alignSelf: 'center',
    margin: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ChatingScreen;
