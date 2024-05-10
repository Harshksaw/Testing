import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import MUCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
//import Icon from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import notifee from '@notifee/react-native';
import SoundWave from '../../components/SoundWave/SoundWave';
import Header from '../../components/Header';
import {BASE_URL} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

import Shimmernotification from './shimmernotification';
import {
  GetNotifications,
  MatchUser,
  RejectUser,
} from '../../redux/actions/userActions';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BuyPremiumModal from '../../components/BuyPremiumModal/BuyPremiumModal';

const userName = [
  {
    name: 'abc',
    msg: 'wants to connect',
    time: '3h',
  },
  {
    name: 'abc',
    msg: 'wants to connect',
    time: 'Apr 28',
  },
  {
    name: 'abc',
    msg: 'wants to connect',
    time: '3h',
  },
];

const onDisplayNotification = async () => {
  // Request permissions (required for iOS)
  // await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
};

const Notification = ({navigation}) => {
  const {user, user_notifications, notif_loading} = useSelector(
    (state: any) => state.user,
  );
  const dispatch = useDispatch();
  const [userNotifications, setUserNotifications] = useState([]) as any[];
  const [loading, setLoading] = useState(false);
  const [premiumModal, setPremiumModal] = useState(false);

  useEffect(() => {
    dispatch(GetNotifications(user?.id));
  }, [user]);

  useEffect(() => {
    if (user_notifications?.length > 0) {
      setUserNotifications(user_notifications);
    }
  }, [user_notifications]);

  useEffect(() => {
    if (notif_loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [notif_loading]);

  return (
    <View style={styles.container}>
      <Header title="Notifications" />
      <Toast position="top" bottomOffset={20} />
      {premiumModal && (
        <BuyPremiumModal
          setPremiumModal={setPremiumModal}
          premiumModal={premiumModal}
        />
      )}
      <ScrollView
        style={{
          flex: 1,
          marginBottom: responsiveHeight(6),
        }}>
        {/* <Button title='Open Ads' onPress={() => navigation.navigate('Ads')} />
        <Button title='Buy Premium' onPress={() => navigation.navigate('BuyPremium')} />
        <Button title='Modal' onPress={() => 
          setPremiumModal(true)
        } /> */}
        {/* <Button title='Open Videos' onPress={() => navigation.navigate('VideoContent')} /> */}
        {loading && <Shimmernotification />}

        {userNotifications?.length == 0 && (
          <View
            style={{
              height: responsiveHeight(80),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colorsobject.white,
                width: '100%',
                textAlign: 'center',
                fontSize: responsiveFontSize(2.3),
                opacity: 0.3,
              }}>
              No notifications yet
            </Text>
            <Text
              style={{
                color: colorsobject.white,
                width: '100%',
                textAlign: 'center',
                fontSize: responsiveFontSize(2.3),
                opacity: 0.3,
              }}>
              Get swiping and make some new friends!
            </Text>
          </View>
        )}
        {userNotifications?.length > 0 &&
          userNotifications?.map((notif, index) => (
            <>
              <View style={styles.entire}>
                <View>
                  <View>
                    <View style={styles.block}>
                      <View style={styles.icon}>
                        <Image
                          source={{
                            uri: 'https://plus.unsplash.com/premium_photo-1688375301390-2eff2d89a358?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
                          }}
                          style={styles.icon}
                        />
                      </View>
                      <View style={styles.details1}>
                        <View>
                          <Text style={styles.nametext}>{notif.title} </Text>
                        </View>
                        <View
                          style={{
                            width:
                              notif?.notificationType === 'swipe' ||
                              notif?.notificationType === 'match'
                                ? responsiveWidth(40)
                                : responsiveWidth(70),
                          }}>
                          <Text style={styles.msgtext}>{notif.message}</Text>
                        </View>
                        <View>
                          <Text style={styles.timetext}>
                            {moment(notif?.createdAt).format(
                              'MMM DD - hh:mm a',
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      {/* <Text style={styles.timetext}>{userName.time}</Text> */}
                    </View>
                  </View>
                </View>
                {/* AVAILABLE IN NEXT UPDATE */}
                {notif?.notificationType === 'swipe' && (
                  <View style={styles.btnscontainer}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={[
                        colorsobject.secondarycolor,
                        colorsobject.themecolor,
                      ]}
                      style={styles.acceptbtn}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          dispatch(MatchUser(user?.id, notif?.senderId))
                        }>
                        <Icon
                          name="check"
                          size={18}
                          style={styles.acceptbtntext}
                        />
                      </TouchableOpacity>
                    </LinearGradient>
                    <View>
                      <TouchableOpacity
                        style={styles.ignorebtn}
                        activeOpacity={0.8}
                        onPress={() =>
                          dispatch(RejectUser(user?.id, notif?.senderId))
                        }>
                        <Icon
                          name="close"
                          size={18}
                          style={styles.ignorebtntext}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {notif?.notificationType === 'match' ||
                  (notif?.notificationType === 'chat' && (
                    <View style={styles.btnscontainer}>
                      <View style={styles.chatbtn}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() =>
                            navigation.navigate('ChatScreen', {
                              // find same inboxID from my user and matched user and pass it to the chat screen
                              inboxID: notif?.chatId,
                            })
                          }>
                          <MUCommunityIcon
                            name="message-text-outline"
                            size={18}
                            style={styles.ignorebtntext}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
              </View>
              <View style={styles.linesep}></View>
            </>
          ))}
      </ScrollView>
    </View>
  );
};

export default Notification;
