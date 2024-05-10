import {
  Alert,
  Modal,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import axios, {all} from 'axios';
import {BASE_URL, TOKEN} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {GetAllChats} from '../../redux/actions/userActions';

const EditChatModel = ({open, setOpen, EditRoom, roomId, goBack}) => {
  const {user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(open || false);
  const [allUsers, setAllUsers] = useState([]) as any[];
  useEffect(() => {
    setModalVisible(open);
    GetAllUsers();
    GetChatDetails();
  }, [open]);
  const [chatMembers, setChatMembers] = useState([]) as any[];
  const [notChatMembers, setNotChatMembers] = useState([]) as any[];
  const [roomData, setRoomData] = useState(null) as any;
  const [option, setOption] = useState('view') as any;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false) as any;

  useEffect(() => {
    const notMembers = allUsers.filter(
      user =>
        chatMembers?.findIndex(member => member?.user?.id === user?.id) === -1,
    );
    console.log('-----------------------------------------');
    console.log('CHAT MEMBERS ==================>', chatMembers);
    console.log('NOT MEMBERS ==================>', notMembers);
    console.log('ALL USERS ==================>', allUsers);
    console.log('-----------------------------------------');
    setNotChatMembers(notMembers);
  }, [allUsers, chatMembers]);

  useEffect(() => {
    console.log('ROOM DATA ==================>', roomData?.members);
    setChatMembers(roomData?.members);
  }, [roomData]);

  const GetAllUsers = async () => {
    setAllUsers([]);
    try {
      const response = await axios.get(
        // `${BASE_URL}/appaccount/allmymatchs/${user?.id}/matched`,
        `${BASE_URL}/appaccount/allmymatchs/${user?.id}/matched`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN._j,
          },
        },
      );
      console.log(
        'Get All Users ----------------------------->',
        response?.data,
      );
      if (response?.status === 200) {
        setAllUsers(response?.data);
        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(showToastMessage(true, `success`, false));
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
            `${error.response.status + error.response.data.message}`,
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
        // dispatch(showToastMessage(true, `text1: 'no response received`, true));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `Error:-  ${response.status}`, true));
      }
      console.log(error);
    }
  };

  const GetChatDetails = async () => {
    setRoomData([]);
    try {
      console.log('ROOM ID', roomId);
      console.log('REQUEST URL', `${BASE_URL}/chats/${roomId}`);
      const response = await axios.get(
        // `${BASE_URL}/appaccount/allmymatchs/${user?.id}/matched`,
        `${BASE_URL}/chats/${roomId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN._j,
          },
        },
      );
      console.log(
        'Get Chat Details ----------------------------->',
        response?.data,
      );
      if (response?.status === 200) {
        setRoomData(response?.data);
        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected Error occurred` + response.status,
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
        setRoomData(null);
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
            ` ${error.response.status + error.response.data.message}`,
            true,
          ),
        );
        setRoomData(null);
      } else if (error.request) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'no response received',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `no response received`, true));
        setRoomData(null);
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `Error:-  ${error.message}`, true));
        setRoomData(null);
      }
      console.log(error);
    }
  };

  const AddMembers = async userId => {
    try {
      const response = await axios.put(
        // `${BASE_URL}/appaccount/allmymatchs/${user?.id}/matched`,
        `${BASE_URL}/chats/groupchat/member`,
        {
          chatId: roomId,
          userId: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN._j,
          },
        },
      );
      if (
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status === 204
      ) {
        GetAllUsers();
        GetChatDetails();
        // Toast.show({
        //   type: 'success',
        //   text1: `Member Successfully Added to ${roomData?.chat?.chatName}`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(
          showToastMessage(
            true,
            `Member Successfully Added to ${roomData?.chat?.chatName}`,
            true,
          ),
        );
        console.log(
          'Add Chat Member ----------------------------->',
          response?.data,
        );
        console.log('MEMBER ADDED SUCCESSFULLY');
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
        dispatch(
          showToastMessage(
            true,
            ` ${error?.response?.data?.message} || Something went wrong  ${error.response.status}`,
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

  const RemoveMembers = async userId => {
    try {
      const response = await axios.delete(
        // `${BASE_URL}/appaccount/allmymatchs/${user?.id}/matched`,
        `${BASE_URL}/chats/groupchat/member`,
        {
          data: {
            userId: userId,
            chatId: roomId,
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
        GetAllUsers();
        GetChatDetails();
        // Toast.show({
        //   type: 'success',
        //   text1: `Member Successfully Removed from ${roomData?.chat?.chatName}`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(
          showToastMessage(
            true,
            `Member Successfully Removed from ${roomData?.chat?.chatName}`,
            true,
          ),
        );
        console.log(
          'Remove Chat Member ----------------------------->',
          response?.data,
        );
        console.log('MEMBER Removed SUCCESSFULLY');
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
        dispatch(
          showToastMessage(
            true,
            `${response.status} ||Something went wrong ${error.response.status} `,
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

  const DeleteGroupChat = async () => {
    try {
      const response = await axios.delete(
        // `${BASE_URL}/appaccount/allmymatchs/${user?.id}/matched`,
        `${BASE_URL}/chats/groupchat`,
        {
          data: {
            chatId: roomId,
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
        setDeleteModalOpen(false);
        Toast.show({
          type: 'success',
          text1: `Group Deleted Successfully!`,
          visibilityTime: 3000,
          autoHide: true,
        });
        console.log(
          'Remove Chat Member ----------------------------->',
          response?.data,
        );
        console.log('Group Deleted SUCCESSFULLY');
        // GetAllUsers();
        dispatch(GetAllChats(user?.id));
        goBack();
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

  const UserListItem = ({item, index, option}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        flex: 1,
      }}
      key={index}>
      <View>
        <Text
          style={{fontSize: 16, fontWeight: '600', color: colorsobject.black}}>
          {item?.name}
        </Text>
        <Text
          style={{fontSize: 12, fontWeight: '600', color: colorsobject.grey6}}>
          {item?.username}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log('Add user to chat', item);
          option === 'add' ? AddMembers(item?.id) : RemoveMembers(item?.id);
        }}
        style={{
          backgroundColor: colorsobject.black,
          borderRadius: 50,
          width: 20,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name={option === 'add' ? 'plus' : 'minus'}
          size={10}
          color={colorsobject.white}
        />
      </TouchableOpacity>
    </View>
  );

  const DeleteModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalOpen}
        // onRequestClose={() => {
        //   //Alert.alert("Modal has been closed.");
        //   setModalVisible(false);
        // }}
        style={{
          flex: 1,
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalInnerView}>
            <Text style={styles.modalText}>
              Are you sure you want to Delete This Chat?
            </Text>

            <View style={styles.modalBtnContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: colorsobject.white,
                  padding: 10,
                  borderRadius: 50,
                  width: '40%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: colorsobject.themecolor,
                  borderWidth: 1,
                }}
                onPress={() => {
                  setDeleteModalOpen(false);
                }}>
                <Text
                  style={{
                    color: colorsobject.themecolor,
                    fontSize: 16,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // dispatch(DeleteVideo(videoToBeDeleted?.id));
                  DeleteGroupChat();
                }}>
                <Text style={styles.modalBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.modalBGContainer}>
      <Toast position="top" topOffset={10} />
      <DeleteModal />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   //Alert.alert("Modal has been closed.");
        //   setModalVisible(false);
        // }}
        style={{flex: 1}}>
        <View style={styles.modalContainer}>
          <ScrollView
            style={{
              flex: 1,
              width: '100%',
              // maxWidth: 260,
              // backgroundColor: colorsobject.white,
              position: 'relative',
              paddingBottom: 50,
            }}>
            <Icon
              name="close"
              size={20}
              color={colorsobject.black}
              style={{alignSelf: 'flex-end', margin: 10}}
              onPress={() => {
                setModalVisible(false);
                setOpen(false);
              }}
            />
            <View style={styles.modalContent}>
              <View
                style={{
                  flexDirection: 'row',
                  // alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  flex: 1,
                  gap: 20,
                }}>
                <TouchableOpacity
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor:
                      option === 'view'
                        ? colorsobject.orange
                        : colorsobject.white,
                  }}
                  onPress={() => {
                    setOption('view');
                  }}
                  activeOpacity={0.8}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: colorsobject.black,
                    }}>
                    Chat Members
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor:
                      option === 'add'
                        ? colorsobject.orange
                        : colorsobject.white,
                  }}
                  onPress={() => {
                    setOption('add');
                  }}
                  activeOpacity={0.8}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: colorsobject.black,
                    }}>
                    Add Members
                  </Text>
                </TouchableOpacity>
                {roomData?.groupAdmin === user?.id && (
                  <TouchableOpacity onPress={() => setDeleteModalOpen(true)}>
                    <FeatherIcon
                      name="trash-2"
                      size={20}
                      color={colorsobject.red}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {/* <TextInput placeholder="Enter Chat Name" placeholderTextColor={colorsobject.grey5} style={styles.chatInput}
                value={chatName} onChangeText={text => setChatName(text)}
              /> */}
              {option === 'add' ? (
                <>
                  {notChatMembers?.length <= 0 ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: colorsobject.black,
                        textAlign: 'center',
                      }}>
                      No users to add
                    </Text>
                  ) : (
                    <FlatList
                      data={notChatMembers}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => (
                        <UserListItem
                          item={item}
                          index={index}
                          option={'add'}
                        />
                      )}
                    />
                  )}
                </>
              ) : (
                <>
                  {chatMembers?.length <= 0 ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: colorsobject.black,
                        textAlign: 'center',
                      }}>
                      No Members in this chat
                    </Text>
                  ) : (
                    <FlatList
                      data={chatMembers}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => (
                        <UserListItem
                          item={item?.user}
                          index={index}
                          option={'remove'}
                        />
                      )}
                    />
                  )}
                </>
              )}
            </View>
            {/* <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8}
              onPress={() => {
                setOpen(false);
              }}
            >
              <Text
                style={{
                  color: colorsobject.white,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Save Details
              </Text>
            </TouchableOpacity> */}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default EditChatModel;
