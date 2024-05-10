import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Video from 'react-native-video';
import AntIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {ReloadOnSwipeCount} from '../../redux/actions/userActions';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const AdsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [closeTimer, setCloseTimer] = useState(false);
  const [paused, setPaused] = useState(false);
  const [swipeCount, setSwipeCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCloseTimer(true);
    }, 15000);
  }, []);

  useEffect(() => {
    getSwipeCount();
  }, []);

  const CloseAdsBtn = () => (
    <TouchableOpacity
      onPress={() => {
        setPaused(true);
        // saveSwipeCount();
        navigation.goBack();
      }}
      style={styles.closeBtn}>
      <AntIcon name="closecircle" size={25} color={colorsobject.white} />
    </TouchableOpacity>
  );

  const getSwipeCount = async () => {
    const value = await AsyncStorage.getItem('swipeCount');
    // remove double quotes if any
    const swipe = value ? parseInt(value) : swipeCount;
    console.log('================================');
    console.log('swipe count in async', swipe);
    console.log('================================');
    dispatch(ReloadOnSwipeCount(false));

    return setSwipeCount(swipe || 0);
  };

  // const saveSwipeCount = async () => {
  //   const count = swipeCount - 10;

  //   console.log('================================');
  //   console.log('Setting count', count);
  //   console.log('================================');
  //   if(count === 0){
  //     AsyncStorage.setItem('swipeCount', JSON.stringify(0));
  //     dispatch(ReloadOnSwipeCount(true))
  //   } else {
  //     AsyncStorage.setItem('swipeCount', JSON.stringify(count));
  //     dispatch(ReloadOnSwipeCount(true))
  //   }
  // };

  return (
    <View style={styles.adsScreen}>
      {closeTimer && <CloseAdsBtn />}
      <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }} // Can be a URL or a local file.                                // Store reference
        onBuffer={e =>
          console.log('VIDEO BUFFER ------------------------------>', e)
        } // Callback when remote video is buffering
        onError={e =>
          console.log('VIDEO ERR ------------------------------>', e)
        } // Callback when video cannot be loaded
        style={styles.backgroundVideo}
        paused={paused}
      />
    </View>
  );
};

export default AdsScreen;
