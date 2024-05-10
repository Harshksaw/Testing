/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigation from './components/Navigation/Navigation';
import messaging from '@react-native-firebase/messaging';
import {Provider, useSelector} from 'react-redux';
import store, {BASE_URL} from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {io} from 'socket.io-client';
import {colorsobject} from './assets/ProjectColors/Colorsobject';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    SplashScreen.hide();
  }, [2000]);

  useEffect(() => {
    fetchToken();
  }, []);

  // FIREBASE MESSAGING NOTIFICATION TOKEN
  const fetchToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();

    console.log('FIREBASE MESSAGING NOTIFICATION TOKEN ----->', token);

    // Save the token in async storage
    saveToken(token);
  };

  const saveToken = async (token: string) => {
    const serializedToken = JSON.stringify(token);
    await AsyncStorage.setItem('deviceToken', serializedToken);
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Toast />
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsobject.black,
  },
});

export default App;
