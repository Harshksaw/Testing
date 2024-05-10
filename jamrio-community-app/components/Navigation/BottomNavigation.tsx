import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
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
import Profile from '../../screens/Profile/Profile';
import AnimatedStack from '../AnimatedStack/AnimatedStack';
import Example from '../Swiper/Swiper';
import styles from './bottomNavStyles';
import MessagesScreen from '../../screens/Community/MesssagesScreen/MessagesScreen';
import Notification from '../../screens/Notification/Notification';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {GetAllProTags, PauseVideo} from '../../redux/actions/userActions';
import Leaderboard from '../../screens/leaderboard/Leaderboard';
import Settings from '../../screens/Settings/Settings';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const [active, setActive] = useState<string>('Matching');

  const MatchScreen = useCallback(() => {
    const Focused = useIsFocused();
    if (Focused) {
      setActive('Matching');
      dispatch(PauseVideo(false));
    }
    return <Example />;
  }, [setActive]);

  // get logged in user
  useEffect(() => {
    const user1 = auth().currentUser;
    setUser(user1);
    console.log('user:', user1);
    dispatch(GetAllProTags());
  }, []);

  return (
    <Tab.Navigator
      tabBar={({state, descriptors, navigation}) => (
        <View style={styles.container}>
          <View style={styles.icons}>
            {/* Profile */}
            {active === 'Profile' ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconContainerActive}>
                <Image
                  source={require('../../assets/images/profile-filled.png')}
                  style={styles.iconactive}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconContainer}
                onPress={() => {
                  setActive('Profile');
                  dispatch(PauseVideo(true));
                  navigation.navigate('Profile');
                }}>
                <Image
                  source={require('../../assets/images/profile.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            {active === 'Notification' ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconContainerActive}>
                <Image
                  source={require('../../assets/images/notification-filled.png')}
                  style={styles.iconactive}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconContainer}
                onPress={() => {
                  setActive('Notification');
                  dispatch(PauseVideo(true));
                  navigation.navigate('Notification');
                }}>
                <Image
                  source={require('../../assets/images/notification.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            {/* Matching */}
            {active === 'Matching' ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconContainerActive}>
                <Image
                  source={require('../../assets/images/heart-filled.png')}
                  style={styles.iconactive}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconContainer}
                onPress={() => {
                  setActive('Matching');
                  dispatch(PauseVideo(false));
                  navigation.navigate('Match');
                }}>
                <Image
                  source={require('../../assets/images/heart.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}

            {/* Notifications */}

            {/* Messages */}
            {active === 'Message' ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconContainerActive}>
                <Image
                  source={require('../../assets/images/messages-filled.png')}
                  style={styles.iconactive}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconContainer}
                onPress={() => {
                  setActive('Message');
                  dispatch(PauseVideo(true));
                  navigation.navigate('MessagesScreen');
                }}>
                <Image
                  source={require('../../assets/images/messages.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            {active === 'Settings' ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconContainerActive}>
                <Image
                  source={require('../../assets/images/settings_filled.png')}
                  style={styles.iconactive}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconContainer}
                onPress={() => {
                  setActive('Settings');
                  dispatch(PauseVideo(true));
                  navigation.navigate('Settings');
                }}>
                <Image
                  source={require('../../assets/images/settings.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}>
      <Tab.Screen
        name={'Match'}
        component={MatchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'Notification'}
        // component={Leaderboard}
        component={Notification}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'Settings'}
        component={Settings}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
