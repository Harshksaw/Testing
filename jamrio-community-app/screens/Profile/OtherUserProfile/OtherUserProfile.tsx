import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetOtherUserDetails,
  MatchUser,
  storeAccountId,
  storeUserDetails,
  storeUserId,
} from '../../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import AntIcons from 'react-native-vector-icons/AntDesign';
import addUserImg from '../../../assets/images/addUserImg.png';
import Playaudio from '../../AudioRecorder/Playaudio';
import {BASE_URL, TOKEN} from '../../../redux/store';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {colorsobject} from '../../../assets/ProjectColors/Colorsobject';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SimpleLIneIcon from 'react-native-vector-icons/SimpleLineIcons';

const YouTubeVideo = () => {
  const videoId = '4Rll-_e9-0M';

  return (
    <View style={{flex: 1}}>
      <YoutubePlayer height={300} play={false} videoId={videoId} />
    </View>
  );
};

const OtherUserProfile = ({navigation, route}) => {
  const {uid} = route.params;
  const {user, other_user_details, all_tags} = useSelector(
    (state: any) => state.user,
  );
  const [data, setData] = useState<any>({});
  const dispatch = useDispatch();
  const [userGenres, setUserGenres] = useState<any>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    setData({});
    dispatch(GetOtherUserDetails(uid));
  }, [uid]);

  useEffect(() => {
    console.log('USER FROM REDUX', user);
  }, [user]);

  useEffect(() => {
    if (other_user_details) {
      console.log(
        'OTHER USER DETAILS on Other user screen',
        other_user_details,
      );
      setData(other_user_details[0]);
    } else {
      setData({});
    }
  }, [other_user_details]);

  useEffect(() => {
    console.warn('USER DETAILS ON EDIT PROFILE', user);
    console.log('USER GENRES', user?.genres);
    setUserGenres(data?.genres?.split(','));
  }, [data]);

  const RenderGridItem = ({video, index}) => {
    return (
      <View
        style={{
          position: 'relative',
          width: responsiveWidth(31),
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
          }}
          key={index}
          onPress={() => {
            console.log('Selected INDEX', index);
            navigation.navigate('Separate_video', {
              videodata: data?.videos,
              index: index,
            });
          }}>
          <Image
            key={index}
            source={{
              uri: 'https://www.freepnglogos.com/uploads/play-button-png/index-media-cover-art-play-button-overlay-5.png',
            }}
            style={{
              width: '95%',
              // marginHorizontal: responsiveWidth(1),
              marginVertical: responsiveHeight(0.4),
              // marginLeft: index === 1 ? responsiveWidth(3) : null,
              height: responsiveHeight(30),
              backgroundColor: colorsobject.selectvideocolor,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: colorsobject.grey,
              borderWidth: 0.5,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const BlockUser = async () => {
    try {
      const response = await axios.post(
        // `${BASE_URL}/appaccount/allmymatchs/${user?.id}/matched`,
        `${BASE_URL}/block`,
        {
          userid: user?.id,
          blockedusersid: data?.id,
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
        Toast.show({
          type: 'success',
          text1: `User Blocked Successfully!`,
          visibilityTime: 3000,
          autoHide: true,
        });
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
        Toast.show({
          type: 'error',
          text1:
            error?.response?.data?.message ||
            'Something went wrong' + error.response.status,
          visibilityTime: 3000,
          autoHide: true,
        });
        console.log('User Block ERROR', error.response?.data?.message);
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
              Are you sure you want to Block {data?.name}?
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
                  BlockUser();
                }}>
                <Text style={styles.modalBtnText}>Block</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.fullscreen}>
      <DeleteModal />
      <View style={styles.profileHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            setData({});
          }}
          style={{
            width: '10%',
            backgroundColor: colorsobject.black,
          }}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/100/FFFFFF/left.png',
            }}
            style={styles.arrow}
          />
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
      {data ? (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Toast position="top" bottomOffset={20} />
          <View style={styles.profileContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}>
              {/* Image */}
              <View style={[styles.profileImageContainer, {width: '38%'}]}>
                {/* Show play pause icon */}
                <Image
                  source={{
                    uri:
                      data?.profileImage ||
                      'https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg',
                  }}
                  style={styles.profileImage}
                />
              </View>
              {/* Add Button */}
              {/* <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.9}
            onPress={() => dispatch(MatchUser(user?.id, data?.id))}>
            <Image source={addUserImg} style={styles.addBtnImg} />
          </TouchableOpacity> */}
              {/* Details */}
              <View style={[styles.profileDetailsContainer, {width: '62%'}]}>
                <Text style={styles.profileDetailsName}>
                  {data?.name || 'Loading...'}
                  {/* ,{' '}
                {moment().diff(data?.birthdate, 'years').toString()} */}
                </Text>

                <Text style={styles.username}>
                  @{data?.username ? data?.username : 'Loading...'}
                </Text>
                <View style={styles.locationContainer}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/fluency-systems-regular/48/FFFFFF/marker--v1.png',
                    }}
                    style={[
                      styles.locationIcon,
                      {tintColor: colorsobject.themecolor},
                    ]}
                  />

                  <Text style={styles.profileDetailsTextBig}>
                    {data?.city ? data?.city : '-'}
                  </Text>
                </View>

                {data?.tag && (
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={[
                      colorsobject.secondarycolor,
                      colorsobject.themecolor,
                    ]}
                    style={{
                      borderRadius: responsiveWidth(3),
                      height: responsiveHeight(6),
                      width: responsiveWidth(50),
                      alignItems: 'center',
                      backgroundColor: colorsobject.white,
                      justifyContent: 'center',
                      zIndex: 50,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        color: colorsobject.black,
                        fontWeight: '400',
                        paddingHorizontal: responsiveWidth(6),
                        fontSize: responsiveFontSize(2),
                      }}>
                      {data?.tag}
                    </Text>
                  </LinearGradient>
                )}
                <TouchableOpacity
                  style={{
                    borderRadius: responsiveWidth(3),
                    height: responsiveHeight(5),
                    width: responsiveWidth(50),
                    alignItems: 'center',
                    backgroundColor: colorsobject.white,
                    justifyContent: 'center',
                    zIndex: 50,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: colorsobject.black,
                      fontWeight: '400',
                      paddingHorizontal: responsiveWidth(6),
                      fontSize: responsiveFontSize(2),
                    }}>
                    MATCH
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.shoutoutMainContainer}>
              <Text style={styles.shoutoutTitle}>Shoutouts</Text>
              <View
                style={{
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '97%',

                  borderRadius: 20,
                }}>
                <Image
                  source={require('../../../assets/images/Shoutout.jpg')}
                  style={styles.shoutoutContainer}
                />

                <Image
                  source={{
                    uri: 'https://img.icons8.com/material-rounded/48/FFFFFF/quote-left.png',
                  }}
                  style={styles.quotes1}
                />
                <Text style={[styles.shoutoutTextabsolute]}>
                  {data?.shoutout ? data?.shoutout : 'Not Added'}
                </Text>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/material-rounded/48/FFFFFF/quote-right.png',
                  }}
                  style={styles.quotes2}
                />
              </View>
            </View>
            {/* About */}
            <View
              style={[
                styles.shoutoutMainContainer,
                {
                  borderRadius: 15,
                },
              ]}>
              <Text style={styles.shoutoutTitle}>About</Text>
              <View style={styles.linesep}></View>
              <Text style={styles.shoutoutText}>
                {data?.about ? data?.about : 'Not Added'}
              </Text>
            </View>
            <View style={styles.shoutoutMainContainer}>
              <Text style={styles.shoutoutTitle}>Talents</Text>
              <View style={styles.linesep}></View>
              <View style={styles.genresContainer}>
                <ScrollView
                  horizontal={true}
                  style={styles.genresScrollContainer}>
                  {
                    userGenres?.length > 0 &&
                      userGenres?.map(genre => (
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
            </View>
            {/* Shoutout */}

            {/* {!getAudioError && profileAudio && (
          <Playaudio profileAudio={profileAudio} />
        )} */}
            {/* Socials */}
            <View style={styles.shoutoutMainContainer}>
              <Text style={styles.shoutoutTitle}>Connect with me</Text>
              <View style={styles.linesep}></View>
              {/* {data?.youtube && <YouTubeVideo />} */}
              <View style={styles.socialsContainer}>
                {data?.instagram && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => Linking.openURL(data?.instagram)}
                    style={styles.iconcontainer}>
                    <Image
                      source={require('../../../assets/images/instagram.png')}
                      style={styles.socialsIcon}
                    />
                  </TouchableOpacity>
                )}

                {data?.spotify && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => Linking.openURL(data?.spotify)}
                    style={styles.iconcontainer}>
                    <Image
                      source={require('../../../assets/images/spotify.png')}
                      style={styles.socialsIcon}
                    />
                  </TouchableOpacity>
                )}
                {data?.youtube && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => Linking.openURL(data?.youtube)}
                    style={styles.iconcontainer}>
                    <Image
                      source={require('../../../assets/images/youtube.png')}
                      style={styles.socialsIcon}
                    />
                  </TouchableOpacity>
                )}
                {data?.instagram === '' &&
                  data?.spotify === '' &&
                  data?.youtube === '' && (
                    <Text style={styles.aboutText}>No socials added yet</Text>
                  )}
              </View>
            </View>

            <Text style={[styles.shoutoutTitle, {marginTop: 0}]}>Uploads</Text>
            <View style={styles.linesep}></View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                borderWidth: 1,
                paddingVertical: 10,
                width: responsiveWidth(100) - 20,
                height: '100%',
              }}>
              {data?.videos?.length > 0 &&
                data?.videos?.map((video, index) => (
                  <RenderGridItem video={video} index={index} />
                ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator
          size="large"
          color={colorsobject.white}
          style={{marginTop: 20}}
        />
      )}
    </View>
  );
};

export default OtherUserProfile;
