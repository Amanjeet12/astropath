/* eslint-disable react/self-closing-comp */
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ZIMKit, ConversationList} from '@zegocloud/zimkit-rn';
import Preferences from '../api/Preferences';
import appConfig from '../../constant/KeyCenter';

const ChatScreen = ({navigation}) => {
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    ZIMKit.init(
      1821207641,
      'b3443c6be3ab26714a2594ed72d0fe109e3081bfe11716fb1933e28c5340d751',
    );
    loginUser();
  }, []);

  const loginUser = async () => {
    const userName = await Preferences.getPreferences(Preferences.key.Name);
    const userID = await Preferences.getPreferences(Preferences.key.phone);
    const profiles = await Preferences.getPreferences(
      Preferences.key.Profile_pic,
    );
    ZIMKit.connectUser({userID, userName}, '').then(data => {
      console.log(userID);
      if (data === userID) {
      }
    });
  };

  const emptyBuilder = () => {
    return (
      <View style={styles.emptyView}>
        <Text>No chats.</Text>
        <Text>Start chatting now.</Text>
      </View>
    );
  };

  const onPressed = props => {
    const itemBuilder = () => {
      return (
        <View>
          <Text>item Builder</Text>
        </View>
      );
    };
    const loadingBuilder = () => {
      return (
        <View>
          <Text>loading Builder</Text>
        </View>
      );
    };
    const errorBuilder = () => {
      return (
        <View>
          <Text>error Builder</Text>
        </View>
      );
    };
    const preMessageSending = message => {
      return message;
    };
    console.log('#######props', props);
    navigation.navigate('MessageListPage', {
      ...props,
      preMessageSending,
      appBarActions: [
        {
          icon: 'goBack',
          onPressed: () => {
            navigation.goBack();
          },
        },
      ],
    });
  };

  const loadingBuilder = () => {
    return (
      <View style={styles.emptyView}>
        <ActivityIndicator />
      </View>
    );
  };

  //   const filter = conversationList => {
  //     let filteredList = [];
  //     if (filterValue) {
  //       filteredList = conversationList.filter(item =>
  //         item.conversationName.includes(filterValue),
  //       );
  //     } else {
  //       filteredList = conversationList;
  //     }
  //     return filteredList;
  //   };
  return (
    <View>
      <View style={styles.conversation}>
        <ConversationList
          //   filter={filter}
          // lastMessageBuilder={lastMessageBuilder}
          // lastMessageTimeBuilder={lastMessageTimeBuilder}
          onPressed={onPressed}
          // onLongPress={onLongPress}
          // errorBuilder={errorBuilder}
          emptyBuilder={emptyBuilder}
          loadingBuilder={loadingBuilder}
          // itemBuilder={itemBuilder}
        ></ConversationList>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  conversation: {
    flex: 1,
    width: '100%',
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
});
