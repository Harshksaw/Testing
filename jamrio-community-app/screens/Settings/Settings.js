import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import Header from '../../components/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Image} from 'react-native-elements';
import {
  storeAccountId,
  storeUserDetails,
  showToastMessage,
} from '../../redux/actions/userActions';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, TOKEN} from '../../redux/store';

const Settings = ({navigation}) => {
  useEffect(() => {
    getDeviceToken();
  }, []);
  const [deviceToken, setDeviceToken] = useState(null);
  const dispatch = useDispatch();
  const signOutUser = async () => {
    try {
      // remove from redux
      dispatch(storeAccountId(null, navigation));
      dispatch(storeUserDetails(null, navigation));
      deleteDeviceToken();
      // remove user id from async storage
      if ((await removeAccId()) && (await removeToken())) {
        console.log('User signed out!');
        await auth().signOut();
        navigation.navigate('Login');
      }
    } catch (error) {
      //Alert.alert(`${error}`);
      console.log(error);
    }
  };
  const removeAccId = async () => {
    try {
      await AsyncStorage.removeItem('accountId');
      console.log('ID REMOVED!!!');

      return true;
    } catch (error) {
      //Alert.alert(`${error}`);
      console.error(error);
    }
  };
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      console.log('TOKEN REMOVED!!!');
      return true;
    } catch (error) {
      //Alert.alert(`${error}`);
      console.error(error);
    }
  };
  const getDeviceToken = async () => {
    const token = await AsyncStorage.getItem('deviceToken');
    setDeviceToken(token);
  };
  const deleteDeviceToken = async () => {
    const dtoken = deviceToken?.replace(/['"]+/g, '');
    try {
      const response = await axios.delete(
        `${BASE_URL}/notification/bytoken/${dtoken}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN?._j,
          },
        },
      );

      console.log('RESPONSE DELETE TOKEN ------>', response);
      if (
        response?.status === 201 ||
        response?.status === 200 ||
        response?.status === 204
      ) {
        console.log('TOKEN DELETED SUCCESSFULLY');
        dispatch(showToastMessage(true, `success`, false));
      } else {
        dispatch(
          showToastMessage(
            true,
            `Unexpected token status ${response.status}`,
            true,
          ),
        );
      }
    } catch (error) {
      if (error.response) {
        dispatch(
          showToastMessage(
            true,
            `error ${error.response.status + error.response.data.message}`,
            true,
          ),
        );
      } else if (error.request) {
        dispatch(showToastMessage(true, `no response received`, true));
      } else {
        dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
      }
      console.log('TOKEN DELETING ERR ______', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Settings'} />

      <View style={styles.fieldcontainer}>
        <TouchableOpacity
          style={styles.field}
          onPress={() =>
            Linking.openURL('https://jamrio.com/terms-and-condition')
          }>
          <Text style={styles.fieldtxt}>Terms & Conditions</Text>

          <Image
            style={styles.icon}
            source={require('../../assets/images/dropup.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.field}
          onPress={() => Linking.openURL('https://jamrio.com/privacy-policy')}>
          <Text style={styles.fieldtxt}>Privacy Policy</Text>

          <Image
            style={styles.icon}
            source={require('../../assets/images/dropup.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.field}
          onPress={() =>
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.jamrio_com_app',
            )
          }>
          <Text style={styles.fieldtxt}>Rate Us</Text>

          <Image
            style={styles.icon}
            source={require('../../assets/images/dropup.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.field}
          onPress={() => Linking.openURL('https://wa.me/917031853012')}>
          <Text style={styles.fieldtxt}>Contact Us</Text>

          <Image
            style={styles.icon}
            source={require('../../assets/images/dropup.png')}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signOutBtn} onPress={signOutUser}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsobject.black,
  },
  fieldcontainer: {
    marginTop: responsiveHeight(2),
  },

  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colorsobject.grey2,
    paddingHorizontal: responsiveWidth(4),
  },
  fieldtxt: {
    color: colorsobject.white,
    fontSize: responsiveFontSize(2.3),
    fontWeight: '400',
  },
  icon: {
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    tintColor: colorsobject.themecolor,
    transform: [{rotate: '90deg'}],
  },
  signOutBtn: {
    backgroundColor: colorsobject.red,
    padding: 10,
    borderRadius: 50,
    width: '90%',
    position: 'absolute',
    marginVertical: 20,
    bottom: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  signOutText: {
    color: colorsobject.white,
    fontSize: 16,
  },
});
