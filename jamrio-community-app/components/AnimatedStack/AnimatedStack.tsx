import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import TinderCard from 'react-tinder-card';
import styles from './styles';
import ProfileCard from '../ProfileCard/ProfileCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import {to} from '@react-spring/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import matchBG from '../../assets/images/matchScreenBG.png';
import musicIcon from '../../assets/images/musicIcon.png';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  useDerivedValue,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import like from '../../assets/images/like.png';
import dislike from '../../assets/images/nope.png';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL, TOKEN} from '../../redux/store';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {
  GetAllUsers,
  GetUserDetails,
  MatchUser,
  RejectUser,
} from '../../redux/actions/userActions';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

function AnimatedStack() {
  const {accountId, user, not_my_matches, users_status_code, match_success} =
    useSelector((state: any) => state.user);
  const [ACCID, setACCID] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [allUsers, setAllUsers] = useState<any>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [usersSwipped, setUsersSwipped] = useState<any>([]);
  const [usersSwippedLeft, setUsersSwippedLeft] = useState<any>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  // SWIPE ANIMATION ------------------
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);
  const currentProfile = allUsers && allUsers[currentIndex];
  const nextProfile = allUsers && allUsers[nextIndex];
  const [usersStatusCode, setUsersStatusCode] = useState<any>(0);

  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = screenWidth * 1.5;

  useEffect(() => {
    getAccountId();
  }, []);

  useEffect(() => {
    console.log('Account ID -------->', ACCID);
  }, [ACCID]);

  useEffect(() => {
    console.log('------------------Next profile-----------', nextProfile);
    console.log('------------------Current profile-----------', currentProfile);
  }, [nextProfile, currentProfile]);

  const getAccountId = async () => {
    const value = await AsyncStorage.getItem('accountId');
    const value2 = accountId;
    // remove double quotes if any
    const AID = value?.replace(/['"]+/g, '') || value2?.replace(/['"]+/g, '');
    return setACCID(AID || null);
  };

  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      'deg',
  );
  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.5, 1],
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.5, 1],
    ),
  }));

  const onSwipeLeft = () => {
    console.log('swiped left ++++++++++++++++++++++++', currentUser);
    setUsersSwippedLeft(prev => [
      ...prev,
      {uid: currentUser?.id, uname: currentUser?.username},
    ]);
    dispatch(RejectUser(user?.id, currentUser?.id));
    setUserCount(userCount + 1);
    // remove swipped user from all users
    setAllUsers(prev => prev.filter(user => user.id !== currentUser?.id));
    // setUsersSwipped(prev => [...prev, currentUser.id])
  };

  const onSwipeRight = () => {
    console.log(
      'swiped right ++++++++++++++++++++++++++++++++++++',
      currentUser,
    );
    dispatch(MatchUser(user?.id, currentUser?.id));
    setUsersSwipped(prev => [
      ...prev,
      {uid: currentUser?.id, uname: currentUser?.username},
    ]);
    // remove swipped user from all users
    setAllUsers(prev => prev.filter(user => user.id !== currentUser?.id));
    setUserCount(userCount + 1);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: event => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }
      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {},
        () => {
          runOnJS(setCurrentIndex)(currentIndex + 1);
        },
      );
      const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft;
      onSwipe && runOnJS(onSwipe)();
    },
  });

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 5], [0, 1]),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 5], [0, 1]),
  }));

  useEffect(() => {
    if (user === null || user === undefined) {
      navigate.navigate('Login');
    }
  }, [user]);

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
    // console.log('Next User--------------------', nextProfile);
  }, [currentIndex, translateX]);

  useEffect(() => {
    setCurrentUser(currentProfile);
    // console.log('Current User', currentProfile);
  }, [currentProfile]);

  // SWIPE ANIMATION ------------------

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    console.log('Modal Visible------', isModalVisible);
  };

  useEffect(() => {
    console.log('ACCID FOUND, CALLING USERS:');
    dispatch(GetAllUsers(ACCID));
  }, [user, ACCID]);

  useEffect(() => {
    setUsersStatusCode(users_status_code);
    setAllUsers(not_my_matches);
  }, [not_my_matches]);

  useEffect(() => {
    if (match_success?.includes('matched')) {
      toggleModal();
    }
  }, [match_success]);

  useEffect(() => {
    // console.log('_______________USER COUNT______________', userCount);
    // console.log('_______________All USERS______________', allUsers);
    // Pagination, fetch new list of users when count reaches 10
    // status code 204 = no more users to swipe
    if (usersStatusCode === 204) {
      return;
    } else if (userCount === 10 || currentProfile === undefined) {
      dispatch(GetAllUsers(ACCID));
      setUserCount(0);
    } else {
      return;
    }
  }, [userCount, nextProfile, currentProfile]);

  useEffect(() => {
    console.log('=================================');
    console.log('Users Status Code', usersStatusCode);
    console.log('=================================');
  }, [usersStatusCode]);

  // useEffect(() => {
  //   console.log(
  //     'Swipped Users',
  //     usersSwipped[usersSwipped.length - 1],
  //     usersSwipped.length,
  //   );
  //   MatchUser(usersSwipped[usersSwipped.length - 1]);
  // }, [usersSwipped]);

  // useEffect(() => {
  //   console.log(
  //     'Swipped Users Left',
  //     usersSwippedLeft,
  //     usersSwippedLeft.length,
  //   );
  //   RejectUser(usersSwippedLeft[usersSwippedLeft.length - 1]);
  // }, [usersSwippedLeft]);

  //   const UpdateChatIDInUserDoc = async (docId) => {
  //     try {
  //       await firestore().collection('Users').doc(me).update({
  //         inboxID: [docId]
  //       })
  //       console.log("-----Chat ID Updated-----")
  //     } catch (error) {
  //       console.log(error)
  //   }
  // }

  // ------------------- BACKEND APIS ---------------------

  const MatchModal = () => (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modal}>
        <Toast position="top" bottomOffset={20} />
        <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
          <Icon name="close" size={30} color={colorsobject.white} />
        </TouchableOpacity>
        <View style={styles.modalBody}>
          <Text style={styles.modalText}>Woohoo!🎉</Text>
          <Text style={styles.modalTextBig}>It's a Match!</Text>
          <View style={styles.modalImagesContainer}>
            <Image source={matchBG} style={styles.gradientBGImg} />
            <View style={styles.musicIconContainer}>
              <Image source={musicIcon} style={styles.musicIcon} />
            </View>
            <View style={[styles.modalImage, styles.userImg1]}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
                }}
                style={styles.userImage}
              />
            </View>
            <View style={[styles.modalImage, styles.userImg2]}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
                }}
                style={styles.userImage}
              />
            </View>
          </View>
          <Text style={styles.modalText}>
            You and
            {allUsers?.length > 0 &&
              allUsers?.map(
                user =>
                  user.id === usersSwipped[usersSwipped?.length - 1] &&
                  user.docData.fullName,
              )}
            have 7 days to make the first move
          </Text>
          <TouchableOpacity
            style={styles.sendMessageButton}
            activeOpacity={0.9}>
            <Text style={styles.sendMessageButtonText}>Inbox</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Toast position="bottom" bottomOffset={20} />
      <MatchModal />
      <View style={styles.cardContainer}>
        {allUsers?.length > 0 && nextProfile && (
          <Animated.View style={[styles.nextCardContainer, nextCardStyle]}>
            <ProfileCard id={nextProfile.id} data={nextProfile} />
          </Animated.View>
        )}
        {allUsers?.length > 0 && currentProfile ? (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.cardContainer, cardStyle]}>
              <Animated.Image
                source={like}
                style={[styles.like, {left: 10}, likeStyle]}
              />
              <Animated.Image
                source={dislike}
                style={[styles.like, {right: 10}, nopeStyle]}
              />
              <ProfileCard id={currentProfile.id} data={currentProfile} />
            </Animated.View>
          </PanGestureHandler>
        ) : (
          <>
            {usersStatusCode === 204 || allUsers?.length === 0 ? (
              <>
                <Text style={styles.noUsersText}>All Users Swiped</Text>
              </>
            ) : (
              <>
                <Text style={styles.noUsersText}>Loading...</Text>
                <ActivityIndicator size="large" color={colorsobject.white} />
              </>
            )}
          </>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

export default AnimatedStack;
