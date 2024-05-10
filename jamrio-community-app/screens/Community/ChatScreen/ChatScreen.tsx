import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  BackHandler,
} from 'react-native';
import styles from './styles';
import React, {useState, useEffect} from 'react';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {BASE_URL, TOKEN} from '../../../redux/store';
import axios from 'axios';
import {io} from 'socket.io-client';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {colorsobject} from '../../../assets/ProjectColors/Colorsobject';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {showToastMessage} from '../../../redux/actions/userActions';
import SimpleLIneIcon from 'react-native-vector-icons/SimpleLineIcons';
import {GetAllChats} from '../../../redux/actions/userActions';
import Clipboard from '@react-native-community/clipboard';

const ChatScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {accountId, user} = useSelector((state: any) => state.user);
  // const dispatch = useDispatch();
  const {inboxID} = route.params;
  const [matchedUserDetails, setMatchedUserDetails] = useState<any>(null);
  const [messages, setMessages] = useState([]);
  const [messagesResponse, setMessagesResponse] = useState([]) as any[];
  const [receiver, setReceiver] = useState(null);
  const [chatDetails, setChatDetails] = useState(null);
  const [socketMessage, setSocketMessage] = useState({});
  const [socketAllMessages, setSocketAllMessages] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // INITIALIZING SOCKET
  const socket = io(`${BASE_URL}/chats/message`, {
    extraHeaders: {
      userid: user?.id,
    },
  });

  useEffect(() => {
    console.log('route params ->', inboxID);
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, []);

  useEffect(() => {
    GetChatDetails();
    GetAllMessages();
  }, [inboxID]);

  useEffect(() => {
    if (chatDetails !== null && chatDetails?.members.length > 0) {
      const receivingUser = chatDetails?.members.filter(
        item => item?.userid !== user?.id,
      );
      console.log('Receiver DETAILS', receivingUser[0]);
      setReceiver(receivingUser[0]);
    }
  }, [chatDetails]);

  useEffect(() => {
    if (messagesResponse.length > 0) {
      const messagesArray = messagesResponse.map(msg => {
        return {
          _id: msg?.id,
          text: msg?.message,
          createdAt: msg?.createdAt,
          user: {
            _id: msg?.senderId,
            name: msg?.senderId,
            avatar: 'https://placeimg.com/140/140/any',
          },
        };
      });
      setMessages(messagesArray);
      console.log('MESSAGES ARRAY', messagesArray);
    }
    console.log('MESSAGES RESPONSE', messagesResponse);
  }, [messagesResponse]);

  useEffect(() => {
    console.log('SOCKET MESSAGES  ', socketAllMessages);
    if (socketAllMessages.length > 0) {
      const messagesArray = socketAllMessages?.map(msg => {
        return {
          _id: msg?.id,
          text: msg?.message,
          createdAt: msg?.createdAt,
          user: {
            _id: msg?.senderId,
            name: msg?.senderId,
            avatar: 'https://placeimg.com/140/140/any',
          },
        };
      });
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messagesArray),
      );
      console.log(
        '------------------------NEW MESSAGES ARRAY --------------------------',
        messagesArray,
      );
    }
    console.log('SOCKET MESSAGES RESPONSE', socketAllMessages);
  }, [socketAllMessages]);

  const onSend = (messagesArray = []) => {
    console.log('MESSAGE ARRAY ------------->', messagesArray);
    const msg = messagesArray[0];
    console.log('MESSAGE ARRAY 0 ------------->', msg);
    setSocketMessage({
      chatId: inboxID,
      message: msg?.text,
    });
    const myMsg = {...msg, senderId: user?.id, receiverId: receiver?.userid};
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    console.log('My message', myMsg);
    // if(msg?.text !== undefined || msg?.text !== null || msg?.text !== "") {
    //   // SendMessageREST(msg?.text);
    // }
  };

  const BlockUser = async () => {
    try {
      const response = await axios.post(
        // `${BASE_URL}/appaccount/allmymatchs/${user?.id}/matched`,
        `${BASE_URL}/block`,
        {
          userid: user?.id,
          blockedusersid: receiver?.userid,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN?._j,
          },
        },
      );
      if (
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status === 204
      ) {
        // Toast.show({
        //   type: 'success',
        //   text1: `User Blocked Successfully!`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, 'User blocked successfully', false));
        console.log(
          'Remove Chat Member ----------------------------->',
          response?.data,
        );
        console.log('User Blocked SUCCESSFULLY');
        navigation.navigate('Home');
      }
    } catch (error) {
      //Alert.alert(`${error}`)
      if (error.response) {
        // Toast.show({
        //   type: 'error',
        //   text1:
        //     error?.response?.data?.message ||
        //     'Something went wrong' + error.response.status,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, 'Something went wrong', true));
        console.log('User Block ERROR', error.response?.data?.message);
      } else if (error.request) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'no response received',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, 'no response received', true));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, 'Error:-', true));
      }
      console.log(error);
    }
  };

  const GetChatDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/chats/${inboxID}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: TOKEN?._j,
        },
      });

      console.log('Chat RESPONSE ------>', response);
      if (response?.status === 200 || response?.status === 201) {
        console.log('CHAT GET RESPONSE --->', response?.data);
        setChatDetails(response?.data);
        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(showToastMessage(true, `success`, false));
      } else {
        //Alert.alert(`${response?.data}`);
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
        console.log('CHAT GET ERROR', response);
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

  const GetAllMessages = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/chats/messages/user/${user?.id}/chat/${inboxID}`,
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
        console.log('CHAT GET ERROR', response);
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
            `error  ${error.response.status + error.response.data.message}`,
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
          chatId: inboxID,
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
        // dispatch(showToastMessage(true, `success`, false));
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
            ` Unexpected token status +  ${response.status}`,
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

  // socket.on('message', (data) => {
  //   console.log('SOCKET CONNECTED and SENT --------------------------------', data);
  //   setSocketAllMessages([JSON.parse(data)])
  // });

  useEffect(() => {
    // Register the 'receiver' event listener
    const onReceive = data => {
      console.log('Received data:', data);
      setSocketAllMessages([JSON.parse(data)]);
    };

    socket.on('receive', onReceive);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('receive', onReceive);
    };
  }, []);

  useEffect(() => {
    console.log('SOCKET MESSAGE', socketMessage);
    socket.emit('message', socketMessage);
    // socket.on('message', (data) => {
    //   console.log('SOCKET Data', data);
    //       setSocketAllMessages([JSON.parse(data)])
    // });
    socket.on('error', data => {
      console.error('SOCKET ERROR', data);
    });

    return () => {
      socket.off('message');
      socket.off('error');
    };
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

        // reload the chat messages
        setMessages(messages.filter(message => message._id !== messageId));
        GetAllMessages();
      } else {
        console.error('Error deleting message:', response);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
    }
  };

  const DeleteChat = async () => {
    try {
      console.log('INBOX ID', inboxID);
      const response = await axios.delete(
        // `${BASE_URL}/appaccount/allmymatchs/${user?.id}/matched`,
        `${BASE_URL}/chats/deleteChat`,
        {
          data: {
            chatId: inboxID,
          },
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN?._j,
          },
        },
      );
      if (
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status === 204
      ) {
        Toast.show({
          type: 'success',
          text1: `Chat Deleted Successfully!`,
          visibilityTime: 3000,
          autoHide: true,
        });
        console.log(
          'Remove Chat Member ----------------------------->',
          response?.data,
        );
        console.log('Chat Deleted SUCCESSFULLY');
        // GetChatDetails();
        dispatch(GetAllChats(user?.id));
        navigation.goBack();
      }
    } catch (error) {
      //Alert.alert(`${error}`)
      if (error.response) {
        Toast.show({
          type: 'error',
          text1:
            error?.response?.data?.message ||
            'Something went wrong' + error.response.status,
          visibilityTime: 3000,
          autoHide: true,
        });
        console.log('CHAT DELETE ERROR', error.response?.data?.message);
      } else if (error.request) {
        Toast.show({
          type: 'error',
          text1: 'no response received',
          visibilityTime: 3000,
          autoHide: true,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error:- ' + error.message,
          visibilityTime: 3000,
          autoHide: true,
        });
      }
      console.log(error);
    }
  };

  const DeleteModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalOpen}
        onRequestClose={() => {
          setDeleteModalOpen(false);
        }}
        // onRequestClose={() => {
        //   //Alert.alert("Modal has been closed.");
        //   setModalVisible(false);
        // }}
      >
        <TouchableOpacity
          style={styles.modalView}
          onPress={() => {
            setDeleteModalOpen(false);
          }}>
          <View style={styles.modalInnerView}>
            <TouchableOpacity
              style={styles.options}
              onPress={() => BlockUser()}>
              <Text style={styles.modaltext}>Block User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.options}
              onPress={() => DeleteChat()}>
              <Text style={styles.modaltext}>Delete Chat</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colorsobject.darkgrey}}>
      <DeleteModal />
      <View
        style={{
          backgroundColor: colorsobject.darkgrey,
          flexDirection: 'row',
          borderBottomColor: colorsobject.lineseparator,
          borderWidth: 0.5,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: responsiveWidth(4),
          }}
          onPress={() => {
            navigation.navigate('OtherUserProfile', {
              uid: receiver?.user?.id,
            });
          }}>
          {receiver?.user?.profileImage.length > 0 ? (
            <Image
              source={{uri: receiver?.user?.profileImage}}
              style={{
                borderRadius: 100,
                backgroundColor: colorsobject.themecolor,
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
                resizeMode: 'cover',
              }}
            />
          ) : (
            <View
              style={{
                borderRadius: 100,
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 30}}>
                {receiver?.user?.name?.substring(0, 2)}
              </Text>
            </View>
          )}
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <View>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.7),
                  color: colorsobject.themecolor,
                }}>
                {receiver?.user?.name?.length < 15
                  ? receiver?.user?.name
                  : receiver?.user?.name?.substring(0, 15) + '...'}
              </Text>
              <Text
                style={{
                  color: colorsobject.grey3,
                  fontSize: responsiveFontSize(2),

                  fontWeight: '300',
                }}>
                {receiver?.user?.username?.length < 15
                  ? receiver?.user?.username
                  : receiver?.user?.username?.substring(0, 15) + '...'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('Options menu');
            setDeleteModalOpen(true);
          }}
          activeOpacity={0.8}
          style={{
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: responsiveWidth(5),
          }}>
          <SimpleLIneIcon
            name="options-vertical"
            size={20}
            color={colorsobject.themecolor}
          />
        </TouchableOpacity>
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

export default ChatScreen;
