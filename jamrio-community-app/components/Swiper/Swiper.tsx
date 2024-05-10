import React, {useState, useRef, useEffect, useSele} from 'react';
import Swiper from 'react-native-deck-swiper';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import userdata from '../../assets/dummydata';
import LinearGradient from 'react-native-linear-gradient';

import IonIcon from 'react-native-vector-icons/Ionicons';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import axios from 'axios';
import store from '../../redux/store';
import {BASE_URL} from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BuyPremiumModal from '../BuyPremiumModal/BuyPremiumModal';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  GetAllProTags,
  GetAllUsers,
  MatchUser,
  RejectUser,
  showToastMessage,
} from '../../redux/actions/userActions';
import Modal from 'react-native-modal';
import Toast from '../Toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import matchBG from '../../assets/images/matchScreenBG.png';
import musicIcon from '../../assets/images/musicIcon.png';
import Playaudio from '../../screens/AudioRecorder/Playaudio';
import storage from '@react-native-firebase/storage';
import Video from 'react-native-video';
import {current} from '@reduxjs/toolkit';
import {withNavigationFocus} from 'react-navigation-is-focused-hoc';
import Nomoreusers from './Nomoreusers';

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const Example = ({active, videoPaused}) => {
  const [showToast, setShowToast] = useState(false);

  const showToastHandler = () => {
    setShowToast(true);
  };

  const hideToastHandler = () => {
    setShowToast(false);
  };
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [cards, setCards] = useState([...range(1, 50)]);
  const [cardLength, setCardLength] = useState(0);
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [otheruserdata, setOtherUserData] = useState<String[]>([]);
  const [ACCID, setACCID] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [audioExists, setAudioExists] = useState<boolean>(false);
  const [forceRender, setForceRender] = useState<boolean>(false);
  const [usersSwipped, setUsersSwipped] = useState<any>([]);
  const {
    accountId,
    user,
    swipe_count_reload,
    not_my_matches,
    match_success,
    reject_success,
    users_status_code,
    current_route,
    pause_video,
    all_tags,
  } = useSelector((state: any) => state.user);
  const [premiumModal, setPremiumModal] = useState(false);
  const [swipeCount, setSwipeCount] = useState(0);
  const [paused, setPaused] = useState(videoPaused);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardCount, setCardCount] = useState(0);

  const [videoVolume, setVideoVolume] = useState(1.0);
  const videoRef = useRef(null);

  useEffect(() => {
    console.log('match user on swiper', match_success);
    //Alert.alert('matched successfully'
    if (
      match_success?.status === 'matched' ||
      match_success?.status?.includes('matched') ||
      match_success?.status?.includes('Matched') ||
      match_success?.status?.includes('MATCHED')
    ) {
      console.log('matched from redux', match_success?.body);
      toggleModal();
      dispatch(
        showToastMessage(
          true,
          `Matched 🎉 You have matched with this user`,
          false,
        ),
      );
    }
  }, [match_success]);

  const swiperRef = useRef(null);
  const [profileAudio, setProfileAudio] = useState<any>({
    path: '',
    wave: [],
    recordSecs: 0,
  });
  const [getAudioError, setGetAudioError] = useState(false);

  useEffect(() => {
    getSwipeCount();
    console.log('CURRENT SCREEN', navigation);
    dispatch(GetAllProTags());
  }, []);

  useEffect(() => {
    console.log('================================');
    console.log('all tags', all_tags);
    console.log('================================');
  }, [all_tags]);

  useEffect(() => {
    getSwipeCount();
  }, [swipe_count_reload]);

  useEffect(() => {
    dispatch(GetAllUsers(user?.id));
  }, [user?.id]);

  useEffect(() => {
    setPaused(current_route === 'Match' ? false : true);
    console.log('current route', current_route);
  }, [current_route]);

  useEffect(() => {
    console.error('PAUSE VIDEO', pause_video);
  }, [pause_video]);

  // useFocusEffect(() => {
  //   setPaused(false);
  //   console.log('current route', current_route);
  // });

  useEffect(() => {
    // Alert.alert('rejected successfully')
    console.log('rejected worked successfully');
  }, [reject_success]);

  const getSwipeCount = async () => {
    const value = await AsyncStorage.getItem('swipeCount');
    // remove double quotes if any
    const swipe = value ? parseInt(value) : swipeCount;
    console.log('================================');
    console.log('swipe count in async', swipe);
    console.log('================================');
    return setSwipeCount(swipe || 0);
  };

  const saveSwipeCount = async () => {
    console.log('================================');
    console.log('Setting count', swipeCount);
    console.log('================================');
    if (swipeCount === 0) {
      AsyncStorage.setItem('swipeCount', JSON.stringify(0));
    } else {
      AsyncStorage.setItem('swipeCount', JSON.stringify(swipeCount));
    }
  };

  const [userGenres, setUserGenres] = useState<any>([
    // 'Singing',
    // 'Dansing',
    // 'Hip Hop',
  ]);

  useEffect(() => {
    console.log('================================');
    console.log('Not My Matches Fetched', not_my_matches);
    console.log('================================');
    setForceRender(prev => !prev);
    if (not_my_matches?.length > 0) {
      setOtherUserData((prev: any) => [...prev, ...not_my_matches]);
    }
    dispatch(GetAllProTags());
    // Check if not_my_matches is defined and has genres property
    if (not_my_matches && not_my_matches.genres) {
      setUserGenres(not_my_matches?.genres?.split(','));
      console.error(not_my_matches.genres.split(','));
    }

    if (not_my_matches === 204) {
      console.log('================================');
      console.log('Not My Matches Fetched', not_my_matches);
      console.log('================================');
      setSwipedAllCards(true);
    } else {
      setLoading(false);
      setSwipedAllCards(false);
    }
  }, [not_my_matches]);

  // useEffect(() => {
  //   if (loading) {
  //     dispatch(GetAllUsers(user?.id));
  //   }
  // }, [loading]);

  useEffect(() => {
    console.log('================================');
    console.error('other user data', otheruserdata);
    console.log('================================');
  }, [otheruserdata]);

  useEffect(() => {
    if (swipeCount >= 30) {
      setPremiumModal(true);
    }
    console.log('================================');
    console.log('swipe count', swipeCount);
    console.log('================================');
    saveSwipeCount();
  }, [swipeCount]);

  useEffect(() => {
    console.log('================================');
    console.log('cards swipped', cardCount);
    console.log('================================');

    if (cardCount === Math.floor(not_my_matches?.length / 2)) {
      dispatch(GetAllUsers(user?.id));
      setCardCount(0);
    }
  }, [cardCount]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    console.log('Modal Visible------', isModalVisible);
  };

  const MatchModal = () => (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
          <Icon name="close" size={20} color={colorsobject.white} />
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
                  uri: user?.profileImage,
                }}
                style={styles.userImage}
              />
            </View>
            <View style={[styles.modalImage, styles.userImg2]}>
              <Image
                source={{
                  uri: match_success?.body[0]?.profileImage,
                }}
                style={styles.userImage}
              />
            </View>
          </View>
          <Text style={styles.modalText}>
            You and{' '}
            {
              <Text style={{fontWeight: 'bold'}}>
                {match_success?.body[0]?.name}
              </Text>
            }{' '}
            have 7 days to make the first move
          </Text>
          <TouchableOpacity
            style={styles.sendMessageButton}
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('MessagesScreen');
              toggleModal();
            }}>
            <Text style={styles.sendMessageButtonText}>Inbox</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // useEffect(() => {
  //   if (
  //     otheruserdata &&
  //     otheruserdata[cardIndex]?.audio?.path === 'sound.mp4'
  //   ) {
  //     var path = otheruserdata[cardIndex]?.audio?.path;
  //     var wave = otheruserdata[cardIndex]?.audio?.wave;
  //     var recordSecs = otheruserdata[cardIndex]?.audio?.recordSecs;
  //     getAudio(otheruserdata[cardIndex]?.audio?.path);
  //     setAudioExists(true);
  //   } else {
  //     setProfileAudio({});
  //     setAudioExists(false);
  //   }
  // }, [swipeCount, otheruserdata, cardIndex]);

  // const getAudio = async (path, wave, recordSecs) => {
  //   try {
  //     console.log('DATA USER ID', otheruserdata[cardIndex]?.id);
  //     const newListRef = storage().ref(
  //       `profileAudios/${otheruserdata[cardIndex]?.id}/` + path,
  //     );
  //     // const newListRef = storage().ref(`profileAudios/e40a2358-f3a8-4b5e-b0d7-ebc249e838fa/sound.mp4`);
  //     console.log('NEW LIST REF', newListRef);
  //     const url = await newListRef.getDownloadURL().then(url => {
  //       console.log('URL ----->', url);
  //       return url;
  //     });
  //     console.log('Audio URL ----->', url);
  //     setProfileAudio({
  //       path: url,
  //       wave: otheruserdata[cardIndex]?.audio?.wave?.split(',').map(Number),
  //       recordSecs: otheruserdata[cardIndex]?.audio?.recordSecs,
  //     });
  //     setGetAudioError(false);
  //     setForceRender(prev => !prev);
  //     console.error('audio fetched successfully');
  //   } catch (error) {
  //     console.error(error);
  //     console.log('AUDIO FETCH FROM FIREBASE ERROR---->', error);
  //     setGetAudioError(true);
  //   }
  // };

  // useEffect(() => {
  //   console.log('Profile audio', profileAudio);
  // }, [profileAudio]);

  useEffect(() => {
    console.log('================================');
    console.log('Video Muted', muted);
    console.log('================================');
  }, [muted]);

  const onSwiped = type => {
    setForceRender(prev => !prev);
    setCardIndex(cardIndex + 1);
    setAudioExists(false);
    console.log(`on swiped ${type}`);
  };

  const onSwipedAllCards = () => {
    if (not_my_matches?.length > 0) {
      setOtherUserData((prev: any) => [...prev, ...not_my_matches]);
    }
    setLoading(true);
  };

  const toggleMute = () => {
    setMuted((prev: boolean) => !prev);
  };

  // const swipeLeft = () => {
  //   console.log('match')
  // };
  const renderCard = (card, index) => {
    console.log('card index: ------------', index, cardIndex);
    console.log('CARD VIDEOS ----------->', card);

    // if (card?.id) {
    return (
      <View style={[styles.card, {backgroundColor: 'black'}]}>
        {/* <View
            style={{
              borderRadius: responsiveWidth(20),
              top: responsiveWidth(3),
              height: responsiveHeight(5),
              alignItems: 'center',
              right: responsiveWidth(3),
              backgroundColor: colorsobject.white,
              justifyContent: 'center',
              position: 'absolute',
              zIndex: 50,
            }}> */}
        {card?.tag && (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colorsobject.secondarycolor, colorsobject.themecolor]}
            style={{
              borderRadius: responsiveWidth(20),
              top: responsiveWidth(3),
              height: responsiveHeight(5),
              alignItems: 'center',
              right: responsiveWidth(3),
              backgroundColor: colorsobject.white,
              justifyContent: 'center',
              position: 'absolute',
              zIndex: 50,
            }}>
            <Text
              style={{
                color: colorsobject.black,
                fontWeight: '400',
                paddingHorizontal: responsiveWidth(6),
                fontSize: responsiveFontSize(2),
              }}>
              {card?.tag ? (
                card?.tag
              ) : (
                <ActivityIndicator color={colorsobject.white} />
              )}
            </Text>
          </LinearGradient>
        )}
        {/* </View> */}
        {cardIndex === index && card?.primaryvideo?.filekey ? (
          <View
            style={{
              backgroundColor: '#111',
              height: '100%',
              width: responsiveWidth(90),
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10,
            }}
            key={index}>
            <Video
              key={index}
              source={{
                uri: card?.card?.primaryvideo?.filekey
                  ? `https://jamrio-video.blr1.digitaloceanspaces.com/${card?.primaryvideo?.filekey}`
                  : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              }}
              onBuffer={b => {
                console.log('buffering', b);
              }}
              onError={e => console.log('error', e)}
              style={{
                height: '100%',
                width: '100%',
              }}
              paused={pause_video}
              muted={true}
              volume={muted ? 0.0 : 1.0}
              onLoadStart={() => console.log('load start')}
              onLoad={() => console.log('load')}
              onEnd={() => console.log('end')}
              posterResizeMode="contain"
              poster="https://icon-library.com/images/play-icon-white-png/play-icon-white-png-4.jpg"
              repeat={true}
              playInBackground={false}
              playWhenInactive={false}
            />
          </View>
        ) : (
          <Image
            source={{
              uri:
                card?.profileImage === null ||
                card?.profileImage === '' ||
                card?.profileImage === undefined
                  ? 'https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg'
                  : card.profileImage,
            }}
            style={{height: '100%', width: '100%', resizeMode: 'cover'}}
          />
        )}
        {/* {console.error('VIDEO PAUSED ---------------------------', pause_video)} */}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} // Define the gradient colors (from transparent to semi-transparent black)
          style={[styles.gradient]} // Apply the gradient style
        >
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
              marginBottom: responsiveHeight(6),
            }}>
            {/* <TouchableOpacity
                style={[styles.cardButtons, {position: 'absolute', right: 4}]}
                onPress={toggleMute}>
                <Image
                  source={require('../../assets/images/mute.png')}
                  style={{
                    height: responsiveWidth(6),
                    width: responsiveWidth(6),
                    tintColor: muted
                      ? colorsobject.themecolor
                      : colorsobject.white,
                  }}
                />
              </TouchableOpacity> */}
            <Text
              style={{
                color: colorsobject.white,
                fontSize: responsiveFontSize(3),
                fontWeight: '500',
                opacity: 0.8,
              }}>
              {card?.name}
            </Text>
            {/* <View style={styles.location}> */}
            {/* <IonIcon
                  name="location-outline"
                  size={16}
                  color={colorsobject.white}
                /> */}
            {/* <Text style={styles.locationText}>{card?.city}</Text> */}

            {/* <Text style={styles.locationText}>Shoutout:- {card?.shoutout}</Text> */}
            <Text style={styles.ShoutoutText}>Shoutout:- {card?.shoutout}</Text>
            {/* </View> */}

            <View style={[styles.genresContainer]}>
              <ScrollView
                horizontal={true}
                style={styles.genresScrollContainer}>
                {
                  card?.genres?.split(',').length > 0 &&
                    card?.genres?.split(',').map(genre => (
                      <>
                        {genre !== '' && (
                          <View style={styles.genreContainer}>
                            <Text style={styles.genreText}>{genre}</Text>
                          </View>
                        )}
                      </>
                    ))

                  // <Text style={styles.genreText}>Loading...</Text>
                }
              </ScrollView>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                alignSelf: 'center',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.cardButtons}
                onPress={() => {
                  swiperRef.current.swipeLeft();
                  // dispatch(RejectUser(user?.id, otheruserdata[cardIndex]?.id));
                  // console.log('swipe left', swipeCount);
                  // setSwipeCount(swipeCount + 1);
                  console.log('nope');
                }}>
                <Image
                  source={require('../../assets/images/cancel.png')}
                  style={{
                    height: responsiveWidth(7),
                    width: responsiveWidth(7),
                    tintColor: colorsobject.themecolor,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: colorsobject.themecolor,
                  width: responsiveWidth(18),
                  height: responsiveWidth(18),
                  borderRadius: responsiveWidth(9),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('OtherUserProfile', {
                    uid: otheruserdata[cardIndex]?.id,
                  });
                }}>
                <Image
                  source={require('../../assets/images/profile-filled.png')}
                  style={{
                    height: responsiveWidth(8),
                    width: responsiveWidth(8),
                    tintColor: colorsobject.white,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardButtons}
                onPress={() => {
                  swiperRef.current.swipeRight();
                  // dispatch(MatchUser(user?.id, otheruserdata[cardIndex]?.id));
                  // setUsersSwipped(prev => [
                  //   ...prev,
                  //   {
                  //     uid: otheruserdata[cardIndex]?.id,
                  //     uname: otheruserdata[cardIndex]?.username,
                  //   },
                  // ]);
                  // setSwipeCount(swipeCount + 1);
                  // console.log('swipe right', swipeCount);
                  // console.log('api called 1', otheruserdata[cardIndex]?.id);
                  // console.log('api called', user?.id);
                }}>
                <Image
                  source={require('../../assets/images/heart-filled.png')}
                  style={{
                    height: responsiveWidth(6),
                    width: responsiveWidth(6),
                    tintColor: colorsobject.themecolor,
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* {audioExists &&
                profileAudio?.path !== '' &&
                profileAudio?.wave &&
                profileAudio?.wave.length !== 0 &&
                profileAudio?.recordSecs !== 0 && (
                  <Playaudio profileAudio={profileAudio} />
                )} */}
          </View>
        </LinearGradient>
      </View>
    );
    // }
  };

  return (
    <View style={{flex: 1, backgroundColor: colorsobject.darkgrey}}>
      <MatchModal />
      {/* {premiumModal && (
        <BuyPremiumModal
          setPremiumModal={setPremiumModal}
          premiumModal={premiumModal}
        />
      )} */}

      {otheruserdata?.length > 0 && !pause_video ? (
        <Swiper
          ref={swiperRef}
          key={otheruserdata?.length}
          onSwiped={() => {
            onSwiped('general');
          }}
          onSwipedLeft={() => {
            dispatch(RejectUser(user?.id, otheruserdata[cardIndex]?.id));
            console.log('swipe left', swipeCount);
            setSwipeCount(swipeCount + 1);
            console.log('nope');
            setCardCount(cardCount + 1);
          }}
          onSwipedRight={() => {
            dispatch(MatchUser(user?.id, otheruserdata[cardIndex]?.id));
            setUsersSwipped(prev => [
              ...prev,
              {
                uid: otheruserdata[cardIndex]?.id,
                uname: otheruserdata[cardIndex]?.username,
              },
            ]);
            setSwipeCount(swipeCount + 1);
            console.log('swipe right', swipeCount);
            console.log('api called 1', otheruserdata[cardIndex]?.id);
            console.log('api called', user?.id);
            setCardCount(cardCount + 1);
          }}
          onTapCard={() =>
            navigation.navigate('OtherUserProfile', {
              uid: otheruserdata[cardIndex]?.id,
            })
          }
          // horizontalSwipe={swipeCount < 30 ? true : false}
          verticalSwipe={false}
          cards={otheruserdata}
          cardStyle={{paddingRight: 25}}
          containerStyle={{
            backgroundColor: colorsobject.darkgrey,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
          }}
          cardIndex={cardIndex}
          cardVerticalMargin={20}
          marginBottom={40}
          renderCard={renderCard}
          onSwipedAll={onSwipedAllCards}
          stackSize={2}
          stackSeparation={15}
          overlayLabels={{
            bottom: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: colorsobject.lightred,
                  color: 'white',
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                },
              },
            },
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: colorsobject.lightred,
                  color: 'white',
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: colorsobject.lightgreen,
                  color: 'white',
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
            top: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: colorsobject.lightgreen,
                  color: 'white',
                  fontSize: 24,
                  marginBottom: 30,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                },
              },
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard>
          {/* <Button onPress={() => swiperRef.current.swipeBack()} title="Swipe Back" /> */}
        </Swiper>
      ) : (
        // <View
        //   style={{
        //     flex: 1,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     backgroundColor: colorsobject.darkgrey,
        //   }}>
        //   <Text
        //     style={{
        //       color: colorsobject.white,
        //       fontSize: 20,
        //       textAlign: 'center',
        //     }}>
        //     No more users to swipe
        //   </Text>
        // </View>
        <Nomoreusers />
      )}
    </View>
  );
};

export default withNavigationFocus(Example);

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    borderRadius: 30,
    backgroundColor: colorsobject.magenta,
    overflow: 'hidden',
    width: responsiveWidth(90),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // This will make the gradient cover the entire card
    justifyContent: 'flex-end',
    top: '50%',
    zIndex: 30,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    backgroundColor: 'transparent',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    color: colorsobject.white,
    fontSize: 16,
    marginLeft: 5,
  },
  ShoutoutText: {
    color: colorsobject.white,
    fontSize: responsiveFontSize(2),
    marginVertical: responsiveHeight(1.2),
    opacity: 0.8,
    fontWeight: '400',
  },
  modal: {
    flex: 1,
    backgroundColor: colorsobject.darkgrey,
    borderRadius: 30,
  },

  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 10,
    backgroundColor: colorsobject.black,
    padding: 5,
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },

  modalImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  modalBody: {
    height: '100%',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: colorsobject.white,
  },

  modalTextBig: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 5,
    color: colorsobject.white,
    fontWeight: 'bold',
  },
  gradientBGImg: {
    width: 300,
    height: 300,
    position: 'absolute',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -2,
  },
  musicIconContainer: {
    width: 50,
    height: 50,
    position: 'absolute',
    // overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: colorsobject.lightpink,
    borderWidth: 2,
    borderColor: colorsobject.white,
    borderRadius: 50,
    top: 90,
  },
  musicIcon: {
    width: 60,
    height: 60,
  },

  modalImage: {
    width: 130,
    height: 130,
    borderRadius: 20,
    margin: 10,
    padding: 5,
    backgroundColor: colorsobject.white,
    elevation: 5,
    shadowColor: colorsobject.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },

  userImg1: {
    transform: [{rotate: '-20deg'}],
    marginRight: -20,
  },

  userImg2: {
    transform: [{rotate: '20deg'}],
    zIndex: -1,
  },
  sendMessageButton: {
    // width: '100%',
    height: 50,
    // backgroundColor: '#FF6584',
    backgroundColor: colorsobject.pink,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 20,
    paddingHorizontal: 30,
  },

  sendMessageButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: colorsobject.white,
  },

  genresContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginBottom: responsiveHeight(3),
  },
  genresScrollContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  genreContainer: {
    borderRadius: 6,
    paddingHorizontal: responsiveWidth(1.2),
    height: responsiveHeight(3.4),
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: colorsobject.genresbackground,
    justifyContent: 'center',
  },
  genreText: {
    color: colorsobject.themecolor,
    fontWeight: '500',
    padding: responsiveWidth(1),
    fontSize: responsiveFontSize(1.5),
  },
  cardButtons: {
    backgroundColor: colorsobject.genresbackground,
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
