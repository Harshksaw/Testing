import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import appBg from '../../assets/images/app-bg.png';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetAllProTags,
  GetUserDetails,
  GetUserDetailsWithEmail,
} from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import Toast from '../../components/Toast';

const Login = ({}) => {
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
  const {accountId} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState<any>(null);
  const [userDocId, setUserDocId] = useState<any>(null);
  const [ACCID, setACCID] = useState<any>(null);
  const [confirm, setConfirm] = useState<any>(null);

  GoogleSignin.configure({
    webClientId:
      '645340176056-39hp0n7suttkpnrf7lcjrguit2rui9qs.apps.googleusercontent.com',
  });

  useEffect(() => {
    getAccountId();

    // exit app on back event
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    // console.log("ACC ID in LOGIN",ACCID);
    if (ACCID !== null) {
      console.log('ACC ID in LOGIN', ACCID);
      dispatch(GetUserDetails(ACCID));
    }
  }, [ACCID]);

  useEffect(() => {
    if (user) {
      console.log('USER in LOGIN', user);
      navigation.navigate('Home');
    } else {
      if (userEmail) {
        console.log('USER EMAIL in LOGIN', userEmail);
        navigation.navigate('Signup', {userCredentials: userEmail});
      }
    }
  }, [userEmail, user]);

  const getAccountId = async () => {
    const value = await AsyncStorage.getItem('accountId');
    const value2 = accountId;
    // remove double quotes if any
    const AID = value?.replace(/['"]+/g, '') || value2?.replace(/['"]+/g, '');
    return setACCID(AID || null);
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      console.log('sign in start');
      const userInfo = await GoogleSignin.signIn();
      console.log('user info ----------------------------------->', userInfo);
      console.log('user info', userInfo?.user?.email);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      saveAccessToken(userInfo?.idToken);
      // getUserDoc(userInfo?.user?.email)
      setUserEmail(userInfo?.user?.email);
      dispatch(
        GetUserDetailsWithEmail(userInfo?.user?.email, userInfo?.idToken),
      );
      dispatch(GetAllProTags(userInfo?.idToken));

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      //Alert.alert(`${error}`);
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const saveAccessToken = async (token: any) => {
    console.error(
      '----------------------token in saveAccessToken-----------------',
      token,
    );
    try {
      await AsyncStorage.setItem('access_token', token);
      console.log('-----------------token saved!-----------------');
    } catch (e) {
      // saving error
      console.log('error in saving token', e);
    }
  };

  return (
    <View style={styles.container}>
      <Toast
        message={message}
        visible={showToast}
        error={error}
        onClose={hideToastHandler}
      />
      <View style={styles.topContainer}>
        <Image source={appBg} style={styles.bgImage} />
      </View>
      <LinearGradient
        style={styles.middleContainer}
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,1)']}>
        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => {
            onGoogleButtonPress();
          }}
          activeOpacity={0.8}>
          <Image
            source={{uri: 'https://img.icons8.com/color/48/google-logo.png'}}
            style={styles.buttonLogo}
          />
          <Text style={styles.googleText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.phoneBtn}
          onPress={() => navigation.navigate('PhoneLogin')}
          activeOpacity={0.8}>
          <Image
            source={{
              uri: 'https://img.icons8.com/material-rounded/100/FFFFFF/smartphone.png',
            }}
            style={styles.buttonLogo}
          />
          <Text style={styles.phoneText}>Login with Phone</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <Text style={styles.loginText}>
          By clicking Log In, you agree with our Terms. Learn how we process
          your data in our Privacy Policy and Cookies Policy.
        </Text>
      </View>
    </View>
  );
};

export default Login;
