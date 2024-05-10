import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './SkillsStyles';
import Icon from 'react-native-vector-icons/AntDesign';

import SearchBar from 'react-native-search-bar';
import {BASE_URL, TEST_URL, TOKEN} from '../../redux/store';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CreateChatModel from '../../components/CreateChatModel/CreateChatModel';
import comingsoonImg from '../../assets/images/coming-soon.png';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Shimmernotification from '../Notification/shimmernotification';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import {RFValue} from 'react-native-responsive-fontsize';
import {showToastMessage} from '../../redux/actions/userActions';

const RoomsScreen = ({navigation, rooms, loading}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.user);
  const [allUsers, setAllUsers] = useState<any>([]);

  useEffect(() => {
    GetAllUsers();
  }, []);

  useEffect(() => {
    console.log('ROOMS', rooms);
  }, [rooms]);

  const GetAllUsers = async () => {
    setAllUsers([]);
    try {
      const response = await axios.get(
        `${BASE_URL}/appaccount/notmymatchs/${user?.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN?._j,
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
        //dispatch(showToastMessage(true, `success`, false));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected token status` + response.status,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(
        //   showToastMessage(
        //     true,
        //     `Unexpected token status ${response.status}`,
        //     true,
        //   ),
        // );
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
        // dispatch(
        //   showToastMessage(
        //     true,
        //     `error ${error.response.status + error.response.data.message}`,
        //     true,
        //   ),
        // );
      } else if (error.request) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'no response received',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `no response received`, true));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
      }
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        minHeight: responsiveHeight(70),
      }}>
      <ScrollView
        style={{marginTop: 15, flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingBottom: 100,
          }}>
          {/* {rooms?.length > 0 && rooms?.map(item => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    width: '100%',
                  }}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('GroupChatScreen', {
                      roomData: item,
                    })
                  }
                >
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: colorsobject.themecolor,
                      height: 70,
                      width: 70,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 30, textTransform: "uppercase"}}>{item?.chat?.chatName?.substring(0,2)}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      width: '80%',
                    }}>
                    <View style={{paddingLeft: 15, paddingTop: 15}}>
                      <View>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '700',
                          }}>
                          {item?.chat?.chatName}
                        </Text>
                      </View>
                      <View>
                        <Text>Lhvorem ipsum dolor sit amet</Text>
                      </View>
                    </View>
                    <View style={{padding: 15}}>
                      <View>
                        <Text>12:05 am</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })} */}

          {/* =============COMING SOON================= */}
          {loading && <Shimmernotification />}
          <FlatList
            data={rooms}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate('GroupChatScreen', {
                        roomData: item,
                      })
                    }>
                    <View
                      style={{
                        borderRadius: 100,
                        backgroundColor: colorsobject.themecolor,
                        height: responsiveWidth(13),
                        width: responsiveWidth(13),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.8),
                          textTransform: 'uppercase',
                          color: colorsobject.white,
                        }}>
                        {item?.chat?.chatName?.substring(0, 2)}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        width: '80%',
                      }}>
                      <View
                        style={{
                          paddingLeft: 15,
                          paddingTop: responsiveHeight(0.2),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.5),
                            fontWeight: '500',
                            color: colorsobject.white,
                          }}>
                          {item?.chat?.chatName}
                        </Text>
                      </View>
                      <View
                        style={{
                          paddingRight: 15,
                          paddingTop: responsiveHeight(0.4),
                        }}>
                        <Text style={{color: colorsobject.white}}>
                          12:05 am
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderWidth: 0.3,
                      marginTop: 5,
                      borderRadius: 30,
                      borderColor: colorsobject.mediumgrey,
                      width: '90%',
                      alignSelf: 'center',
                    }}></View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* <View>
              <Image source={comingsoonImg} style={{width: responsiveWidth(80), height: 300,
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: 20,
            }} />
            </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default RoomsScreen;
