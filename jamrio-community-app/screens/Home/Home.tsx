import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import playIcon from '../../assets/images/playIcon.png';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import AnimatedStack from '../../components/AnimatedStack/AnimatedStack';
import BottomNav from '../../components/BottomNav/BottomNav';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  GetAllProTags,
  GetUserDetails,
  PauseVideo,
  ReloadOnSwipeCount,
  SetCurrentRoute,
  storeAccountId,
  storeUserId,
  showToastMessage,
} from '../../redux/actions/userActions';
import {BASE_URL, TOKEN} from '../../redux/store';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {io} from 'socket.io-client';
import SocketService from '../../SocketService';
import SocketIOClient from 'socket.io-client';

import moment from 'moment';
import AppLovinMAX from 'react-native-applovin-max';
import Toast from '../../components/Toast';
import auth from '@react-native-firebase/auth';

const getToken = async () => {
  const token = await AsyncStorage.getItem('accountId');

  console.log(
    '-------------async token from local storage--------------',
    token?.replace(/['"]+/g, ''),
  );
  return token;
};

const Home = ({navigation}) => {
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
  const {accountId, swipe_count_reload} = useSelector(
    (state: any) => state.user,
  );
  const {user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [USERID, setUSERID] = useState(null);
  const [ACCID, setACCID] = useState(null);
  const [deviceToken, setDeviceToken] = useState<string | null>(null);
  const [deviceTokensFromDB, setDeviceTokensFromDB] = useState([]);
  const [today, setToday] = useState(moment().format('DD-MM-YYYY'));
  const [todayInAsync, setTodayInAsync] = useState('');
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route);

  AppLovinMAX.initialize(
    'Vf5vBwhvFWuUBEarkNs_dSahRsMuTZQ6nWWPwiIVwhTCzAyhA5D_w11pV_gKXqwBRilOMIpCImUiuvbcgTg2XW',
  )
    .then(configuration => {
      // SDK is initialized, start loading ads
      initializeRewardedAds();
    })
    .catch(error => {
      // Failed to initialize SDK

      console.error('Failed to initialize SDK', error);
    });

  // const socket = io(`${BASE_URL}/chats/message`, {
  //   extraHeaders: {
  //     userid: getToken(),
  //   },
  // });
  // const socket = io(`${BASE_URL}/chats/message`, {
  //   extraHeaders: {
  //     'userid': user?.id,
  //   },
  // });

  // const socket = io(`${BASE_URL}/chats/message`, {
  //   extraHeaders:{
  //     'userid': user?.id,
  //   }
  // })

  // useEffect(() => {

  //   return () => {
  //     socket.off('receive');
  //   }
  // }, []);
  // socket.on('connect', data => {
  //   console.log('SOCKET CONNECTED HOME-------');
  // });
  // socket.on('receive', data => {
  //   console.log('SOCKET Received -----------------------------', data);
  //   // setSocketAllMessages([JSON.parse(data)])
  // });
  // useEffect(() => {

  // }, [socket]);

  useEffect(() => {
    getAccountId();
    getDeviceToken();
    FetchUserTokens();
    getSwipeCount();

    const tday = moment().format('DD-MM-YYYY');
    setToday(tday);

    getTodayFromAsync().then(res => {
      setTodayInAsync(res);
    });

    dispatch(GetAllProTags());
    dispatch(PauseVideo(false));
  }, []);

  useEffect(() => {
    // refresh firebase auth token for current user
    auth().onAuthStateChanged(user => {
      if (user) {
        const idToken = user.getIdToken(true);
        console.log(
          '---------------Refreshed ID Token------------------',
          idToken,
        );
        saveAccessToken(idToken);
      }
    });
  }, []);

  useEffect(() => {
    console.warn('------------ROUTE NAME--------------', routeName);
    dispatch(SetCurrentRoute(routeName));
    if (routeName === 'Match') {
      dispatch(PauseVideo(false));
    } else {
      dispatch(PauseVideo(true));
    }
  }, [routeName]);

  useEffect(() => {
    console.log('---------------TODAY IN ASYNC--------------', todayInAsync);
    console.log('---------------TODAY--------------', today);

    if (todayInAsync !== today) {
      setTodayToAsync();
      saveSwipeCount();
    } else {
      console.log('TODAY ALREADY SET');
    }
  }, [todayInAsync]);

  useEffect(() => {
    // prevent closing app on back button press
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      navigation.navigate('Home');
    });
  }, [navigation]);

  useEffect(() => {
    console.log('ACC ID in HOME', ACCID);
    dispatch(GetUserDetails(ACCID));

    if (ACCID === '' || ACCID === null || ACCID === undefined) {
      navigation.navigate('Login');
    }
  }, [ACCID]);

  useEffect(() => {
    dispatch(storeAccountId(ACCID));
  }, [user]);

  useEffect(() => {
    console.log('DEVICE TOKEN', deviceToken);
    // if(deviceToken !== user?.deviceToken){
    //   AddUserToken();
    // }
  }, [deviceToken]);

  useEffect(() => {
    console.log('DEVICE TOKENS FROM DB', deviceTokensFromDB);
    if (!deviceTokensFromDB?.includes(deviceToken)) {
      AddUserToken();
    }
  }, [deviceTokensFromDB, deviceToken]);

  useEffect(() => {
    // if (user === null || user === undefined) {
    //   navigation.navigate('Login');
    // }
  }, [user]);

  useEffect(() => {
    getSwipeCount();
  }, [swipe_count_reload]);

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

  const getTodayFromAsync = async () => {
    const tday = await AsyncStorage.getItem('today');
    return tday;
  };

  const setTodayToAsync = async () => {
    const tday = moment().format('DD-MM-YYYY');
    await AsyncStorage.setItem('today', tday);
    setTodayInAsync(tday);
  };

  const saveSwipeCount = async () => {
    console.log('================================');
    console.log('Setting count from home', 0);
    console.log('================================');
    await AsyncStorage.setItem('swipeCount', JSON.stringify(0));
  };

  const getAccountId = async () => {
    const value = await AsyncStorage.getItem('accountId');

    // remove double quotes if any
    const AID = value?.replace(/['"]+/g, '');

    if (!AID) {
      navigation.navigate('Login');
    }
    return setACCID(AID || null);
  };

  const getDeviceToken = async () => {
    const token = await AsyncStorage.getItem('deviceToken');

    if (!token || token === null || token === undefined) {
      navigation.navigate('Login');
    }
    setDeviceToken(token);
  };

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
        // //Alert.alert(`${response?.data}`);
        console.log('DEVICE TOKEN NOT FOUND IN DB');
        AddUserToken();
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected token status` + response.status,
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
    } catch (err) {
      if (err.response) {
        // Toast.show({
        //   type: 'error',
        //   text1: err.response.status,
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
      } else if (err.request) {
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
        //   text1: 'Error:- ' + err.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
      }
      // //Alert.alert(`${err}`)
      console.log('TOKEN FETCHING ERR ______', err);
    }
  };

  const AddUserToken = async () => {
    console.log(`
      USERID: ${user?.id}
      FCMTOKEN: ${deviceToken}
      PLATFORM: android
    `);

    // remove double quotes if any
    const dtoken = deviceToken?.replace(/['"]+/g, '');

    try {
      const response = await axios.post(
        `${BASE_URL}/notification/adduser`,
        {
          userId: user?.id,
          fcmToken: dtoken,
          platform: 'android',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN?._j,
          },
        },
      );

      console.log('RESPONSE ADD TOKEN ------>', response);
      if (
        response?.status === 201 ||
        response?.status === 200 ||
        response?.status === 204
      ) {
        console.log('TOKEN ADDED SUCCESSFULLY');
        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `success`, false));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected token status` + response.status,
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
    } catch (err) {
      // //Alert.alert(`${err}`)
      if (err.response) {
        // Toast.show({
        //   type: 'error',
        //   text1: err.response.status,
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
      } else if (err.request) {
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
        //   text1: 'Error:- ' + err.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
      }
      console.log('TOKEN ADDING ERR ______', err);
    }
  };

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  //TODO: REMOVE FROM CHAT SCREEN
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const body = remoteMessage?.notification?.body;
      const title = remoteMessage?.notification?.title;
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Toast.show({
      //   type: 'success',
      //   text1: title,
      //   text2: body,
      //   visibilityTime: 5000,
      //   autoHide: true,
      // });
      dispatch(showToastMessage(true, `success`, false));
    });
    // TOKEN DATA
    // A new FCM message arrived! {"notification":{"android":{"sound":"mySound","smallIcon":"myicon"},"body":"chat 947","title":"Mayani"},"sentTime":1696955301567,"data":{},"from":"645340176056","messageId":"0:1696955301589004%e98aea73e98aea73","ttl":2419200,"collapseKey":"com.jamrio_com_app"}
    return unsubscribe;
  }, []);

  const getSwipeCount = async () => {
    const value = await AsyncStorage.getItem('swipeCount');
    // remove double quotes if any
    console.log('================================');
    console.log('swipe count VALUE in found async', value);
    console.log('================================');
    const swipe = value ? parseInt(value) : swipeCount;
    console.log('================================');
    console.log('swipe count in found async', swipe);
    console.log('================================');
    dispatch(ReloadOnSwipeCount(false));

    return setSwipeCount(swipe || 0);
  };

  const saveSwipeCountAfterAds = async () => {
    var count1 = (await AsyncStorage.getItem('swipeCount')) ?? '0';

    // Convert count1 to a number
    const count = parseInt(count1, 30) - 10;

    console.log('================================');
    console.error('Setting count in home', count);
    console.log('================================');
    if (count === 0) {
      AsyncStorage.setItem('swipeCount', JSON.stringify(0));
      dispatch(ReloadOnSwipeCount(true));
    } else {
      AsyncStorage.setItem('swipeCount', JSON.stringify(count));
      dispatch(ReloadOnSwipeCount(true));
    }
  };

  // ADVERTISEMENTS SECTION

  const REWARDED_AD_UNIT_ID = Platform.select({
    android: 'c504523c2388c71e',
    // ios: 'YOUR_IOS_REWARDED_AD_UNIT_ID',
  });

  const initializeRewardedAds = () => {
    AppLovinMAX.addRewardedAdLoadedEventListener(() => {
      // Rewarded ad is ready to show. AppLovinMAX.isInterstitialReady(REWARDED_AD_UNIT_ID) now returns 'true'

      // Reset retry attempt
      setRetryAttempt(0);
    });
    AppLovinMAX.addRewardedAdLoadFailedEventListener(() => {
      // Rewarded ad failed to load
      // AppLovin recommends that you retry with exponentially higher delays up to a maximum delay (in this case 64 seconds)

      setRetryAttempt(retryAttempt + 1);
      const retryDelay = Math.pow(2, Math.min(6, retryAttempt));

      console.log(
        'Rewarded ad failed to load - retrying in ' + retryDelay + 's',
      );

      setTimeout(function () {
        loadRewardedAd();
      }, retryDelay * 1000);
    });
    AppLovinMAX.addRewardedAdClickedEventListener(() => {
      // Rewarded ad clicked
      console.log('Rewarded ad clicked');
    });
    AppLovinMAX.addRewardedAdDisplayedEventListener(() => {
      // Rewarded ad displayed
      console.log('Rewarded ad displayed');
      saveSwipeCountAfterAds();
      Alert.alert('Enjoy your +10 swipes');
    });
    AppLovinMAX.addRewardedAdFailedToDisplayEventListener(() => {
      // Rewarded ad failed to display. AppLovin recommends that you load the next ad
      loadRewardedAd();
    });
    AppLovinMAX.addRewardedAdHiddenEventListener(() => {
      loadRewardedAd();
    });
    AppLovinMAX.addRewardedAdReceivedRewardEventListener(() => {
      // Rewarded ad displayed and user should receive the reward
    });

    // Load the first rewarded ad
    loadRewardedAd();
  };

  const loadRewardedAd = () => {
    AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
  };

  return (
    <>
      <View style={styles.homeContainer}>
        {/* <BottomNav /> */}
        <Toast
          message={message}
          visible={showToast}
          error={error}
          onClose={hideToastHandler}
        />
        <BottomNavigation />
      </View>
    </>
  );
};

export default Home;
