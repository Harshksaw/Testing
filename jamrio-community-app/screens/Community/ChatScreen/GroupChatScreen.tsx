import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/AntDesign';
import SimpleLIneIcon from 'react-native-vector-icons/SimpleLineIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {BASE_URL, TOKEN} from '../../../redux/store';
import axios from 'axios';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import EditChatModel from '../../../components/CreateChatModel/EditChatModel';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import SocketIOClient from 'socket.io-client';
import {colorsobject} from '../../../assets/ProjectColors/Colorsobject';
import {RFValue} from 'react-native-responsive-fontsize';
import {showToastMessage} from '../../../redux/actions/userActions';
import Clipboard from '@react-native-community/clipboard';

const GroupChatScreen = ({route, navigation: {goBack}}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.user);
  const {roomData} = route.params;
  const [messages, setMessages] = useState([]);
  const [messagesResponse, setMessagesResponse] = useState([]) as any[];
  const [openEditChat, setOpenEditChat] = useState(false);
  const [socketMessage, setSocketMessage] = useState({});
  const [members, setMembers] = useState([]) as any[];

  // INITIALIZING SOCKET
  const socket = SocketIOClient(`${BASE_URL}/chats/message`, {
    extraHeaders: {
      userid: user?.id,
    },
  });

  useEffect(() => {
    console.log('route params ->', roomData);
    console.log('room name', roomData?.chat?.chatName);
  }, [roomData]);

  const onSend = (messagesArray = []) => {
    const msg = messagesArray[0];
    const myMsg = {...msg, senderId: user?.id};
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    console.log('My message -------->', myMsg);
    SendMessageREST(msg?.text);
    //TODO: Add sockets
  };

  useEffect(() => {
    console.log('Route params', route.params);
    GetAllMessages();
  }, []);

  useEffect(() => {
    if (roomData?.chat?.members?.length > 0) {
      setMembers(roomData?.chat?.members);
    }
  }, [roomData]);
  useEffect(() => {
    console.log('CHAT MEMBERS ------------->', members);
  }, [members]);

  const FindUsersName = id => {
    const userFound = members?.filter(member => member?.user?.id === id);
    const name = userFound[0]?.user?.name;
    console.log('====================================');
    console.log('MEMBER FOUND', userFound, name);
    console.log('====================================');
    console.log('NAME', name, id);
    console.log('====================================');
    return name;
  };

  const FindUserProfile = id => {
    const userFound = members?.filter(member => member?.user?.id === id);
    const userProfileImage =
      userFound[0]?.user?.profileImage !== null
        ? userFound[0]?.user?.profileImage
        : 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png';
    console.log('====================================');
    console.log('MEMBER FOUND', userFound, userProfileImage);
    console.log('====================================');
    console.log('NAME', userProfileImage, id);
    console.log('====================================');
    return userProfileImage;
  };

  useEffect(() => {
    if (messagesResponse.length > 0) {
      const messagesArray = messagesResponse.map(msg => {
        return {
          _id: msg?.id,
          text: msg?.message,
          createdAt: msg?.createdAt,
          name: FindUsersName(msg?.senderId),
          user: {
            _id: msg?.senderId,

            avatar: FindUserProfile(msg?.senderId),
          },
        };
      });
      setMessages(messagesArray);
      console.log('MESSAGES ARRAY', messagesArray);
    }
    console.log('MESSAGES RESPONSE', messagesResponse);
  }, [messagesResponse]);

  useEffect(() => {
    GetAllMessages();
  }, [route.params]);

  const GetAllMessages = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/chats/messages/user/${user?.id}/chat/${roomData?.chatId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN?._j,
          },
        },
      );

      console.log('RESPONSE ------>', response);
      if (response?.status === 200 || response?.status === 201) {
        console.log('MESSAGES GET RESPONSE --->', response?.data);
        const sortedMessages = response?.data?.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setMessagesResponse(sortedMessages);
        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(showToastMessage(true, `success`, false));
      } else {
        //Alert.alert(`${response?.data}`);
        console.log('CHAT GET ERROR', response);
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected token status` + response.status,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(
          showToastMessage(
            true,
            `Unexpected token status ${response.status}`,
            true,
          ),
        );
      }
    } catch (error) {
      //Alert.alert(`${error}`)
      if (error.response) {
        // Toast.show({
        //   type: 'error',
        //   text1: error.response.status + error.response.data.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(
          showToastMessage(
            true,
            `error ${error.response.status + error.response.data.message}`,
            true,
          ),
        );
      } else if (error.request) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'no response received',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `no response received`, true));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `Error:-  ${error.message}`, true));
      }
      console.log(error);
    }
  };

  const SendMessageREST = async msg => {
    try {
      const response = await axios.post(
        `${BASE_URL}/chats/messages`,
        {
          chatId: roomData?.chatId,
          senderId: user?.id,
          message: msg,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN?._j,
          },
        },
      );

      console.log('RESPONSE ------>', response);
      if (response?.status === 200 || response?.status === 201) {
        console.log('CHAT SENT RESPONSE --->', response?.data);
        GetAllMessages();
        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `success`, false));
      } else {
        //Alert.alert(`${response?.data}`);
        console.log('CHAT SENT ERROR', response);
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected token status` + response.status,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(
          showToastMessage(
            true,
            `Unexpected token status ${response.status}`,
            true,
          ),
        );
      }
    } catch (error) {
      //Alert.alert(`${error}`)
      if (error.response) {
        // Toast.show({
        //   type: 'error',
        //   text1: error.response.status + error.response.data.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(
          showToastMessage(
            true,
            `error ${error.response.status + error.response.data.message}`,
            true,
          ),
        );
      } else if (error.request) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'no response received',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `no response received`, true));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `Error:-  ${error.message}`, true));
      }
      console.log(error);
    }
  };

  const EditRoom = async chatName => {
    try {
      const response = await axios.post(
        `${BASE_URL}/chats/editChat`,
        {
          chatId: roomData?.chat?._id,
          chatName: chatName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN?._j,
          },
        },
      );
      if (response.status == 200) {
        console.log('EDIT CHAT ROOM RESPONSE', response.data);
        // Toast.show({
        //   type: 'success',
        //   text1: 'Success',
        //   text2: 'Chat Room Edited Successfully',
        //   visibilityTime: 1000,
        //   autoHide: true,
        //   onHide: () => {},
        // });
        dispatch(
          showToastMessage(
            true,
            `Success Chat Room Edited Successfully`,
            false,
          ),
        );
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected token status` + response.status,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(
          showToastMessage(
            true,
            `Unexpected token status ${response.status}`,
            true,
          ),
        );
      }
    } catch (error) {
      //Alert.alert(`${error}`)
      if (error.response) {
        // Toast.show({
        //   type: 'error',
        //   text1: error.response.status + error.response.data.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(
          showToastMessage(
            true,
            `error ${error.response.status + error.response.data.message}`,
            true,
          ),
        );
      } else if (error.request) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'no response received',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `no response received`, true));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `Error:-  ${error.message}`, true));
      }
      console.log(error);
    }
  };

  // SOCKETS

  socket.on('message', data => {
    console.log('SOCKET CONNECTED');
    setMessagesResponse([...messagesResponse, data]);
  });

  // socket.on('receive', (data) => {
  //   console.log('SOCKET Received', data);
  //     setMessagesResponse([...messagesResponse, data])
  // });

  socket.on('error', data => {
    console.log('SOCKET CONNECTED');
    console.error('SOCKET ERROR', data);
  });

  useEffect(() => {
    console.log('SOCKET MESSAGE', socketMessage);
    socket.emit('message', socketMessage);
    socket.on('message', data => {
      console.log('SOCKET Data', data);
      setMessagesResponse([...messagesResponse, data]);
    });
  }, [socketMessage]);

  const onMessagePress = (context, message) => {
    const messageId = message ? message._id : null;
    console.log('Message Pressed. Message ID:', messageId);
    const options = ['copy', 'Delete Message', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(message.text);
          case 1:
            deleteMessage(messageId);
            break;
        }
      },
    );
  };
  const deleteMessage = async messageId => {
    try {
      // Call your API to delete the message using the message ID
      const response = await axios.delete(
        'https://api.jamrio.com/chatmessage/',
        {
          data: {
            messageId: messageId,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        // The message has been successfully deleted, update the chat messages
        GetAllMessages();
      } else {
        console.error('Error deleting message:', response);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colorsobject.darkgrey}}>
      {openEditChat && (
        <EditChatModel
          open={openEditChat}
          setOpen={setOpenEditChat}
          roomId={roomData?.chat?.id}
          EditRoom={EditRoom}
          goBack={goBack}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}
            style={{
              height: responsiveWidth(18),
              justifyContent: 'center',
              marginLeft: 6,
            }}>
            <Icon
              name="arrowleft"
              size={responsiveWidth(9)}
              color={colorsobject.themecolor}
            />
          </TouchableOpacity>
          <View
            style={{
              borderRadius: 100,
              backgroundColor: colorsobject.themecolor,
              height: 50,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',

              marginLeft: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                textTransform: 'uppercase',
                color: colorsobject.white,
              }}>
              {roomData?.chat?.chatName?.substring(0, 2)}
            </Text>
          </View>
          <View
            style={{
              height: 70,
              marginLeft: 10,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(3),
                  color: colorsobject.themecolor,
                  textAlign: 'center',
                }}>
                {roomData?.chat?.chatName?.length < 15
                  ? roomData?.chat?.chatName
                  : roomData?.chat?.chatName?.substring(0, 15) + '...'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log('Options menu');
              setOpenEditChat(true);
            }}
            activeOpacity={0.8}
            style={{
              width: 70,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: 0,
            }}>
            <SimpleLIneIcon
              name="options-vertical"
              size={20}
              color={colorsobject.themecolor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{flex: 1, backgroundColor: colorsobject.darkgrey, padding: 10}}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          onLongPress={(context, message) => onMessagePress(context, message)}
          user={{
            _id: user?.id,
          }}
          textInputProps={{
            style: {
              backgroundColor: colorsobject.textinputchat,
              color: colorsobject.white,
              width: '82%',
              paddingLeft: 10,
              height: '100%',
              borderWidth: 1,
              borderColor: colorsobject.grey,
              borderRadius: responsiveHeight(2),
              overflow: 'hidden',
            },
          }}
          renderAvatar={null}
          alwaysShowSend={true}
          renderInputToolbar={props => (
            <InputToolbar
              {...props}
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginRight: 15,
                width: '100%',
                borderTopColor: colorsobject.darkgrey,
                backgroundColor: colorsobject.darkgrey,
                paddingHorizontal: responsiveWidth(1),
              }}></InputToolbar>
          )}
          renderSend={props => (
            <Send
              {...props}
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginRight: 15,
                width: '18%',
                height: '100%',
              }}>
              <View
                style={{
                  backgroundColor: colorsobject.textinputchat,
                  width: responsiveWidth(16),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveHeight(2),
                  borderWidth: 1,
                  borderColor: colorsobject.grey,

                  height: '100%',
                }}>
                <Text
                  style={{
                    color: colorsobject.themecolor,
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: '700',
                    opacity: props?.text?.length > 0 ? 1 : 0.5,
                  }}>
                  Send
                </Text>
              </View>
            </Send>
          )}
          renderBubble={props => {
            return (
              <View>
                <Bubble
                  {...props}
                  textStyle={{
                    left: {
                      color: 'white',
                    },
                    right: {
                      color: 'white',
                    },
                  }}
                  wrapperStyle={{
                    left: {
                      paddingVertical: 8,
                      backgroundColor: colorsobject.grey7,
                      borderColor: colorsobject.chatbordercolor,
                      borderWidth: 1,
                      marginVertical: responsiveHeight(1),
                    },
                    right: {
                      paddingVertical: 8,
                      marginVertical: responsiveHeight(1),
                      backgroundColor: colorsobject.grey7,
                      borderColor: colorsobject.chatbordercolor,
                      borderWidth: 1,
                    },
                  }}
                />
              </View>
            );
          }}
          minInputToolbarHeight={70}
        />
      </View>
    </View>
  );
};

export default GroupChatScreen;
