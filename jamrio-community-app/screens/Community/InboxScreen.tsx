import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './SkillsStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SearchBar from 'react-native-search-bar';
import Navigation from '../../components/Navigation/Navigation';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {BASE_URL, TEST_URL} from '../../redux/store';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import _ from 'lodash';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Shimmernotification from '../Notification/shimmernotification';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const InboxScreen = ({navigation, inboxes, loading}) => {
  const {user, accountId} = useSelector((state: any) => state.user);
  const [filteredInboxes, setFilteredInboxes] = useState<any>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFilteredInboxes([]);
  }, []);

  useEffect(() => {
    // GetAllInboxes()
    console.log('MY INBOXES ----->', inboxes);
    setFilteredInboxes(inboxes);
  }, [inboxes]);

  useEffect(() => {
    filterInboxes();
  }, [searchText]);

  const filterInboxes = () => {
    if (searchText === '') {
      setFilteredInboxes(inboxes);
      return;
    } else {
      const filteredInboxes = inboxes.filter(item => {
        return item?.chat.chatName
          .toLowerCase()
          .includes(searchText?.toLowerCase());
      });
      setFilteredInboxes(filteredInboxes);
    }
  };

  return (
    <View style={{flex: 1, marginBottom: responsiveWidth(3)}}>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: colorsobject.darkgrey7,
            width: responsiveWidth(90),
            height: responsiveWidth(13),
            justifyContent: 'center',
            borderRadius: 50,
            flexDirection: 'row',
            marginTop: responsiveHeight(2),
            marginBottom: responsiveHeight(1),
          }}>
          <TextInput
            onChangeText={text => {
              setSearchText(text);
            }}
            value={searchText}
            placeholder="Search"
            placeholderTextColor={colorsobject.grey}
            style={{
              paddingHorizontal: 20,
              fontSize: 16,
              color: colorsobject.white,
              width: '90%',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              position: 'absolute',
              right: 10,
              top: 15,
            }}>
            <Icon name="search1" size={20} color={colorsobject.grey} />
          </View>
        </View>
      </View>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {loading && <Shimmernotification />}
        <View>
          {filteredInboxes &&
            filteredInboxes?.map(item => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ChatScreen', {
                        // find same inboxID from my user and matched user and pass it to the chat screen
                        inboxID: item?.chat?.id,
                      });
                      console.log('ITEM inboxID', item?.chat?.id);
                    }}
                    key={item.id}
                    activeOpacity={0.8}
                    style={{
                      flexDirection: 'row',
                      width: responsiveWidth(90),
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    {item?.chat?.members[0]?.user?.profileImage.lengh > 0 ? (
                      <View
                        style={{
                          borderRadius: 100,
                          backgroundColor: colorsobject.themecolor,
                          height: responsiveWidth(13),
                          width: responsiveWidth(13),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {console.log('CHAT NAME ======>', item?.chat?.chatName)}
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.8),
                            textTransform: 'uppercase',
                            color: colorsobject.white,
                          }}>
                          {item?.chat?.chatName
                            .split(':')[1]
                            ?.substring(0, 2) ||
                            item?.chat?.chatName.split(':')[0]?.substring(0, 2)}
                        </Text>
                      </View>
                    ) : (
                      <Image
                        source={{
                          uri:
                            item?.chat?.members[0].user?.id === accountId
                              ? item?.chat?.members[1]?.user?.profileImage
                              : item?.chat?.members[0]?.user?.profileImage,
                        }}
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
                    )}

                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: responsiveWidth(75),
                        position: 'relative',
                      }}>
                      <View style={{paddingLeft: 15}}>
                        <View>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(2.5),
                              fontWeight: '500',
                              color: colorsobject.white,
                            }}>
                            {item?.chat?.chatName?.length < 15
                              ? item?.chat?.chatName.split(':')[1] ===
                                user?.username
                                ? item?.chat?.chatName.split(':')[0]
                                : item?.chat?.chatName.split(':')[1] ||
                                  item?.chat?.chatName.split(':')[0] ===
                                    user?.username
                                ? item?.chat?.chatName.split(':')[1]
                                : item?.chat?.chatName.split(':')[0]
                              : item?.chat?.chatName.split(':')[1] ===
                                user?.username
                              ? item?.chat?.chatName
                                  .split(':')[0]
                                  ?.substring(0, 15)
                              : item?.chat?.chatName
                                  .split(':')[1]
                                  ?.substring(0, 15) ||
                                item?.chat?.chatName.split(':')[0] ===
                                  user?.username
                              ? item?.chat?.chatName
                                  .split(':')[1]
                                  ?.substring(0, 15)
                              : item?.chat?.chatName
                                  .split(':')[0]
                                  ?.substring(0, 15) + '...'}
                          </Text>
                        </View>
                        {/* <View>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.8),
                              color: colorsobject.white,
                              marginTop: responsiveHeight(0.5),
                            }}>
                            Lorem ipsum dolor sit amet
                          </Text>
                        </View> */}
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {/* <Text>12:05 am</Text> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.linesep}></View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default InboxScreen;
