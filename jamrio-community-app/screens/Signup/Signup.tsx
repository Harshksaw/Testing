import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import Toast from '../../components/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {
  CreateUser,
  GetUserDetails,
  storeAccountId,
  storeUserId,
} from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../redux/store';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import {CountryPicker} from 'react-native-country-codes-picker';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const Signup = ({navigation, route}) => {
  const {toast_message, user, create_user_loading} = useSelector(
    (state: any) => state.user,
  );
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
  const {userCredentials} = route.params;
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({
    fullName: '',
    username: '',
    phone: '',
    dob: date.toDateString(),
    email: '',
  });
  const [countryCode, setCountryCode] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    // const user = auth().currentUser;
    // if (user){
    // Check if the userCredentials from route is email or phone numner
    if (userCredentials.includes('@')) {
      console.log('USER EMAIL', userCredentials);
      setUserInfo({...userInfo, email: userCredentials});
    } else {
      console.log('USER PHONE', userCredentials);
      setUserInfo({...userInfo, phone: userCredentials});
    }
    // }
  }, []);

  useEffect(() => {
    console.log('USER FOUND!!!!!!!!!!', user);

    if (user) {
      console.log('USER FOUND navigating!!!!!!!!!!', user);
      navigation.navigate('Home');
    }
  }, [user]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          {/* <ScrollView contentContainerStyle={{justifyContent: 'flex-end', flex: 1}}> */}
          <Toast
            message={message}
            visible={showToast}
            error={error}
            onClose={hideToastHandler}
          />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setUserInfo({...userInfo, dob: date.toDateString()});
            }}
            onCancel={() => {
              setOpen(false);
            }}
            mode="date"
          />
          <Text style={styles.signupText}>Sign up</Text>
          <View style={styles.signupFormContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.signupFormText}>Full Name</Text>
              <TextInput
                style={styles.signupFormInput}
                placeholder="Full Name"
                placeholderTextColor={colorsobject.grey7}
                onChangeText={text =>
                  setUserInfo({...userInfo, fullName: text})
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.signupFormText}>Set Username</Text>
              <TextInput
                style={styles.signupFormInput}
                placeholder="Set Username"
                placeholderTextColor={colorsobject.grey7}
                onChangeText={text =>
                  setUserInfo({...userInfo, username: text})
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.signupFormText}>Email</Text>
              <TextInput
                style={styles.signupFormInput}
                placeholder="Email"
                placeholderTextColor={colorsobject.grey7}
                value={userInfo.email}
                onChangeText={text => setUserInfo({...userInfo, email: text})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.signupFormText}>Phone Number</Text>
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
                  marginTop: 13,
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
                    paddingLeft: 70,
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
                style={[
                  styles.signupFormInput,
                  {
                    paddingLeft: 60,
                  },
                ]}
                placeholder="Phone Number"
                placeholderTextColor={colorsobject.grey7}
                value={userInfo.phone}
                onChangeText={text => setUserInfo({...userInfo, phone: text})}
              />
            </View>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setOpen(true)}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/sf-regular/48/C51FBE/calendar.png',
                }}
                style={styles.dateIcon}
              />
              <Text style={styles.signupFormText}>Date of birth</Text>
              <TextInput
                style={styles.signupFormInput}
                placeholder="Date of birth"
                placeholderTextColor={colorsobject.grey7}
                value={date.toDateString()}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.signupBtn}
        onPress={() => {
          console.log(userInfo)
          addUser()
        }}
        >
          <Text style={styles.signupBtnText}>
            Submit
          </Text>
        </TouchableOpacity> */}
            {/* <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[colorsobject.secondarycolor, colorsobject.themecolor]}
              style={styles.signupBtn}> */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.signupBtn}
              onPress={() => {
                console.log(userInfo);
                dispatch(CreateUser(userInfo, navigation));
              }}>
              {create_user_loading ? (
                <ActivityIndicator size="small" color={colorsobject.black} />
              ) : (
                <Text style={styles.signupBtnText}>Submit</Text>
              )}
            </TouchableOpacity>
            {/* </LinearGradient> */}
          </View>
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
