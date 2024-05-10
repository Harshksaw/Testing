import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GetAllProTags,
  GetUserDetails,
  UpdateUserProTag,
  showToastMessage,
} from '../../redux/actions/userActions';
import {BASE_URL, TOKEN} from '../../redux/store';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const Protags = ({navigation}) => {
  const {accountId, all_tags, tag_add_success} = useSelector(
    (state: any) => state.user,
  );
  const {user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [USERID, setUSERID] = useState<any>(null);
  const [ACCID, setACCID] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  // Music Genres
  const genres = [
    'Influencer',
    'Artist',
    'Photographer',
    'Filmmaker',
    'Musician',
    'Vlogger',
    'Designer',
    'Dancer',
    'Writer',
    'Streamer',
    '⁠Comedian',
    'Artist manager',
  ];
  const [selectedGenres, setSelectedGenres] = useState({});

  useEffect(() => {
    console.log('Account ID FROM REDUX', accountId);
    getAccountId();
    dispatch(GetAllProTags());
  }, []);

  useEffect(() => {
    console.log('ALL TAGS IN PRO TAGS SCREEN', all_tags);
  }, [all_tags]);

  useEffect(() => {
    if (tag_add_success === true) {
      dispatch(GetUserDetails(ACCID));
      navigation.goBack();
    }
  }, [tag_add_success]);

  useEffect(() => {
    console.log('USER FROM REDUX in Fav Genres screen ->>>>>>>>', user);
    setSelectedGenres(
      user?.genres === ''
        ? []
        : user?.genres?.split(',').filter((g: string) => g !== ''),
    );
  }, [user]);

  useEffect(() => {
    console.log('SELECTED GENRES', selectedGenres);
  }, [selectedGenres]);

  const getAccountId = async () => {
    const value = await AsyncStorage.getItem('accountId');
    const value2 = accountId;
    // remove double quotes if any
    const AID = value?.replace(/['"]+/g, '') || value2?.replace(/['"]+/g, '');
    return setACCID(AID || null);
  };

  const UpdateUserDetails = async () => {
    setLoading(true);
    // create a string from genres array

    if (ACCID) {
      try {
        setLoading(true);
        const response = await axios.put(
          `${BASE_URL}/appaccount/${ACCID}`,
          {
            tag: selectedGenres,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: TOKEN?._j,
            },
          },
        );

        console.log('RESPONSE ------>', response);
        console.log('RESPONSE Data ------>', response?.data);
        if (
          response?.status === 200 ||
          response?.status === 201 ||
          response?.status === 204
        ) {
          setLoading(false);
          console.log('USER DETAILS', response?.data);
          dispatch(
            showToastMessage(true, `User details saved successfully`, false),
          );

          dispatch(GetUserDetails(ACCID));
          navigation.goBack();
        } else {
          //Alert.alert(`${response?.data}`);
          setLoading(false);
          dispatch(
            showToastMessage(
              true,
              `Unexpected token status ${response.status}`,
              true,
            ),
          );
          console.log('USER DETAILS ERROR', response);
        }
      } catch (error) {
        //Alert.alert(`${error}`)
        if (error.response) {
          setLoading(false);
          dispatch(
            showToastMessage(
              true,
              `error ${error.response.status + error.response.data.message}`,
              true,
            ),
          );
        } else if (error.request) {
          setLoading(false);
          dispatch(showToastMessage(true, `no response received`, true));
        } else {
          setLoading(false);
          dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
        }
        console.log('ERROR ------>', error);
      }
    } else {
      setLoading(false);
      //Alert.alert(`USER ID NOT FOUND`)
      console.log('USER ID NOT FOUND');
    }
  };

  return (
    <View style={styles.container}>
      <Toast position="top" bottomOffset={20} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.arrowContainer, {width: '10%'}]}>
        <Image
          source={{
            uri: 'https://img.icons8.com/ios-filled/100/FFFFFF/left.png',
          }}
          style={styles.arrow}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Choose Pro-Tags</Text>
      <Text
        style={[
          styles.subtitle,
          {
            fontSize: 14,
            color: colorsobject.white,
          },
        ]}>
        Select at least 1 Pro-Tags
      </Text>
      <ScrollView style={{flex: 1}}>
        <View style={styles.genreContainer}>
          {genres?.map((genre, index) => (
            <TouchableOpacity
              key={index}
              style={
                selectedGenres === genre
                  ? [styles.genre, styles.genreSelected]
                  : styles.genre
              }
              activeOpacity={0.8}
              onPress={() => {
                if (selectedGenres === genre) {
                  setSelectedGenres('');
                } else {
                  setSelectedGenres(genre);
                }
              }}>
              <Text style={[styles.genreText, {color: colorsobject.white}]}>
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* Show if 5 genres are selected */}
      {selectedGenres ? (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => {
              // addUserGenres()
              // saveUser()
              UpdateUserDetails();
              console.log('buttun pressed');
            }}>
            {loading ? (
              <ActivityIndicator size="small" color={colorsobject.white} />
            ) : (
              <Text style={{color: colorsobject.white}}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: colorsobject.grey}]}
            onPress={() => {
              // saveUser()
              // navigation.navigate('Home');
            }}
            disabled={true}>
            <Text style={{color: colorsobject.white}}>Select a Pro tag</Text>
            {/* <Icon name="arrowright" size={20} color={colorsobject.white} /> */}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Protags;
