import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import FavIcon from 'react-native-vector-icons/FontAwesome5';
// import FAIcon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import storage from '@react-native-firebase/storage';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Slider} from 'react-native-elements';
// import Wavesurfer from 'react-wavesurfer.js';
import moment from 'moment';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Playaudio from '../../screens/AudioRecorder/Playaudio';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const YouTubeVideo = () => {
  const videoId = '4Rll-_e9-0M;';

  return (
    <View style={{flex: 1}}>
      <YoutubePlayer height={300} play={false} videoId={videoId} />
    </View>
  );
};

const InstagramFavicon = require('www.instagram.com/_manvitiwari_/'); // Adjust the path to your image

const InstagramIcon = ({link}) => {
  console.log('Instagram link', link);
  let newLink = link.replace('@', '');

  const openInstagramLink = () => {
    console.log('Instagram new link', newLink);
    const instagramUrl = `https://www.instagram.com/${newLink}`;
    Linking.openURL(instagramUrl);
  };

  return (
    <View>
      {/* Display the Instagram icon */}
      <TouchableOpacity onPress={openInstagramLink}>
        <Icon
          name="instagram" // Specify the name of the Instagram icon
          size={30} // Adjust the size as needed
          color="white" // Adjust the color as needed
          style={{marginLeft: 270}}
        />
      </TouchableOpacity>
    </View>
  );
};

const YoutubeIcon = () => {
  const openYoutubeLink = () => {
    const instagramUrl = 'https://www.instagram.com/_manvitiwari_/';
    Linking.openURL(instagramUrl);
  };

  return (
    <View>
      {/* Display the Instagram icon */}
      <TouchableOpacity onPress={openYoutubeLink}>
        <Icon
          name="youtube" // Specify the name of the Instagram icon
          size={30} // Adjust the size as needed
          color="white" // Adjust the color as needed
          style={{marginLeft: 270}}
        />
      </TouchableOpacity>
    </View>
  );
};

const SpotifyIcon = () => {
  const openSpotifyLink = () => {
    const instagramUrl = 'https://www.instagram.com/_manvitiwari_/';
    Linking.openURL(instagramUrl);
  };

  return (
    <View>
      {/* Display the Instagram icon */}
      <TouchableOpacity onPress={SpotifyIcon}>
        <FavIcon
          name="spotify" // Specify the name of the Instagram icon
          size={30} // Adjust the size as needed
          color="white" // Adjust the color as needed
          style={{marginLeft: 270}}
        />
      </TouchableOpacity>
    </View>
  );
};

//for genre buttons
const label = ['pop', 'sufi', 'rap'];
const ButtonItem = ({label}) => {
  return (
    <View style={styles.btnscontainer}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colorsobject.secondarycolor, colorsobject.themecolor]}
        style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const ProfileCard = ({id, data}) => {
  const [profileImg, setProfileImg] = useState<string>('');
  const [profileAudio, setProfileAudio] = useState<string>({
    path: '',
    wave: [],
    recordSecs: 0,
  });
  const [userGenres, setUserGenres] = useState<any>([]);
  const [getAudioError, setGetAudioError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // console.log('Profile data ===============>', data);
    setUserGenres(data?.genres.split(','));
  }, [data]);

  // Get user profile image from firebase storage
  useEffect(() => {
    if (data?.audio) {
      getAudio(data?.audio?.path);
    } else {
      setProfileAudio({});
    }
  }, [data]);

  useEffect(() => {
    console.log('Profile audio', profileAudio);
  }, [profileAudio]);

  // Get image from firebase
  const getAudio = async path => {
    try {
      console.log('DATA USER ID', data?.id);
      const newListRef = storage().ref(`profileAudios/${data?.id}/` + path);
      // const newListRef = storage().ref(`profileAudios/e40a2358-f3a8-4b5e-b0d7-ebc249e838fa/sound.mp4`);
      console.log('NEW LIST REF', newListRef);
      const url = await newListRef.getDownloadURL().then(url => {
        console.log('URL ----->', url);
        return url;
      });
      console.log('Audio URL ----->', url);
      setProfileAudio({
        path: url,
        wave: data?.audio?.wave?.split(',').map(Number),
        recordSecs: data?.audio?.recordSecs,
      });
      setGetAudioError(false);
    } catch (error) {
      // //Alert.alert(`${error}`)
      console.log('AUDIO FETCH FROM FIREBASE ERROR---->', error);
      setGetAudioError(true);
    }
  };

  const TimedText = ({text, duration, setShowTimedText}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setShowTimedText(false);
      }, duration);

      return () => clearTimeout(timeout); // Cleanup the timer on component unmount
    }, []);

    return isVisible ? (
      <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colorsobject.secondarycolor, colorsobject.themecolor]}
          style={styles.timedtext}>
          <Text
            style={{
              color: colorsobject.white,
              fontSize: responsiveFontSize(1.8),
            }}>
            {text}
          </Text>
        </LinearGradient>
      </View>
    ) : null;
  };

  const Quotes = () => {
    const [showTimedText, setShowTimedText] = useState(false);

    const handleShowAlert = () => {
      console.log('Show alert');
      setShowTimedText(true);
    };

    useEffect(() => {
      console.log('Timed text', showTimedText);
    }, [showTimedText]);

    return (
      <View style={{}}>
        <TouchableOpacity onPress={handleShowAlert} style={styles.quotes}>
          <FAIcons name="quote-left" size={15} color={colorsobject.white} />
        </TouchableOpacity>
        {showTimedText && (
          <TimedText
            text="Hello, World!"
            duration={5000}
            setShowTimedText={setShowTimedText}
          />
        )}
      </View>
    );
  };

  // Play button component
  //   <View style={styles.profileBottom}>
  //   <TouchableOpacity style={styles.playBtn} onPress={() => {
  //     console.log("Play button pressed")
  //     playPause()
  //   }
  //   }>
  //   <LinearGradient
  //     colors={['rgba(183,25,215,1)', 'rgba(208,38,171,1)']}
  //     style={styles.btnGradient}>
  //     <FAIcon name={playing ? "pause" : "play"} size={20} color={colorsobject.white} style={styles.playIcon}/>
  //   </LinearGradient>
  //   </TouchableOpacity>
  //   <View style={styles.audioformImgContainer}>
  //     {/* <Image source={audioformImg} style={styles.audioformImg}/> */}
  //     <Image source={audioformImg} style={styles.audioformImgOverlay}/>
  //   </View>
  // </View>

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileTop}>
        <ImageBackground
          source={{
            uri:
              data?.profileImage ||
              'https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg',
          }}
          style={styles.profileImage}
          imageStyle={{borderRadius: 40}}>
          <Quotes />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
            style={styles.cardInner}>
            <TouchableOpacity
              style={{padding: 20, paddingBottom: 5}}
              onPress={() => {
                console.log('Profile card pressed', data?.name);
                // toggleModal();
                navigation.navigate('OtherUserProfile', {data: data});
              }}>
              {data?.instagram && <InstagramIcon link={data?.instagram} />}
              {data?.spotify && <SpotifyIcon />}
              {data?.youtube && <YoutubeIcon />}
              <Text style={styles.name}>
                {data?.name || '-'},{' '}
                {moment().diff(data?.birthdate, 'years').toString()}
              </Text>
              <View style={styles.location}>
                <IonIcon
                  name="location-outline"
                  size={14}
                  color={colorsobject.white}
                />
                <Text style={styles.locationText}>{data?.city}</Text>
              </View>
            </TouchableOpacity>
            {!getAudioError && profileAudio && (
              <Playaudio profileAudio={profileAudio} />
            )}
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ProfileCard;
