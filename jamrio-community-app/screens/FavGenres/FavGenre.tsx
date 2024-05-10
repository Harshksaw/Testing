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
  GetUserDetails,
  showToastMessage,
} from '../../redux/actions/userActions';
import {BASE_URL, TOKEN} from '../../redux/store';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {TextInput} from 'react-native';

const SearchBar = ({searchText, setSearchText}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: colorsobject.darkgrey7,
          width: responsiveWidth(90),
          height: responsiveWidth(13),
          justifyContent: 'center',
          borderRadius: 50,
          flexDirection: 'row',
          marginTop: responsiveHeight(2),
          marginBottom: responsiveHeight(1),
        }}>
        <TextInput
          onChangeText={text => {
            setSearchText(text);
          }}
          value={searchText}
          placeholder="Search"
          placeholderTextColor={colorsobject.grey}
          style={{
            paddingHorizontal: 20,
            fontSize: 16,
            color: colorsobject.white,
            width: '90%',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            position: 'absolute',
            right: 10,
            top: 15,
          }}>
          <Icon name="search1" size={20} color={colorsobject.grey} />
        </View>
      </View>
    </View>
  );
};

const FavGenre = ({navigation}) => {
  const {accountId} = useSelector((state: any) => state.user);
  const {user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [USERID, setUSERID] = useState<any>(null);
  const [ACCID, setACCID] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  // const [genres, setGenres] = useState<string[]>([]);

  // // Function to dynamically merge arrays
  // const mergeArrays = (arraysToMerge, allArrays) => {
  //   return arraysToMerge.reduce((mergedArray, arrayName) => {
  //     const currentArray = allArrays[arrayName];
  //     if (currentArray) {
  //       mergedArray = [...mergedArray, ...currentArray];
  //     }
  //     return mergedArray;
  //   }, []);
  // };

  // Create the subcategories array

  // Music Genres
  const genres = [
    'Novelist',
    'Poet',
    'Journalist',
    'Blogger',
    'Copywriter',
    'Screenwriter',
    'Playwright',
    'Non-fiction Writer',
    'Gaming Streamer',
    'IRL (In Real Life) Streamer',
    'Talk Show Streamer',
    'Music Performance Streamer',
    'Art Creation Streamer',
    'Cooking Streamer',
    'Educational/Teaching Streamer',
    'Fitness/Workout Streamer',
    'Stand-up Comedian',
    'Sketch Comedian',
    'Improvisational Comedian',
    'Satirical Comedian',
    'Musical Comedian',
    'Character/Impersonation Comedian',
    'Storytelling Comedian',
    'Political/Social Commentary Comedian',
    'Daily Vlogger',
    'Travel Vlogger',
    'Food Vlogger',
    'Educational Vlogger',
    'Lifestyle Vlogger',
    'Gaming Vlogger',
    'Tech Review Vlogger',
    'Family Vlogger',
    'Graphic Designer',
    'Fashion Designer',
    'Interior Designer',
    'UX/UI Designer',
    'Industrial Designer',
    'Web Designer',
    'Motion Graphics Designer',
    'Packaging Designer',
    'Ballet Dancer',
    'Hip-hop Dancer',
    'Contemporary Dancer',
    'Ballroom Dancer',
    'Latin Dancer',
    'Jazz Dancer',
    'Tap Dancer',
    'Cultural/Traditional Dancer',
    'Lifestyle Influencer',
    'Beauty Influencer',
    'Fitness Influencer',
    'Gaming Influencer',
    'Parenting Influencer',
    'Travel Influencer',
    'Food Influencer',
    'Tech Influencer',
    'Painter',
    'Illustrator',
    'Sculptor',
    'Mixed Media Artist',
    'Street Artist',
    'Calligrapher',
    'Concept Artist',
    'Printmaker',
    'Portrait Photographer',
    'Landscape Photographer',
    'Fashion Photographer',
    'Wildlife Photographer',
    'Event Photographer',
    'Macro Photographer',
    'Architectural Photographer',
    'Documentary Photographer',
    'Director',
    'Screenwriter',
    'Cinematographer',
    'Editor',
    'Documentary Filmmaker',
    'Animator',
    'Short Film Director',
    'Experimental Filmmaker',
    'Singer',
    'Instrumentalists (Pianists, Guitarists, etc.)',
    'Bands/Musical Group',
    'Songwriter',
    'Producers/Beatmaker',
    'DJ',
    'Classical Musician',
    'Electronic Music Artist',
  ];

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [filteredGenres, setFilteredGenres] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    console.log('Account ID FROM REDUX', accountId);
    getAccountId();
  }, []);

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

  useEffect(() => {
    filterGenres(searchText);
  }, [searchText]);

  const getAccountId = async () => {
    const value = await AsyncStorage.getItem('accountId');
    const value2 = accountId;
    // remove double quotes if any
    const AID = value?.replace(/['"]+/g, '') || value2?.replace(/['"]+/g, '');
    return setACCID(AID || null);
  };

  const UpdateUserGenres = async () => {
    setLoading(true);
    const genresArray = selectedGenres?.toString();
    console.log('GENRES ARRAY in STRING', genresArray);
    // [a, b, c], "a,b,c"
    try {
      const response = await axios.put(
        `${BASE_URL}/appaccount/${ACCID}`,
        {
          genres: genresArray,
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
        dispatch(GetUserDetails(ACCID));
        navigation.navigate('Home');
        // Toast.show({
        //   text1: 'Genres updated successfully',
        //   type: 'success',
        // });
        dispatch(
          showToastMessage(true, `User details updated sucessfully`, false),
        );
        setLoading(false);
      } else {
        //Alert.alert(`${response?.data}`);
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
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //Alert.alert(`${error}`)
      if (error.response) {
        // Toast.show({
        //   type: 'error',
        //   text1: error.response.status + error.response.data.message,
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
      } else if (error.request) {
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
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
      }
      console.log('ERROR ------>', error);
    }
  };

  const filterGenres = (text: string) => {
    setFilteredGenres([]);
    if (text === '') {
      setFilteredGenres(genres);
      return;
    } else {
      const filteredGenres = genres.filter(genre => {
        return genre.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredGenres(filteredGenres);
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.title}>Choose Talents</Text>

          <Text
            style={[
              styles.subtitle,
              {
                fontSize: 14,
                color: colorsobject.white,
              },
            ]}>
            Select upto 3 Talents
          </Text>
        </View>
        <Text
          style={[
            styles.subtitle,
            {
              fontSize: 28,
              color: colorsobject.white,
            },
          ]}>
          {selectedGenres?.length}/3
        </Text>
      </View>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <ScrollView style={{flex: 1}}>
        <View style={styles.genreContainer}>
          {filteredGenres
            .sort((a, b) => a.localeCompare(b))
            .map((genre, index) => (
              <TouchableOpacity
                key={index}
                style={
                  selectedGenres?.includes(genre)
                    ? [styles.genre, styles.genreSelected]
                    : styles.genre
                }
                activeOpacity={0.8}
                onPress={() => {
                  if (selectedGenres?.includes(genre)) {
                    setSelectedGenres(selectedGenres?.filter(g => g !== genre));
                  } else {
                    if (selectedGenres?.length < 3) {
                      setSelectedGenres([...selectedGenres, genre]);
                    }
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
      {selectedGenres?.length === 3 ? (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => {
              // addUserGenres()
              // saveUser()
              UpdateUserGenres();
            }}>
            {loading ? (
              <ActivityIndicator size="small" color={colorsobject.white} />
            ) : (
              <Text style={{color: colorsobject.white}}>Update</Text>
            )}
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.noBtn}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={[styles.noBtnText, {color: colorsobject.blue}]}>
              Skip
            </Text>
          </TouchableOpacity> */}
        </View>
      ) : (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: colorsobject.grey}]}
            onPress={() => {
              // saveUser()
              navigation.navigate('Home');
            }}
            disabled={true}>
            <Text style={{color: colorsobject.white}}>Select atleast 3</Text>
            {/* <Icon name="arrowright" size={20} color={colorsobject.white} /> */}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FavGenre;
