import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CometChatConversationsWithMessages} from '@cometchat/chat-uikit-react-native';

const Message = ({route}) => {
  const user = route.params.user;
  return <CometChatConversationsWithMessages user={user} />;
};

export default Message;

const styles = StyleSheet.create({});
