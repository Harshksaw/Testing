import SocketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from './redux/store';

const getToken = async () => {
  const token = await AsyncStorage.getItem('accountId');
  console.log(
    '-------------async token from local storage--------------',
    token?.replace(/['"]+/g, ''),
  );
  return token;
};

const socket = SocketIOClient(`${BASE_URL}/chats/message`, {
  extraHeaders: {
    userid: getToken(),
  },
});

const SocketService = {
  connect: () => {
    socket.connect();
  },
  disconnect: () => {
    socket.disconnect();
  },
  on: (event, callback) => {
    socket.on(event, callback);
  },
  off: (event, callback) => {
    socket.off(event, callback);
  },
  emit: (event, data) => {
    socket.emit(event, data);
  },
};

export default SocketService;
