import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import Toast from '../../components/Toast';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetUserDetailsWithPhone,
  storeAccountId,
  storeUserId,
  showToastMessage,
} from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../redux/store';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import {CountryPicker} from 'react-native-country-codes-picker';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const PhoneLogin = ({navigation}) => {
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
  const {userError, user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState<any>({
    phone: '',
    otp: '',
  });
  const [accId, setAccId] = useState<any>(null);
  const [confirm, setConfirm] = useState(null);
  const [otpSent, setOtpSent] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    // exit app on back event
    const backAction = () => {
      navigation.navigate('Login');
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    dispatch(storeAccountId(accId));
    saveUserIdToAsyncStorage(accId);
  }, [accId]);

  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    }
  }, [user]);

  useEffect(() => {
    if (userError) {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error',
      //   text2: userError,
      //   visibilityTime: 3000,
      //   autoHide: true,
      //   topOffset: 30,
      //   bottomOffset: 40,
      // });
      dispatch(showToastMessage(true, `Error`, true));
      navigation.navigate('Signup', {userCredentials: loginInfo.phone});
    }
  }, [userError]);

  const saveUserIdToAsyncStorage = async (accId: string) => {
    try {
      const serializedState = JSON.stringify(accId);
      await AsyncStorage.setItem('accountId', serializedState);
    } catch (error) {
      //Alert.alert(`${error}`);
      console.log(error);
    }
  };

  const signInWithPhone = async () => {
    const phoneNumber = loginInfo.phone;
    if (phoneNumber.length !== 10) {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error',
      //   text2: 'Invalid Phone Number',
      //   visibilityTime: 3000,
      //   autoHide: true,
      //   topOffset: 30,
      //   bottomOffset: 40,
      // });
      dispatch(showToastMessage(true, `Invalid Phone Number`, true));
      return;
    } else {
      setLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(
        `+91${phoneNumber}`,
      );
      if (confirmation) {
        setLoading(false);
        setConfirm(confirmation);
        console.log('CONFIRMATION', confirmation);
        setOtpSent(true);
      }
    }
  };

  const confirmCode = async () => {
    if (loginInfo.otp.length !== 6) {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error',
      //   text2: 'Invalid OTP',
      //   visibilityTime: 3000,
      //   autoHide: true,
      //   topOffset: 30,
      //   bottomOffset: 40,
      // });
      dispatch(showToastMessage(true, `Invalid OTP`, true));
      return;
    } else {
      console.log('OTP', loginInfo.otp);
      try {
        setLoading(true);
        const result = await confirm?.confirm(loginInfo.otp);
        console.log('RESULT', result);
        if (result?.user?.phoneNumber) {
          setLoading(false);
          saveAccessToken(result?.idToken);
          console.log('USER PHONE NUMBER', result?.user?.phoneNumber);
          dispatch(GetUserDetailsWithPhone(result?.user?.phoneNumber));
        }
      } catch (error) {
        //Alert.alert(`${error}`);
        setLoading(false);
        // Toast.show({
        //   type: 'error',
        //   position: 'top',
        //   text1: 'Invalid code',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `Invalid code`, true));
        console.log('Invalid code.');
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
      {/* // @ts-ignore */}
      <Toast
        message={message}
        visible={showToast}
        error={error}
        onClose={hideToastHandler}
      />
      <Text style={styles.signupText}>Login with Phone</Text>
      <View style={styles.signupFormContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.signupFormText}>Phone Number</Text>
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setShow(true);
              }}
              style={{
                position: 'absolute',
                zIndex: 1,
                left: 0,
                top: 0,
                width: 50,
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: colorsobject.grey6,
                marginTop: 5,
                marginLeft: 5,
              }}>
              <EntypoIcon name="chevron-down" size={15} color="white" />
              <Text
                style={{
                  // position: 'absolute',
                  // zIndex: 1,
                  // left: 10,
                  // top: 25,
                  color: colorsobject.white,
                }}>
                {' '}
                {countryCode}{' '}
              </Text>
            </TouchableOpacity>

            <CountryPicker
              show={show}
              // when picker button press you will get the country object with dial code
              lang="en"
              pickerButtonOnPress={item => {
                setCountryCode(item.dial_code);
                setShow(false);
              }}
              style={{
                textInput: {
                  width: '100%',
                  height: 50,
                  paddingLeft: 50,
                  color: colorsobject.black,
                  fontSize: 16,
                },

                countryName: {
                  fontSize: 16,
                  color: colorsobject.black,
                },

                dialCode: {
                  fontSize: 16,
                  color: colorsobject.black,
                },
              }}
            />
            <TextInput
              style={[styles.signupFormInput, {paddingLeft: 60}]}
              placeholder="Phone Number"
              placeholderTextColor={colorsobject.grey7}
              onChangeText={text => setLoginInfo({...loginInfo, phone: text})}
            />
          </View>
        </View>
        {otpSent && (
          <View style={styles.inputContainer}>
            <Text style={styles.signupFormText}>OTP</Text>
            <OTPInputView
              style={{width: '100%', height: 30, marginBottom: 20}}
              pinCount={6}
              code={loginInfo.otp}
              onCodeChanged={code => setLoginInfo({...loginInfo, otp: code})}
              // autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
        )}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colorsobject.secondarycolor, colorsobject.themecolor]}
          style={styles.signupBtn}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              otpSent ? confirmCode() : signInWithPhone();
              setOtpSent(true);
            }}>
            {loading ? (
              <ActivityIndicator color={colorsobject.white} />
            ) : (
              <Text style={styles.signupBtnText}>
                {otpSent ? 'Verify OTP' : 'Send OTP'}
              </Text>
            )}
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default PhoneLogin;
