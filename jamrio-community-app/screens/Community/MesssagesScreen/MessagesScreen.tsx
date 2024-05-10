import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../SkillsStyles';
import RoomsScreen from '../RoomsScreen';
import InboxScreen from '../InboxScreen';
import Header from '../../../components/Header';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import CreateChatModel from '../../../components/CreateChatModel/CreateChatModel';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {BASE_URL, TEST_URL, TOKEN} from '../../../redux/store';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {colorsobject} from '../../../assets/ProjectColors/Colorsobject';
import {RFValue} from 'react-native-responsive-fontsize';
import {showToastMessage} from '../../../redux/actions/userActions';
import {GetAllChats} from '../../../redux/actions/userActions';

const MessagesScreen = ({navigation}) => {
  const {user, all_chats} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [active, setActive] = useState('inbox');
  const [createChatOpen, setCreateChatOpen] = useState(false);
  const [rooms, setRooms] = useState<any>([]);
  const [inboxes, setInboxes] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user === null || user === undefined) {
      navigation.navigate('Login');
    }
  }, [user]);

  useEffect(() => {
    GetAllChats();
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(GetAllChats(user?.id));
  }, [active]);

  useEffect(() => {
    setRooms([]);
    setLoading(false);
    if (all_chats?.length > 0) {
      const filteredRooms = all_chats?.filter(chat => chat?.chat.isGroupChat);
      console.log('FILTERED ROOMS', filteredRooms);
      const filteredInboxes = all_chats?.filter(
        chat => !chat?.chat.isGroupChat,
      );
      console.log('FILTERED INBOXES', filteredInboxes);
      setRooms(filteredRooms);
      setInboxes(filteredInboxes);
    }
  }, [all_chats]);

  const CreateRoom = async chatName => {
    try {
      const response = await axios.post(
        `${BASE_URL}/chats/groupchat`,
        {
          chatName: chatName,
          users: [user?.id], //DUMMY
          adminUserId: user?.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN?._j,
          },
        },
      );
      if (response.status == 200) {
        dispatch(GetAllChats(user?.id));
        console.log('CREATE CHAT ROOM RESPONSE', response.data);
        // Toast.show({
        //   type: 'success',
        //   text1: 'Success',
        //   text2: 'Chat Room Created Successfully',
        //   visibilityTime: 1000,
        //   autoHide: true,
        //   onHide: () => {},
        // });

        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `Chat created`, false));
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
        dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
      }
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.container, {marginBottom: responsiveHeight(6)}]}>
        <Header title="Messages" />
        {createChatOpen && (
          <CreateChatModel
            open={createChatOpen}
            setOpen={setCreateChatOpen}
            CreateRoom={CreateRoom}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('InboxScreen');
              setActive('inbox');
            }}
            style={{
              borderBottomWidth: 2,
              marginRight: 15,
              borderColor:
                active == 'inbox'
                  ? colorsobject.themecolor
                  : colorsobject.white,
            }}>
            <Text
              style={{
                fontSize: RFValue(17),
                fontWeight: '600',
                color:
                  active == 'inbox'
                    ? colorsobject.themecolor
                    : colorsobject.white,
                marginBottom: responsiveHeight(0.7),
              }}>
              Inbox
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('RoomsScreen');
              setActive('rooms');
            }}
            style={{
              borderBottomWidth: 2,
              borderColor:
                active !== 'inbox'
                  ? colorsobject.themecolor
                  : colorsobject.white,
            }}>
            <Text
              style={{
                fontSize: RFValue(17),
                fontWeight: '600',
                color:
                  active !== 'inbox'
                    ? colorsobject.themecolor
                    : colorsobject.white,
                marginBottom: responsiveHeight(0.7),
              }}>
              Rooms
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          {active == 'inbox' ? (
            <InboxScreen
              navigation={navigation}
              inboxes={inboxes}
              loading={loading}
            />
          ) : (
            <RoomsScreen
              navigation={navigation}
              rooms={rooms}
              loading={loading}
            />
          )}
        </View>
        {active == 'rooms' && (
          <TouchableOpacity
            onPress={() => {
              console.log('Create Chat Room');
              // CreateChatRoom()
              setCreateChatOpen(true);
            }}
            activeOpacity={0.8}
            style={{
              backgroundColor: colorsobject.white,
              height: responsiveWidth(15),
              width: responsiveWidth(15),
              borderRadius: responsiveWidth(15),
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: responsiveWidth(20),
              right: responsiveWidth(5),
              elevation: 5,
            }}>
            <Icon name="plus" size={20} color={colorsobject.darkcharcoal} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MessagesScreen;
