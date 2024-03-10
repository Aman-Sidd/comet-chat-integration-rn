import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CometChatConversationsWithMessages,
  CometChatUIKit,
} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import Message from './Message';

const Chat = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [recipientId, setRecipientId] = useState('');

  const getPermissions = () => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };

  useEffect(() => {
    getPermissions();
    let uikitSettings = {
      appId: '254245a92a6cb1bc', // Your appId goes here -->,
      authKey: 'c3a9f25a9e665c3d68ae21e38477b2a3da895405', // your app authKey goes here -->,
      region: 'in', // App region goes here -->,
    };

    CometChatUIKit.init(uikitSettings)
      .then(() => {
        console.log('CometChatUiKit successfully initialized');
      })
      .catch(error => {
        console.log('Initialization failed with exception:', error);
      });

    // CometChatUIKit.logout().then(
    //   () => {
    //     console.log('Logout completed successfully');
    //   },
    //   error => {
    //     console.log('Logout failed with exception:', {error});
    //   },
    // );

    // let uid = '123';

    // CometChatUIKit.login({uid: uid})
    //   .then(user => {
    //     console.log('User logged in successfully ', user.getName());
    //   })
    //   .catch(error => {
    //     console.log('Login failed with exception:', error);
    //   });
  }, []);

  const handleLogout = async () => {
    CometChatUIKit.logout().then(
      () => {
        Alert.alert('Logout Successfull');
        console.log('Logout completed successfully');
      },
      error => {
        Alert.alert('Logout failed');
        console.log('Logout failed with exception:', {error});
      },
    );
  };

  const handleCreateUser = async ({userId, username}) => {
    let user = new CometChat.User(userId);
    user.setName(username);
    console.log('USER:', user);

    CometChatUIKit.createUser(user).then(
      user => {
        Alert.alert('Successful', 'User has been created!');
      },
      error => {
        Alert.alert('Error', 'Something went wrong!');
        console.log('error', error);
      },
    );
  };

  const handleLogin = async userId => {
    CometChatUIKit.getLoggedInUser().then(
      user => {
        if (!user) {
          let uid = userId;

          CometChatUIKit.login({uid: uid})
            .then(user => {
              Alert.alert('Successful', 'You are logged in successfully!');
              console.log('User logged in successfully ', user.getName());
            })
            .catch(error => {
              Alert.alert('Error', 'Something went wrong!');

              console.log('Login failed with exception:', error);
            });
        } else {
          Alert.alert('User Already Exist', 'User already exist');
        }
      },
      error => {
        console.log('Some Error Occured', {error});
      },
    );
  };

  const goToMessage = async () => {
    const user = await CometChat.getUser(recipientId);
    console.log('RECIPEINT ID:', recipientId);
    console.log('Going to Chat with:', user);
    navigation.navigate('Message', {user});
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        gap: 20,
        backgroundColor: 'black',
      }}>
      <TextInput
        value={userId}
        onChangeText={text => setUserId(text)}
        placeholder="Enter your userId"
        style={{
          height: 70,
          width: '90%',
          borderWidth: 2,
          borderRadius: 10,
          borderColor: 'white',
          padding: 8,
          alignSelf: 'center',
        }}
      />
      <TextInput
        value={username}
        onChangeText={text => setUserName(text)}
        placeholder="Enter your username"
        style={{
          height: 70,
          width: '90%',
          borderWidth: 2,
          borderRadius: 10,
          padding: 8,
          borderColor: 'white',
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() => handleLogin(userId)}
          style={{
            width: 100,
            height: 40,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => handleCreateUser({userId, username})}
          style={{
            width: 100,
            height: 40,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Create User</Text>
        </Pressable>
        <Pressable
          onPress={() => handleLogout()}
          style={{
            width: 100,
            height: 40,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Log out</Text>
        </Pressable>
      </View>

      <TextInput
        value={recipientId}
        onChangeText={text => setRecipientId(text)}
        placeholder="Enter reciepient's ID to chat"
        style={{
          height: 70,
          width: '90%',
          borderWidth: 2,
          borderRadius: 10,
          padding: 8,
          borderColor: 'white',
          alignSelf: 'center',
        }}
      />
      <Pressable
        onPress={() => goToMessage()}
        style={{
          width: 150,
          height: 40,
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>Chat</Text>
      </Pressable>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
