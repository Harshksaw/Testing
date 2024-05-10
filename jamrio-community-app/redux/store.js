import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

const getAccountId = async () => {
  const access_token = await AsyncStorage.getItem('access_token');
  // const AT = JSON.parse(access_token);
  return access_token;
};

export const BASE_URL = 'https://api.jamrio.com';
// export const BASE_URL = process.env.REACT_APP_BASE_URL;
// export const BASE_URL = 'https://dapi.jamrio.com';
// export const BASE_URL = 'http://192.168.0.107:3000';
console.log('BASE_URL', BASE_URL);
export const TEST_URL = 'http://192.168.0.105:3000';
export const TOKEN = getAccountId();

// SHIVANG's IP
// export const BASE_URL = 'http://192.168.0.106:3000';
// export const TEST_URL = 'http://192.168.0.106:3000';
