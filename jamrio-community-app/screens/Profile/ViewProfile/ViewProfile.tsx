import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  NativeModules,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  DeleteVideo,
  GetAllProTags,
  GetAllVideos,
  UploadVideo,
  storeAccountId,
  storeUserDetails,
  storeUserId,
  showToastMessage,
  PrimaryVideo,
} from '../../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import {BASE_URL, TEST_URL, TOKEN} from '../../../redux/store';
import {colorsobject} from '../../../assets/ProjectColors/Colorsobject';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {RFValue} from 'react-native-responsive-fontsize';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {createThumbnail} from 'react-native-create-thumbnail';

const ViewProfile = ({navigation}) => {
  const {user, delete_video, primary_video} = useSelector(
    (state: any) => state.user,
  );
  const dispatch = useDispatch();

  const [userGenres, setUserGenres] = useState<any>([]);
  const [deviceToken, setDeviceToken] = useState<string | null>(null);
  const [deviceTokensFromDB, setDeviceTokensFromDB] = useState<string | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenPrimary, setModalOpenPrimary] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [selectedVideos, setselectedVideos] = useState([1]);
  const [videoClicked, setVideoClicked] = useState<any>();

  useEffect(() => {
    getDeviceToken();
    FetchUserTokens();
    dispatch(GetAllProTags(getAccessToken()));

    setModalOpenPrimary(false);
    setModalOpenDelete(false);
    setModalOpen(false);
  }, []);

  useEffect(() => {
    // delete_video contains the ID of the deleted video
    // close modal whever delete_video changes
    setModalOpen(false);
    setModalOpenDelete(false);
    setModalOpenPrimary(false);
  }, [delete_video]);

  useEffect(() => {
    // delete_video contains the ID of the deleted video
    // close modal whever delete_video changes
    setModalOpenPrimary(false);
    setModalOpenDelete(false);
  }, [primary_video]);

  useEffect(() => {
    console.log('USER FROM REDUX in View Profile', user);
  }, [user]);

  // Get user profile image from firebase storage
  useEffect(() => {
    console.warn('USER IN VIEW PROFILE FOR TESTING ---------------->', user);
    setUserGenres(user?.genres?.split(','));
  }, [user]);

  useEffect(() => {
    console.log('DEVICE TOKENS FROM DB', deviceTokensFromDB);
  }, [deviceTokensFromDB]);

  useEffect(() => {
    console.log('SELECTED VIDEOS', selectedVideos);
  }, [selectedVideos]);

  const getDeviceToken = async () => {
    const token = await AsyncStorage.getItem('deviceToken');
    setDeviceToken(token);
  };

  const getAccessToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    console.log('TOKEN in VIEW Profile', token);
    return token;
  };

  // Delete device token from database

  const FetchUserTokens = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/notification/getTokens/${user?.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN?._j,
          },
        },
      );

      if (response?.status === 200) {
        console.log('RESPONSE GET TOKEN ------>', response?.data);
        console.log('TOKEN FETCHED SUCCESSFULLY');
        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `success`, false));
      }
      if (response?.data) {
        console.log('DEVICE TOKEN FOUND IN DB');
        const tokens = response?.data?.map((item: any) => item?.fcmToken);
        setDeviceTokensFromDB(tokens);
        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `success`, false));
      } else {
        //Alert.alert(`${response?.data}`);
        console.log('DEVICE TOKEN NOT FOUND IN DB');
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected token status :` + response.status,
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
      //Alert.alert(`${err}`)
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
      console.log('TOKEN FETCHING ERR ______', error);
    }
  };

  const generateVideoThumbnail = async video => {
    try {
      const thumbnail = await createThumbnail({
        url: `https://jamrio-video.blr1.digitaloceanspaces.com/${video}`,
        timeStamp: 1000,
      });
      console.log('THUMBNAIL ----------------->', thumbnail);
      return thumbnail;
    } catch (error) {
      console.log('THUMBNAIL ERROR', error);
    }
  };

  // Sign out user, remove user id from async storage and redux and redirect to login screen

  const handleselectvideo = () => {
    navigation.navigate('UploadVideo');
  };

  const DeleteModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpenDelete}
        style={{
          flex: 1,
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalInnerView}>
            <Text style={styles.modalText}>
              Are you sure you want to Delete {videoClicked?.title}?{' '}
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
                  setModalOpenDelete(false);
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
                  dispatch(DeleteVideo(videoClicked?.id, user?.id));
                }}>
                <Text style={styles.modalBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const PrimaryModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpenPrimary}
        style={{
          flex: 1,
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalInnerView}>
            <Text style={styles.modalText}>
              Are you sure you want to make {videoClicked?.title} as your
              primary video?{' '}
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
                  setModalOpenPrimary(false);
                }}>
                <Text
                  style={{
                    color: colorsobject.themecolor,
                    fontSize: 16,
                  }}
                  onPress={() => setModalOpenPrimary(false)}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  dispatch(PrimaryVideo(videoClicked?.id, user?.id));
                }}>
                <Text style={styles.modalBtnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const VideoActionModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        // onRequestClose={() => {
        //   //Alert.alert("Modal has been closed.");
        //   setModalVisible(false);
        // }}
        style={{
          flex: 1,
        }}>
        <View style={styles.modalView}>
          <View style={[styles.modalInnerView]}>
            <View
              style={[
                styles.modalBtnContainer,
                {
                  paddingHorizontal: 10,
                },
              ]}>
              <TouchableOpacity
                style={styles.primaryVidBtn}
                onPress={() => {
                  console.log('Primary video selected', videoClicked);
                  setModalOpen(false);
                  setModalOpenPrimary(true);
                }}
                activeOpacity={0.8}>
                <Text style={styles.primaryVidText}>Primary Video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteVidBtn}
                onPress={() => {
                  console.log('DELETE Selected INDEX');
                  setModalOpen(false);
                  setModalOpenDelete(true);
                }}
                activeOpacity={0.8}>
                <Text style={styles.deleteVidText}>Delete Video</Text>
              </TouchableOpacity>
            </View>

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
                  setModalOpen(false);
                }}>
                <Text
                  style={{
                    color: colorsobject.themecolor,
                    fontSize: 16,
                  }}
                  onPress={() => setModalOpenPrimary(false)}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const RenderGridItem = ({video, index}) => {
    console.log('VIDEO RENDERER ------------------>', video);

    // const [thumbnail, setThumbnail] = useState(null);

    // useEffect(() => {
    //   const generateThumbnail = async () => {
    //     try {
    //       const thumbnailResult = await generateVideoThumbnail(video?.filekey);

    //       if (!thumbnailResult || !thumbnailResult.path) {
    //         console.warn('Thumbnail not available for video:', video);
    //         return;
    //       }

    //       setThumbnail(thumbnailResult.path);
    //     } catch (error) {
    //       console.error('Error generating thumbnail:', error);
    //     }
    //   };

    //   generateThumbnail();
    // }, [video?.filekey]);

    // if (!thumbnail) {
    //   return null; // or render a placeholder or loading state
    // }

    return (
      <View
        style={{
          position: 'relative',
          width: responsiveWidth(31),
        }}>
        {user?.primaryvideo?.filekey === video?.filekey && (
          <View
            style={{
              backgroundColor: colorsobject.white,
              width: responsiveWidth(10),
              height: responsiveWidth(10),
              position: 'absolute',
              top: -5,
              right: 3,
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: responsiveWidth(5),
            }}>
            <AntDesignIcons name="star" size={20} color={colorsobject.orange} />
          </View>
        )}
        <TouchableOpacity
          style={{
            width: '100%',
          }}
          key={index}
          onPress={() => {
            console.log('Selected INDEX', index);
            navigation.navigate('Separate_video', {
              videodata: selectedVideos,
              index: index,
            });
          }}
          onLongPress={() => {
            console.log('LONG PRESS', video);
            setVideoClicked(video);
            setModalOpen(true);
          }}>
          <Image
            key={index}
            source={{
              uri: 'https://freepngimg.com/thumb/play_button/25569-6-play-button-transparent-thumb.png',
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <DeleteModal />
      <PrimaryModal />
      <VideoActionModal />
      <View style={styles.profileContainer}>
        {/* Image */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={[styles.profileImageContainer, {width: '40%'}]}>
            <Image
              source={{
                uri:
                  user?.profileImage ||
                  'https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg',
              }}
              style={styles.profileImage}
            />
          </View>
          {/* Details */}
          <View style={[styles.profileDetailsContainer, {width: '62%'}]}>
            <Text style={styles.profileDetailsName}>{user?.name || '-'}</Text>

            <Text style={styles.username}>
              @{user?.username ? user?.username : '-'}
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
                {user?.city ? user?.city : '-'}
              </Text>
            </View>

            {user?.tag && (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[colorsobject.secondarycolor, colorsobject.themecolor]}
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
                  {user?.tag}
                </Text>
              </LinearGradient>
            )}
          </View>
        </View>

        {/* Shoutout */}
        <View style={[styles.shoutoutMainContainer]}>
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
              {user?.shoutout
                ? user?.shoutout
                : 'Add a shoutout to your profile! Visit edit profile section to add one.'}
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

          {/* <View style={styles.aboutContainer}> */}
          <Text style={styles.shoutoutText}>
            {user?.about
              ? user?.about
              : 'Add a few lines about yourself! Visit edit profile section to add one.'}
          </Text>
          {/* </View> */}
        </View>
        <View style={styles.shoutoutMainContainer}>
          <Text style={styles.shoutoutTitle}>Talents</Text>
          <View style={styles.linesep}></View>

          <View style={styles.genresContainer}>
            <ScrollView horizontal={true} style={styles.genresScrollContainer}>
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
        {/* Socials */}
        <View style={styles.shoutoutMainContainer}>
          <Text style={styles.shoutoutTitle}>Connect with me</Text>
          <View style={styles.linesep}></View>

          <View style={styles.socialsContainer}>
            {user?.instagram && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Linking.openURL(user?.instagram)}
                style={styles.iconcontainer}>
                <Image
                  source={require('../../../assets/images/instagram.png')}
                  style={styles.socialsIcon}
                />
              </TouchableOpacity>
            )}

            {user?.spotify && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Linking.openURL(user?.spotify)}
                style={styles.iconcontainer}>
                <Image
                  source={require('../../../assets/images/spotify.png')}
                  style={styles.socialsIcon}
                />
              </TouchableOpacity>
            )}
            {user?.youtube && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Linking.openURL(user?.youtube)}
                style={styles.iconcontainer}>
                <Image
                  source={require('../../../assets/images/youtube.png')}
                  style={styles.socialsIcon}
                />
              </TouchableOpacity>
            )}
            {user?.instagram === '' &&
              user?.spotify === '' &&
              user?.youtube === '' && (
                <Text style={styles.aboutText}>No socials added yet</Text>
              )}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={[styles.shoutoutTitle, {marginTop: 0}]}>Uploads</Text>
          <SimpleLineIcons name="options-vertical" size={15} color="white" />
        </View>
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
          <TouchableOpacity
            onPress={handleselectvideo}
            style={{width: responsiveWidth(31)}}>
            <View
              style={{
                width: '95%',
                height: responsiveHeight(30),
                backgroundColor: colorsobject.selectvideocolor,
                justifyContent: 'center',
                alignItems: 'center',

                borderColor: colorsobject.white,
                borderWidth: 0.5,
                marginVertical: responsiveHeight(0.4),
              }}>
              <Image
                source={require('../../../assets/images/plus.png')}
                style={{height: responsiveHeight(5), aspectRatio: 1}}
              />
              <Text
                style={{
                  color: colorsobject.white,
                  fontWeight: '700',
                  marginTop: responsiveHeight(3),
                  fontSize: RFValue(12),
                  marginHorizontal: 7,
                }}>
                Post a Video
              </Text>
            </View>
          </TouchableOpacity>
          {user?.videos?.length > 0 &&
            user?.videos?.map(
              (video, index) =>
                <RenderGridItem video={video} index={index} /> || (
                  <ActivityIndicator
                    size="large"
                    color={colorsobject.primary}
                  />
                ),
            )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewProfile;
