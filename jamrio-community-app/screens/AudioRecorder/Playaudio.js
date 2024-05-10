// import AudioRecorderPlayer, {
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
//   AudioEncoderAndroidType,
//   AudioSourceAndroidType,
//   OutputFormatAndroidType,
// } from 'react-native-audio-recorder-player';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
  Image,
} from 'react-native';
import React, {Component} from 'react';

import RNFetchBlob from 'rn-fetch-blob';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import Waveform from './Waveform';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import Playwave from './Playwave';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const screenWidth = Dimensions.get('screen').width;

class Playaudio extends Component {
  dirs = RNFetchBlob.fs.dirs;
  path = Platform.select({
    ios: undefined,
    android: undefined,

    // Discussion: https://github.com/hyochan/react-native-audio-recorder-player/discussions/479
    // ios: 'https://firebasestorage.googleapis.com/v0/b/cooni-ebee8.appspot.com/o/test-audio.mp3?alt=media&token=d05a2150-2e52-4a2e-9c8c-d906450be20b',
    // ios: 'https://staging.media.ensembl.fr/original/uploads/26403543-c7d0-4d44-82c2-eb8364c614d0',
    // ios: 'hello.m4a',
    // android: `${this.dirs.CacheDir}/hello.mp3`,
  });

  constructor(props) {
    super(props);
    const {route, navigation, profileAudio} = this.props;
    const audioWave = profileAudio?.wave;
    console.log('AUDIO WAVE', audioWave);
    const maxValue = 50;
    this.state = {
      // recordSecs: profileAudio?.recordSecs,
      recordSecs: 20122,
      currentDB: '-160',
      currentPositionSec: 0,
      currentMeteringSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      wave: audioWave,
      waveduplicate: audioWave,
      // wave: [
      //   -21, -16, -19, -18, -24, -25, -28, -30, -34, -19, -6, -31, -35, -35,
      //   -34, -33, -7, -34, -36, -36, -7, -33, -35, -34, -35, -7, -35, -34, -34,
      //   -7, -34, -34, -33, -4, -30, -34, -25, -5, -31, -33, -33, -34, -5, -34,
      //   -34, -5, -31, -36, -34, -7, -34, -34, -7, -35, -32, -5, -32, -34, -31,
      //   -7, -33, -34, -6, -35, -35, -34, -7,
      // ],
      // waveduplicate: [
      //   -21, -16, -19, -18, -24, -25, -28, -30, -34, -19, -6, -31, -35, -35,
      //   -34, -33, -7, -34, -36, -36, -7, -33, -35, -34, -35, -7, -35, -34, -34,
      //   -7, -34, -34, -33, -4, -30, -34, -25, -5, -31, -33, -33, -34, -5, -34,
      //   -34, -5, -31, -36, -34, -7, -34, -34, -7, -35, -32, -5, -32, -34, -31,
      //   -7, -33, -34, -6, -35, -35, -34, -7,
      // ],
      path: profileAudio?.path,
      newWave: [],
      intervalId: null,
      seconds: 0,
      isRunning: false,
      progressbarwidth: 0,
      disableplay: false,
      disablerecord: false,
      disablepaus0: true,
      disablestop: true,
      disableretake: false,
      disableplaypause: true,
      disableplaystop: true,

      disableupload: true,
    };

    // this.audioRecorderPlayer = new AudioRecorderPlayer();
    // this.audioRecorderPlayer.setSubscriptionDuration(0.3); // fetch audio volume in every 30 milisecond
  }

  copyWaveToNewArray = () => {
    const {waveduplicate, newWave} = this.state;
    if (waveduplicate.length > 0) {
      const [first, ...rest] = waveduplicate;
      this.setState({
        waveduplicate: rest,
        newWave: [...newWave, first],
      });
    }
  };

  render() {
    let playWidth = this.state.disableplay
      ? 0
      : (this.state.currentPositionSec / this.state.currentDurationSec) *
        (this.state.recordSecs / 81);

    if (!playWidth) {
      playWidth = 0;
    }

    return (
      <SafeAreaView style={[styles.container2]}>
        <TouchableOpacity
          style={[styles.playbtn]}
          onPress={() => {
            this.state.disableplaystop ? this.onStartPlay() : this.onStopPlay();
            console.log('path ----->', this.state.path);
            console.log('wave ----->', this.state.wave);
          }}>
          {this.state.disableplaystop ? (
            <Image
              source={require('../../assets/images/play.png')}
              style={{
                resizeMode: 'contain',
                aspectRatio: 1,
                width: 20,
                height: 20,
              }}
            />
          ) : (
            <Image
              source={require('../../assets/images/stop.png')}
              style={{
                resizeMode: 'contain',
                aspectRatio: 1,
                width: 20,
                height: 20,
              }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.viewPlayer}>
          {/* <TouchableOpacity style={styles.viewBarWrapper}>
                  <View style={styles.viewBar}>
                    <View style={[styles.viewBarPlay, {width: playWidth}]} />
                  </View>
                </TouchableOpacity> */}
          <Waveform
            wave={this.state.wave}
            style={{
              position: 'absolute',
              top: responsiveWidth(-2),
            }}
            wavestyle={{backgroundColor: 'grey'}}
          />
          <Playwave wave={this.state.newWave} />
        </View>
      </SafeAreaView>
    );
  }

  onStartPlay = async () => {
    console.log(
      'onStartPlay',
      // 'file:////data/user/0/com.jamrio_com_app/cache/sound.mp4',
      this.state.path,
    );

    try {
      const msg = 'file:////data/user/0/com.jamrio_com_app/cache/sound.mp4';
      this.setState({msg});
      //? Default path
      // const msg = await this.audioRecorderPlayer.startPlayer();

      console.log(`path: ${msg}`, `volume: ${volume}`);

      const intervalId = setInterval(this.copyWaveToNewArray, 300); // Call copyWaveToNewArray every 30 milliseconds
      this.setState({intervalId});
    } catch (err) {
      //Alert.alert(`${err}`);
      console.log('startPlayer error', err);
    }
  };
}

export default Playaudio;

const styles = StyleSheet.create({
  container2: {
    flexDirection: 'row',
    padding: responsiveWidth(5),
    position: 'relative',
  },

  viewPlayer: {marginHorizontal: moderateScale(20)},
  viewBarWrapper: {
    marginTop: verticalScale(17),
    marginHorizontal: scale(28),
    width: moderateScale(242.89),
  },
  viewBar: {
    // backgroundColor: 'black',
    height: verticalScale(4),
    alignSelf: 'stretch',
    width: moderateScale(242.89),
  },
  viewBarPlay: {
    backgroundColor: 'red',
    height: verticalScale(4),
    width: scale(0),
  },

  playbtn: {
    backgroundColor: colorsobject.themecolor,
    height: verticalScale(40),
    width: verticalScale(40),
    borderRadius: scale(23),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
