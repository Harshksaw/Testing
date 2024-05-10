import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {colorsobject} from '../../../assets/ProjectColors/Colorsobject';
import Video from 'react-native-video';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL, TEST_URL} from '../../../redux/store';
import Toast from '../../../components/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetAllVideos,
  showToastMessage,
} from '../../../redux/actions/userActions';

const UploadVideo = () => {
  const {toast_message} = useSelector((state: any) => state.user);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(true);
  const [message, setMessage] = useState('hiii');

  useEffect(() => {
    if (toast_message?.visible) {
      showToastHandler(
        toast_message.visible,
        toast_message.message,
        toast_message.error,
      );
    }
    // else {
    //   setShowToast(false);
    // }
  }, [toast_message]);

  const showToastHandler = (visible, message, error) => {
    setShowToast(visible);
    setMessage(message);
    setError(error);
  };

  const hideToastHandler = () => {
    setShowToast(false);
  };
  const {user} = useSelector((state: any) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isVideoSelected, setIsvideoSelected] = useState(false);
  const [videoFile, setVideoFile] = useState();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const videoDurationLimit = 1200;

  const opengallery = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        quality: 1,
        maxWidth: 0,
        maxHeight: 0, // Set duration limit to 1200 seconds (20 minutes)
        includeBase64: false,
        selectionLimit: 20,
        allowsEditing: true,
      },
      async response => {
        if (!response.didCancel) {
          // const videoDuration = await getVideoDuration(response.assets[0].uri);

          // if (videoDuration > 30) {
          //   // Check if video duration exceeds 20 minutes
          //   Alert.alert('not more than 30 sec');
          // } else {
          //   // Handle the selected image here

          if (response.assets[0].duration > 20) {
            Alert.alert('can not upload more than 20 seconds');
          } else {
            console.log('Selected Image:', response.assets[0]);
            console.log();
            const newVideos = response.assets[0];
            setIsvideoSelected(true);
            setVideoFile(response.assets[0]);
          }

          // setselectedVideos(newVideos);
          // You can set the selected image to state or do any further processing
          // }
        }
      },
    );
  };

  const getVideoDuration = async uri => {
    const video = await Video.parseAsync({uri}); // Use react-native-video
    const duration = video.duration; // Extract video duration from the parsed object
    return duration;
  };

  const UploadVid = async () => {
    setLoading(true);
    console.log('videoFile', videoFile);

    if (!videoFile) {
      setLoading(false);
      // Toast.show({
      //   type: 'error',
      //   text1: 'Please select a video to upload',
      //   position: 'top',
      // });
      dispatch(showToastMessage(true, `please select a video to upload`, true));
    } else {
      const data = new FormData();
      data.append('file', {
        name: videoFile?.fileName,
        type: 'video/mp4',
        uri: videoFile?.uri,
      });

      console.error('data', data);

      try {
        const response = await axios.post(
          `${BASE_URL}/videos?title=${title}&userid=${user?.id}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        console.log('response video Upload =----->', response);
        if (response.status === 200) {
          // Toast.show({
          //   type: 'success',
          //   text1: 'Video uploaded successfully',
          //   position: 'top',
          // });
          dispatch(
            showToastMessage(true, `Video uploaded successfully`, false),
          );
          dispatch(GetAllVideos());
          navigation.navigate('Profile', {reload: true});
        }
      } catch (error) {
        console.error('Error uploading video:', error);
        if (error?.response.status === 413) {
          Alert.alert('Video size is too large');
        } else {
          Alert.alert('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // const GetVideo = async () => {
  //   const response = await axios.get(`${TEST_URL}/videos`);

  //   console.log('response video get =----->', response.data);
  // };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <Toast
        message={message}
        visible={showToast}
        error={error}
        onClose={hideToastHandler}
      /> */}
      <ScrollView
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{width: '10%', padding: responsiveHeight(2)}}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/100/FFFFFF/left.png',
            }}
            style={styles.arrow}
          />
        </TouchableOpacity>

        {isVideoSelected ? (
          <>
            <TouchableOpacity style={styles.postbutton} activeOpacity={1}>
              <View
                style={{
                  width: responsiveWidth(90),
                  height: responsiveHeight(60),

                  marginVertical: responsiveHeight(0.4),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '100%',
                    height: '7%',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: '15%',
                      height: '100%',
                      alignItems: 'flex-end',
                    }}
                    onPress={() => {
                      setIsvideoSelected(false);
                      setVideoFile(null);
                    }}>
                    <Image
                      source={require('../../../assets/images/delete.png')}
                      style={styles.delete}
                    />
                  </TouchableOpacity>
                </View>
                <Video
                  source={{
                    uri: videoFile?.uri,
                  }}
                  // ref={ref => {
                  //   this.player = ref;
                  // }} // Store reference
                  controls={true}
                  // onBuffer={
                  //   b => {
                  //     setBuffering(true);
                  //     console.log('buffering', b);
                  //   }
                  //   // Callback when remote video is buffering
                  // } // Callback when remote video is buffering
                  //onError={e => console.log('error', e)} // Callback when video cannot be loaded
                  style={{height: '100%', width: '100%'}}
                  // useTextureView={false}
                  // fullscreenAutorotate={true}
                  repeat={true}
                  paused={false}
                  // onLoadStart={() => console.log('load start')}
                  // onLoad={() => console.log('load')}
                  // onProgress={() => console.log('progress')}
                  // onEnd={() => console.log('end')}
                  // onAudioBecomingNoisy={() => console.log('audio noisy')}
                  // onAudioFocusChanged={() => console.log('audio focus changed')}
                  // ignoreSilentSwitch="ignore"
                  // // disableFocus="true"
                  // playInBackground={true}
                  // playWhenInactive={true}
                  // pictureInPicture={true}
                  posterResizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={opengallery} style={styles.postbutton}>
              <View
                style={{
                  width: responsiveWidth(90),
                  height: responsiveHeight(60),
                  backgroundColor: colorsobject.selectvideocolor,
                  justifyContent: 'center',
                  alignItems: 'center',

                  borderRadius: responsiveWidth(5),
                  borderColor: colorsobject.white,
                  borderWidth: 0.5,
                  marginVertical: responsiveHeight(0.4),
                }}>
                <Image
                  source={require('../../../assets/images/plus.png')}
                  style={{height: responsiveHeight(7), aspectRatio: 1}}
                />
                <Text
                  style={{
                    color: colorsobject.white,
                    fontWeight: '700',
                    marginTop: responsiveHeight(3),
                    fontSize: RFValue(15),
                    marginHorizontal: 7,
                  }}>
                  Select Video
                </Text>
                <View style={{justifyContent: 'flex-end'}}>
                  <Text
                    style={{
                      color: colorsobject.themecolor,
                      fontSize: responsiveFontSize(1.8),
                    }}>
                    Video Should Be Less Than 20 Seconds
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}

        <TextInput
          placeholder="Add Title"
          placeholderTextColor={colorsobject.white}
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(7),
            backgroundColor: colorsobject.black2,
            alignSelf: 'center',
            borderRadius: responsiveWidth(5),
            color: colorsobject.white,
            paddingHorizontal: responsiveWidth(5),
            marginTop: responsiveHeight(5),
          }}
          value={title}
          onChangeText={text => setTitle(text)}
        />

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: responsiveHeight(10),
            marginTop: responsiveHeight(5),
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={[styles.buttonstyle, {backgroundColor: colorsobject.grey}]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttontext}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonstyle,
              {
                backgroundColor:
                  videoFile && title.trim() !== ''
                    ? colorsobject.themecolor
                    : colorsobject.grey,
              },
            ]}
            disabled={!videoFile || !title || title.trim() === ''}
            onPress={() => {
              // dispatch(showToastMessage(true, 'OTP Sent', true));

              if (title === '') {
                // Toast.show({
                //   type: 'error',
                //   text1: 'Please enter title',
                //   position: 'top',
                // });
                dispatch(showToastMessage(true, `Please enter title`, true));
              } else {
                UploadVid();
              }
            }}>
            {loading ? (
              <ActivityIndicator size={'small'} color={colorsobject.white} />
            ) : (
              <Text style={styles.buttontext}>Upload</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UploadVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsobject.black,
  },

  postbutton: {
    width: '100%',
    alignItems: 'center',
  },
  arrow: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    tintColor: colorsobject.themecolor,
  },
  buttonstyle: {
    height: '60%',
    backgroundColor: 'blue',
    width: '40%',
    borderRadius: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    color: colorsobject.white,
    fontWeight: '600',
    fontSize: responsiveFontSize(2.5),
  },
  delete: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    tintColor: colorsobject.themecolor,
  },
});
