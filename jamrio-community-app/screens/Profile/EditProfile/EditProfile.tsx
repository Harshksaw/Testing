import {
  View,
  Text,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import profilecompletion from '../../../assets/images/profilecompletion.png';
import cancelimg from '../../../assets/images/cancelimg.png';
import plusimg from '../../../assets/images/plusimg.png';
import down_arrow from '../../../assets/images/down_arrow.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import YoutubePlayer from 'react-native-youtube-iframe';
import FavGenre from '../../FavGenres/FavGenre';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
// import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {BASE_URL, TOKEN} from '../../../redux/store';
import {
  GetUserDetails,
  showToastMessage,
} from '../../../redux/actions/userActions';
import DocumentPicker from 'react-native-document-picker';
import InstagramEmbed from 'react-native-embed-instagram';
// import InstagramEmbed from 'react-instagram-embed';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MainPage from '../../AudioRecorder/AudioRecorder';
import Playaudio from '../../AudioRecorder/Playaudio';
import {colorsobject} from '../../../assets/ProjectColors/Colorsobject';
import Toast from '../../../components/Toast';

const YouTubeVideo = () => {
  const videoId = '4Rll-_e9-0M;';

  return (
    <View style={{flex: 1}}>
      <YoutubePlayer height={300} play={false} videoId={videoId} />
    </View>
  );
};

const EditableTextInput = ({
  title,
  editedUserDetails,
  setEditedUserDetails,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.headingname}>
        {title === 'fullname'
          ? 'Name'
          : title === 'username'
          ? 'Username'
          : title === 'city'
          ? 'Location'
          : title === 'shoutout'
          ? 'Shoutout'
          : title === 'about'
          ? 'About'
          : null}
      </Text>

      <View
        style={[
          styles.namebtn,

          {
            height:
              title === 'shoutout'
                ? responsiveHeight(10)
                : title === 'about'
                ? responsiveHeight(15)
                : responsiveHeight(6),
          },
        ]}>
        {isEditMode ? (
          <View style={{width: '100%'}}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                if (title === 'shoutout') {
                  if (text.length <= 100) {
                    setEditedUserDetails({...editedUserDetails, [title]: text});
                  }
                } else if (title === 'about') {
                  if (text.length <= 300) {
                    setEditedUserDetails({...editedUserDetails, [title]: text});
                  }
                } else {
                  setEditedUserDetails({...editedUserDetails, [title]: text});
                }
              }}
              multiline
              numberOfLines={4}
              value={editedUserDetails[title]}
              autoFocus
              onBlur={() => setIsEditMode(false)}
            />
            {['shoutout', 'about'].includes(title) && (
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'flex-end',
                  width: '100%',
                  textAlign: 'right',
                  position: 'absolute',
                  bottom: responsiveHeight(0.8),
                  right: responsiveWidth(10),
                }}>
                {`${editedUserDetails[title]?.length || 0}/ ${
                  title === 'shoutout' ? 100 : title === 'about' ? 300 : null
                }`}
              </Text>
            )}
          </View>
        ) : (
          <Text style={styles.inputText}>
            {title === 'shoutout'
              ? editedUserDetails[title] || 'Not updated shoutout yet'
              : title === 'about'
              ? editedUserDetails[title] || 'Not updated about yet'
              : editedUserDetails[title] || 'No Data found'}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => setIsEditMode(true)}
          style={styles.editbtn}>
          <Icon
            name="edit"
            size={15}
            color={colorsobject.white}
            onPress={handleEditClick}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.linesep}></View>
    </View>
  );
};

// const AboutInput = () => {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editedUserDetails, setEditedUserDetails] = useState({
//     about: '',
//   });

//   const handleEditClick = () => {
//     setIsEditMode(true);
//   };

//   const handleSaveClick = () => {
//     setIsEditMode(false);
//   };
//   return (
//     <View style={styles.inputContainer}>
//       <View style={styles.namebtn}>
//         {isEditMode ? (
//           <TextInput
//             style={styles.About_Input}
//             onChangeText={text =>
//               setEditedUserDetails({...editedUserDetails, about: text})
//             }
//             value={editedUserDetails.about}
//             autoFocus
//             onBlur={() => setIsEditMode(false)}
//           />
//         ) : (
//           <Text style={styles.About_Input}>
//             {editedUserDetails.about || 'Add a short bio here'}
//           </Text>
//         )}
//         <View style={styles.abt_block}>
//           <TouchableOpacity onPress={() => setIsEditMode(true)}>
//             <Icon
//               name="edit"
//               size={15}
//               onPress={handleEditClick}
//               style={styles.abt_editbtn}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };
const ButtonItem = ({label, onDelete}) => {
  return (
    <View style={styles.btnscontainer}>
      <View style={styles.genreContainer}>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.genreText}>{label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ExpandableContainer = ({
  title,
  editedUserDetails,
  setEditedUserDetails,
  option,
}) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <View style={styles.S_container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.arrowContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity activeOpacity={0.8} style={styles.iconcontainer}>
            <Image
              source={
                title === 'Youtube'
                  ? require('../../../assets/images/youtube.png')
                  : title === 'Instagram'
                  ? require('../../../assets/images/instagram.png')
                  : require('../../../assets/images/spotify.png')
              }
              style={styles.socialsIcon}
            />
          </TouchableOpacity>
          <Text style={styles.arrowText}>{title}</Text>
        </View>
        <Image source={down_arrow} style={styles.cancelimg}></Image>
      </TouchableOpacity>
      {isExpanded && (
        <TextInput
          style={styles.S_Input}
          placeholder={`add your link here ...`}
          multiline
          numberOfLines={4}
          value={editedUserDetails[option]}
          onChangeText={text =>
            setEditedUserDetails({...editedUserDetails, [option]: text})
          }
        />
      )}
    </View>
  );
};

const EditableLinkInput = ({
  title,
  editedUserDetails,
  setEditedUserDetails,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.handlename}>
        {title === 'spotify'
          ? 'spotify'
          : title === 'instagram'
          ? 'instagram'
          : title === 'youtube'
          ? 'youtube'
          : null}
      </Text>
      <View style={styles.handlebtn}>
        {isEditMode ? (
          <TextInput
            style={styles.textInput}
            onChangeText={text =>
              setEditedUserDetails({...editedUserDetails, [title]: text})
            }
            value={editedUserDetails[title]}
            autoFocus
            onBlur={() => setIsEditMode(false)}
          />
        ) : (
          <Text style={styles.textInput}>
            {editedUserDetails[title] || 'Link'}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => setIsEditMode(true)}
          style={styles.editbtn}>
          <Icon
            name="edit"
            size={20}
            color={colorsobject.white}
            onPress={handleEditClick}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.linesep}></View>
    </View>
  );
};

const EditProfile = () => {
  const {accountId, all_tags} = useSelector((state: any) => state.user);
  const {user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [USERID, setUSERID] = useState<any>(null);
  const [ACCID, setACCID] = useState<any>(null);
  const [profileImg, setProfileImg] = useState({
    imgName: '',
    url: '',
  });
  const [userAudioFile, setUserAudioFile] = useState();
  const [userGenres, setUserGenres] = useState<any>([]);
  const [editedUserDetails, setEditedUserDetails] = useState<any>({
    fullname: user?.name || '',
    email: '',
    username: '',
    city: '',
    age: '',
    // gender: '',
    shoutout: '',
    about: '',
    spotify: '',
    instagram: '',
    youtube: '',
    audiourl: '',
  });
  const [jsonAudioFile, setJsonAudioFile] = useState<any>(null);
  const [uploadNewAudio, setUploadNewAudio] = useState(false);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);

  const titles = ['fullname', 'username', 'city', 'shoutout', 'about'];
  const handles = ['spotify', 'youtube', 'instagram'];

  useEffect(() => {
    getAccountId();
  }, []);

  useEffect(() => {
    console.warn('USER DETAILS ON EDIT PROFILE', user);
    console.log('USER GENRES', user?.genres);
    setUserGenres(user?.genres?.split(','));
  }, [user]);

  const onHandleSave = () => {
    UpdateUserDetails();
    navigation.navigate('Profile');
  };

  const getAccountId = async () => {
    const value = await AsyncStorage.getItem('accountId');
    const value2 = accountId;
    // remove double quotes if any
    const AID = value?.replace(/['"]+/g, '') || value2?.replace(/['"]+/g, '');
    return setACCID(AID || null);
  };

  // Update user details
  const UpdateUserDetails = async () => {
    // create a string from genres array
    const genresArray = userGenres?.toString();
    console.log('GENRES ARRAY', genresArray);

    if (ACCID) {
      try {
        setLoading(true);
        const response = await axios.put(
          `${BASE_URL}/appaccount/${ACCID}`,
          {
            name: editedUserDetails?.fullname,
            username: editedUserDetails?.username,
            city: editedUserDetails?.city,
            genres: genresArray,
            shoutout: editedUserDetails?.shoutout,
            about: editedUserDetails?.about,
            spotify: editedUserDetails?.spotify,
            instagram: editedUserDetails?.instagram,
            youtube: editedUserDetails?.youtube,
            audiourl: editedUserDetails?.audiourl,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: TOKEN?._j,
            },
          },
        );

        console.log('RESPONSE ------>', response);
        console.log('RESPONSE Data ------>', response?.data);
        if (
          response?.status === 200 ||
          response?.status === 201 ||
          response?.status === 204
        ) {
          setLoading(false);
          console.log('USER DETAILS', response?.data);
          // Toast.show({
          //   type: 'success',
          //   position: 'top',
          //   text1: 'User details saved successfully',
          //   visibilityTime: 3000,
          //   autoHide: true,
          // });
          dispatch(
            showToastMessage(true, `User details saved successfully`, false),
          );

          dispatch(GetUserDetails(ACCID));
        } else {
          //Alert.alert(`${response?.data}`);
          setLoading(false);
          // Toast.show({
          //   type: 'error',
          //   position: 'top',
          //   text1: 'Unexpected token status : ' + response.status,
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
          console.log('USER DETAILS ERROR', response);
        }
      } catch (error) {
        //Alert.alert(`${error}`)
        if (error.response) {
          setLoading(false);
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
          setLoading(false);
          // Toast.show({
          //   type: 'error',
          //   text1: 'no response received',
          //   visibilityTime: 3000,
          //   autoHide: true,
          // });
          dispatch(showToastMessage(true, `no response received`, true));
        } else {
          setLoading(false);
          // Toast.show({
          //   type: 'error',
          //   text1: 'Error:- ' + error.message,
          //   visibilityTime: 3000,
          //   autoHide: true,
          // });
          dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
        }
        console.log('ERROR ------>', error);
      }
    } else {
      setLoading(false);
      //Alert.alert(`USER ID NOT FOUND`)
      console.log('USER ID NOT FOUND');
    }
  };

  // Add user profile image url
  const addUserProfileImage = async image => {
    if (image.length > 0) {
      console.log('IMAGE before adding ', image);
      if (ACCID) {
        try {
          setLoading(true);
          const response = await axios.put(
            `${BASE_URL}/appaccount/${ACCID}`,
            {
              profileImage: image,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                authorization: TOKEN?._j,
              },
            },
          );

          console.log('RESPONSE ------>', response);
          console.log('RESPONSE Data ------>', response?.data);
          if (
            response?.status === 200 ||
            response?.status === 201 ||
            response?.status === 204
          ) {
            setLoading(false);
            console.log('USER DETAILS', response?.data);
            // Toast.show({
            //   type: 'success',
            //   position: 'top',
            //   text1: 'Profile Image Uploaded successfully',
            //   visibilityTime: 3000,
            //   autoHide: true,
            // });
            dispatch(
              showToastMessage(
                true,
                `Profile Image Uploaded successfully`,
                false,
              ),
            );
            dispatch(GetUserDetails(ACCID));
          } else {
            //Alert.alert(`${response?.data}`);
            setLoading(false);
            // Toast.show({
            //   type: 'error',
            //   position: 'top',
            //   text1: 'Unexpected Token Status :' + response.status,
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
            console.log('USER DETAILS ERROR', response);
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
          console.log('ERROR ------>', error);
        }
      } else {
        //Alert.alert(`USER ID NOT FOUND`)
        console.log('USER ID NOT FOUND');
      }
    } else {
      //Alert.alert(`Something wnet wrong!`)
      console.log('Something went wrong!');
    }
  };

  // Add user audio file url
  const addUserProfileAudio = async audio => {
    if (audio !== 0) {
      console.log('AUDIO', audio);
      if (ACCID) {
        try {
          setAudioLoading(true);
          const response = await axios.put(
            `${BASE_URL}/appaccount/${ACCID}`,
            {
              audio: audio,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                authorization: TOKEN?._j,
              },
            },
          );

          console.log('RESPONSE ------>', response);
          console.log('RESPONSE Data ------>', response?.data);
          if (
            response?.status === 200 ||
            response?.status === 201 ||
            response?.status === 204
          ) {
            //Alert.alert('audio uploaded')
            setAudioLoading(false);
            console.log('USER AUDIO UPDATED SUCCESSFULLY', response?.data);
            // Toast.show({
            //   type: 'success',
            //   position: 'top',
            //   text1: 'Audio File Uploaded successfully',
            //   visibilityTime: 3000,
            //   autoHide: true,
            // });
            dispatch(
              showToastMessage(true, `Audio File Uploaded successfully`, false),
            );
            dispatch(GetUserDetails(ACCID));
          } else {
            setAudioLoading(false);
            //Alert.alert(`${response?.data}`);
            console.log('USER DETAILS ERROR', response);
            // Toast.show({
            //   type: 'success',
            //   text1: `Unexpexted token status` + response.status,
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
          setAudioLoading(false);
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
          console.log('ERROR  in upload audio ------>', error);
        }
      } else {
        //Alert.alert(`USER ID NOT FOUND`)
        console.log('USER ID NOT FOUND');
      }
    } else {
      //Alert.alert(`SOmething wnet wrong!`)
      console.log('Something went wrong!');
    }
  };

  // Get user profile image from firebase storage
  useEffect(() => {
    setEditedUserDetails({
      fullname: user?.name,
      email: user?.email,
      username: user?.username,
      // gender: user?.gender ? user?.gender  : '',
      city: user?.city ? user?.city : '',
      shoutout: user?.shoutout ? user?.shoutout : '',
      about: user?.about ? user?.about : '',
      spotify: user?.spotify ? user?.spotify : '',
      instagram: user?.instagram ? user?.instagram : '',
      youtube: user?.youtube ? user?.youtube : '',
      audiourl: user?.audiourl ? user?.audiourl : '',
    });
    if (user?.profileImage) {
      getImage(user?.profileImage);
    } else {
      console.log('No image found');
    }
    if (user?.audiourl !== '') {
      getAudio(user?.audiourl);
    } else {
      console.log('No audio found');
    }
  }, [user]);

  useEffect(() => {
    console.log('GET PROFILE IMAGE ----->', profileImg);
  }, [profileImg]);

  useEffect(() => {
    console.log('GET PROFILE AUDIO ----->', userAudioFile);
  }, [userAudioFile]);

  // store images in firebase
  const reference = storage().ref(
    'profileImages/' + user?.id + '/' + profileImg.imgName,
  );
  const referenceAudio = storage().ref(
    'profileAudios/' + user?.id + '/' + jsonAudioFile?.path?.split('/')[9],
  );

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      console.log(response);
      if (response.assets) {
        console.warn(
          'Image path Response ------->',
          response.assets[0]?.uri?.split('/')[8],
        );
        console.warn('Image path URLL ------->', response.assets[0]?.uri);
        setProfileImg({
          imgName: response.assets[0].uri?.split('/')[8],
          url: response.assets[0].uri,
        });
      }
    });
  };

  const getImageURL = async path => {
    const newListRef = storage().ref(`profileImages/${user?.id}/` + path);
    const url = await newListRef.getDownloadURL().then(url => {
      console.log('URL ----->', url);
      return url;
    });
    console.log('IMAGE URL ----->', url);
    addUserProfileImage(url);
  };

  // Upload image to firebase
  const uploadImage = async () => {
    setLoading(true);
    console.log('REFERENCE', reference);
    const task = reference.putFile(profileImg.url);
    console.log('IMAGE TASK', task);
    task
      .then(img => {
        console.log('Image uploaded to the bucket!', img.metadata.fullPath);
        const path = img.metadata.fullPath?.split('/');
        console.log('Uploaded Image name ====>', path[2]);
        getImageURL(path[2]);
        setLoading(false);
        setProfileImg({
          imgName: '',
          url: '',
        });
        // Toast.show({
        //   type: 'success',
        //   text1: 'Image uploaded successfully',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `success`, false));
      })
      .catch(e => {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + e.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `Error:- ${error.message}`, true));

        console.log('uploading image error => ', e);
        setLoading(false);
      });
  };

  const uploadAudio = async jsonFile => {
    console.log('AUDIO FILE', jsonFile?.path);
    const task = referenceAudio.putFile(jsonFile?.path);
    task
      .then(audio => {
        console.log('Audio uploaded to the bucket!', audio.metadata.fullPath);
        const path = audio.metadata.fullPath.split('/');
        console.log('Uploaded Audio name ====>', path[2]);
        addUserProfileAudio({
          path: path[2],
          recordSecs: jsonFile?.recordSecs,
          wave: jsonFile?.wave,
        });
      })
      .catch(e => {
        //Alert.alert(`${e}`);
        console.log('uploading Audio error => ', e);
      });
  };

  // Choose audio file
  const handleChooseAudio = async () => {
    try {
      const task = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.audio],
        copyTo: 'cachesDirectory',
      });
      console.log('AUDIO DOC', task);
      setUserAudioFile(task);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        //Alert.alert(` User cancelled the ipload : ${error}`);
        console.log('User cancelled the upload', error);
      } else {
        //Alert.alert(`${error}`);
        console.log(error);
      }
    }
  };

  console.log(userAudioFile);

  const listRef = storage().ref(`profileImages/${user?.id}/`);

  const audioListRef = storage().ref(`profileAudios/${user?.id}/`);

  // Get image from firebase
  const getImage = async path => {
    const newListRef = storage().ref(
      'profileImages/file:/data/user/0/com.jamrio_com_app/cache/' + path,
    );
    const url = await newListRef.getDownloadURL().then(url => {
      console.log('URL ----->', url);
      return url;
    });
    console.log('IMAGE URL ----->', url);
    setProfileImg(url);
  };

  // Get list of images from firebase
  const listImages = async () => {
    const list = await listRef.listAll();
    console.log('Images list ====>', list.items[0].fullPath);
    // setListImg(list.items[0].fullPath)
    const imgName = list.items[0].fullPath.split('/');
    console.log('Image name ====>', imgName[7]);
    // getImage(imgName[7])
  };

  // Get audio from firebase
  const getAudio = async path => {
    console.log('AUDIO PATH', path);
    const newListRef = storage().ref(`profileAudios/${user?.id}/` + path);
    const urlAudio = await newListRef.getDownloadURL().then(urlAudio => {
      console.log('AUDIO ==== URL ----->', urlAudio);
      return urlAudio;
    });

    console.log('Audio file URL ----->', urlAudio);
    setUserAudioFile(urlAudio);
  };

  // Get list of images from firebase
  const listAudios = async () => {
    const list = await audioListRef.listAll();
    console.log('Audio list ====>', list.items[0].fullPath);
    // setListImg(list.items[0].fullPath)
    const audioName = list.items[0].fullPath;
    console.log('Audio name ====>', audioName);
    // getImage(imgName[7])
  };

  useEffect(() => {
    listImages();
    listAudios();
  }, []);

  useEffect(() => {
    console.log('JSON AUDIO FILE ------------>', jsonAudioFile);
    if (jsonAudioFile !== null) {
      uploadAudio(jsonAudioFile);
    }
  }, [jsonAudioFile]);

  const deleteButton = (id: string) => {
    setUserGenres(prevButtons => prevButtons.filter(genre => genre !== id));
  };

  const addFavGenreRedirect = () => {
    navigation.navigate('FavGenre');
  };

  const addProtagRedirect = () => {
    navigation.navigate('Protags');
  };

  const checkIfEmptyOrSame = () => {
    // check if the edited fields are empty or same as previous
    if (
      (editedUserDetails.fullname === user?.name ||
        editedUserDetails.fullname === '' ||
        editedUserDetails.fullname === null) &&
      (editedUserDetails.username === user?.username ||
        editedUserDetails?.username === '' ||
        editedUserDetails?.username === null) &&
      (editedUserDetails.city === user?.city ||
        editedUserDetails.city === '' ||
        editedUserDetails.city === null) &&
      editedUserDetails.shoutout === user?.shoutout &&
      editedUserDetails.about === user?.about &&
      editedUserDetails.spotify === user?.spotify &&
      editedUserDetails.instagram === user?.instagram &&
      editedUserDetails.youtube === user?.youtube
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <Toast position="top" /> */}
      <KeyboardAwareScrollView style={styles.profileContainer}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {/* profile image */}
          <View style={[styles.entireimageconatiner]}>
            {user?.profileImage?.length > 0 || profileImg.url?.length > 0 ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  handleChoosePhoto();
                }}>
                {console.log('PROFILE IMAGE', profileImg.url)}
                <View style={styles.imageconatiner}>
                  <Image
                    source={{uri: profileImg.url || user?.profileImage}}
                    style={styles.profileImage}
                  />
                  <Icon
                    name="edit"
                    size={30}
                    color={colorsobject.white}
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 25,
                      backgroundColor: colorsobject.black,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleChoosePhoto}
                style={styles.imageconatiner}>
                <View style={styles.imageconatiner}>
                  <Image
                    source={require('../../../assets/images/user.jpeg')}
                    style={styles.profileImage}
                  />
                </View>
              </TouchableOpacity>
            )}
            {/* <View style={styles.sideimageconatiner}>
            {profileImg?.length > 1 ? (
              <View style={styles.imageconatiner_two}>
                <Image
                  source={{uri: profileImg[1]}}
                  style={styles.profileImageBig}
                />
              </View>
            ) : (
              <View style={styles.imageconatiner_two}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleChoosePhoto}>
                  <Icon name="plus" size={20} color={colorsobject.white} />
                </TouchableOpacity>
              </View>
            )}
            {profileImg?.length > 2 ? (
              <View style={styles.imageconatiner_two}>
                <Image
                  source={{uri: profileImg[2]}}
                  style={styles.profileImageBig}
                />
              </View>
            ) : (
              <View style={styles.imageconatiner_two}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleChoosePhoto}>
                  <Icon name="plus" size={20} color={colorsobject.white} />
                </TouchableOpacity>
              </View>
            )}
          </View> */}
          </View>
          {/* ------------------Change Profile picture ---------------- */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: responsiveWidth(3),
            }}>
            <Text
              style={[styles.genreLabel, {fontSize: responsiveFontSize(2.3)}]}>
              Change Profile Pic
            </Text>
            {profileImg?.url?.length > 0 && (
              <LinearGradient
                start={{x: 0, y: 0}} // Top left corner
                end={{x: 1, y: 0}} // Top right corner
                colors={[colorsobject.secondarycolor, colorsobject.themecolor]}
                style={{borderRadius: 10, overflow: 'hidden'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{padding: 15}}
                  onPress={() => {
                    console.log('Upload Image', profileImg);
                    uploadImage();
                  }}>
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color={colorsobject.white}
                    />
                  ) : (
                    <Text style={styles.submitButtonText}>Upload Image</Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            )}
          </View>

          <View style={[styles.profileDetailsContainer, {width: '95%'}]}>
            {titles.map(title => (
              <EditableTextInput
                title={title}
                editedUserDetails={editedUserDetails}
                setEditedUserDetails={setEditedUserDetails}
              />
            ))}
            <View>
              <Text style={styles.headingname}>Pro Tag</Text>
            </View>

            {/* ---------Pro Tags-------------- */}
            <View style={styles.btnscontainer}>
              {user?.tag && (
                <ButtonItem
                  key={user?.tag}
                  label={user?.tag}
                  // onDelete={() => deleteButton(genre)
                  // } //Future use
                />
              )}
            </View>
            {/* // plus sign */}
            <TouchableOpacity
              style={{
                padding: responsiveHeight(2),
                marginVertical: responsiveHeight(2),
                backgroundColor: colorsobject.grey7,
                borderRadius: 6,
              }}
              onPress={addProtagRedirect}>
              <Text
                style={{color: colorsobject.themecolor, alignSelf: 'center'}}>
                Choose Your Pro Tag
              </Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.headingname}>Talents</Text>
            </View>

            {/* ------------Talents--------- */}
            <View style={styles.btnscontainer}>
              {userGenres &&
                userGenres.map(genre => (
                  <>
                    {genre !== '' && (
                      <ButtonItem
                        key={genre}
                        label={genre}
                        // onDelete={() => deleteButton(genre)
                        // } //Future use
                      />
                    )}
                  </>
                ))}

              {/* userDocument?.genres?.length > 0 ?
      userDocument?.genres?.map((genre) => (
        <ButtonItem
          key={button.id}
          label={button.label}
          onDelete={() => deleteButton(button.id)}
        />
      )) */}
            </View>
            {/* // plus sign */}
            <TouchableOpacity
              style={{
                padding: responsiveHeight(2),
                marginVertical: responsiveHeight(2),
                backgroundColor: colorsobject.grey7,
                borderRadius: 6,
              }}
              onPress={addFavGenreRedirect}>
              <Text
                style={{color: colorsobject.themecolor, alignSelf: 'center'}}>
                Choose Talents
              </Text>
            </TouchableOpacity>
            <View style={styles.linesep}></View>
            <View>
              <Text style={styles.headingname}>Social Links</Text>
            </View>
            {/* <View>
              <AboutInput />
              <View style={styles.linesep}></View>
            </View> */}
            <View style={styles.detailsbtn}>
              {/* <ExpandableContainer
              option={'shoutout'}
              title={'My Shoutouts'}
              editedUserDetails={editedUserDetails}
              setEditedUserDetails={setEditedUserDetails}
            /> */}
              <ExpandableContainer
                option={'youtube'}
                title={'Youtube'}
                editedUserDetails={editedUserDetails}
                setEditedUserDetails={setEditedUserDetails}
              />
              <ExpandableContainer
                option={'instagram'}
                title={'Instagram'}
                editedUserDetails={editedUserDetails}
                setEditedUserDetails={setEditedUserDetails}
              />
              <ExpandableContainer
                option={'spotify'}
                title={'Spotify'}
                editedUserDetails={editedUserDetails}
                setEditedUserDetails={setEditedUserDetails}
              />
            </View>
            {/* <View style={{
            height: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            zIndex: 10,
          }}>
           
          </View> */}

            {/* <View style={styles.container}>
      <YouTubeVideo />
    </View> */}

            {/* --------------- TO BE REMOVED ------------- */}
            {/* <View>
            <Text style={styles.profileHintText}>
              Add complete links to your social media accounts
            </Text>
            {handles.map(handles => (
              <EditableLinkInput
                title={handles}
                editedUserDetails={editedUserDetails}
                setEditedUserDetails={setEditedUserDetails}
              />
            ))}
          </View> */}
            {checkIfEmptyOrSame() && (
              <LinearGradient
                start={{x: 0, y: 0}} // Top left corner
                end={{x: 1, y: 0}} // Top right corner
                colors={[colorsobject.secondarycolor, colorsobject.themecolor]}
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{padding: 15}}
                  onPress={() => {
                    console.log('Update details', editedUserDetails);
                    onHandleSave();
                  }}>
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color={colorsobject.white}
                    />
                  ) : (
                    <Text style={styles.submitButtonText}>Update</Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default EditProfile;
