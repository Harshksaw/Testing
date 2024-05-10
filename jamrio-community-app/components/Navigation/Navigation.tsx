import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Login from '../../screens/Login/Login';
import Signup from '../../screens/Signup/Signup';
import ForgotPassword from '../../screens/ForgotPassword/ForgotPassword';
import FavGenre from '../../screens/FavGenres/FavGenre';
import Home from '../../screens/Home/Home';
import Artists from '../../screens/Community/InboxScreen';
import Profile from '../../screens/Profile/ViewProfile/ViewProfile';
import InboxScreen from '../../screens/Community/InboxScreen';
import RoomsScreen from '../../screens/Community/RoomsScreen';
import ChatScreen from '../../screens/Community/ChatScreen/ChatScreen';
import MessagesScreen from '../../screens/Community/MesssagesScreen/MessagesScreen';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneLogin from '../../screens/PhoneLogin/PhoneLogin';
import OtherUserProfile from '../../screens/Profile/OtherUserProfile/OtherUserProfile';
import SplashScreen from '../../screens/Splashscreen/Splashscreen';
import GroupChatScreen from '../../screens/Community/ChatScreen/GroupChatScreen';
import Swiper from '../Swiper/Swiper';
import Example from '../Swiper/Swiper';

import AdsScreen from '../../screens/AdsScreen/AdsScreen';
import BuyPremiumScreen from '../../screens/BuyPremium/BuyPremiumScreen';
import VideoContent from '../../screens/VideoContent/VideoContent';
import Separate_video from '../../screens/VideoContent/Separate_video';
import UploadVideo from '../../screens/Profile/ViewProfile/UploadVideo';
import Protags from '../../screens/FavGenres/Protags';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [userIdAsync, setUserIdAsync] = useState<any>(null); //from async storage
  const [user, setUser] = useState<any>(null);

  // get logged in user
  useEffect(() => {
    const user1 = auth().currentUser;
    setUser(user1);
    console.log('user:', user1);
  }, []);

  // check async storage for user id
  useEffect(() => {
    getUserIdAsync();
  }, []);

  useEffect(() => {
    if (
      userIdAsync === null ||
      userIdAsync === undefined ||
      userIdAsync === ''
    ) {
      setUserIdAsync(null);
    }
  }, [userIdAsync]);

  const getUserIdAsync = async () => {
    try {
      const value2 = await AsyncStorage.getItem('accountId');
      if (value2 !== null) {
        console.log('USER ID FROM ASYNC STORAGE', value2);
        setUserIdAsync(value2);
      }
    } catch (error) {
      //Alert.alert(`${error}`)
      console.log(error);
    }
  };

  return (
    <NavigationContainer gestureEnabled={false}>
      {/* { */}
      {/* // Authenticated user */}
      <Stack.Navigator gestureEnabled={false}>
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'SplashScreen'}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Swiper'}
          component={Example}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'OtherUserProfile'}
          component={OtherUserProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InboxScreen"
          component={InboxScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RoomsScreen"
          component={RoomsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GroupChatScreen"
          component={GroupChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MessagesScreen"
          component={MessagesScreen}
          options={{headerShown: false}}
        />
        {/* </Stack.Navigator> */}
        {/* ) : ( */}
        {/* // Unauthenticated user */}
        {/* <Stack.Navigator> */}

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PhoneLogin"
          component={PhoneLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FavGenre"
          component={FavGenre}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Protags"
          component={Protags}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Ads'}
          component={AdsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'BuyPremium'}
          component={BuyPremiumScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'VideoContent'}
          component={VideoContent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Separate_video'}
          component={Separate_video}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'UploadVideo'}
          component={UploadVideo}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
