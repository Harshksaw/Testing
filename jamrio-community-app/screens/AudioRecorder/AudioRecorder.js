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
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import RNFetchBlob from 'rn-fetch-blob';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import Waveform from './Waveform';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const screenWidth = Dimensions.get('screen').width;

class MainPage extends Component {
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
    const {route, navigation} = this.props;
    const maxValue = 50;
    this.state = {
      recordSecs: 0,
      recordTime: '00:00:00',
      currentDB: '-160',
      currentPositionSec: 0,
      currentMeteringSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      passwave: [],
      passrecordSecs: 0,
      wave: [],
      intervalId: null,
      seconds: 0,
      isRunning: false,
      progressbarwidth: 0,
      disableplay: true,
      disablerecord: false,
      disablepause: true,
      disablestop: true,
      disableretake: false,
      disableplaypause: true,

      disableupload: true,
      uploadedData: null,
    };

    // this.audioRecorderPlayer = new AudioRecorderPlayer();
    // this.audioRecorderPlayer.setSubscriptionDuration(0.3); // fetch audio volume in every 30 milisecond
  }

  render() {
    const {loading} = this.props;
    let playWidth = this.state.disableplay
      ? 0
      : (this.state.currentPositionSec / this.state.currentDurationSec) *
        (this.state.uploadedData.recordSecs / 81);

    if (!playWidth) {
      playWidth = 0;
    }

    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: colorsobject.darkgrey}]}>
        <View style={styles.container2}>
          <View style={{flexDirection: 'row'}}></View>
          <Text style={{color: 'white', fontSize: scale(15)}}>
            Record in silence zone
          </Text>
          <Text style={styles.txtRecordCounter}>
            {Math.floor(20 - this.state.recordSecs / 1000)}
          </Text>
          <View style={styles.viewRecorder}>
            <View style={styles.recordBtnWrapper}>
              <TouchableOpacity
                style={[styles.savebtn, {marginRight: scale(14)}]}
                onPress={() => {
                  this.onRetakeRecord();
                }}
                disabled={this.state.disableretake}>
                <Image
                  source={require('../../assets/images/reload.png')}
                  style={{
                    resizeMode: 'contain',
                    aspectRatio: 1,
                    width: 30,
                    height: 30,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.recordbtn}
                onPress={() => {
                  console.log(this.state.wave, this.state.disablepause);
                  if (this.state.disablepause) {
                    if (this.state.recordSecs === 0) {
                      this.onStartRecord();
                    } else {
                      this.onResumeRecord();
                    }
                  } else {
                    this.onPauseRecord();
                  }
                }}
                disabled={false}>
                {this.state.disablepause ? null : (
                  <Image
                    source={require('../../assets/images/pause.png')}
                    style={{
                      resizeMode: 'contain',
                      aspectRatio: 1,
                      width: 30,
                      height: 30,
                    }}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.savebtn,
                  {
                    marginLeft: scale(14),
                    backgroundColor: this.state.disablestop ? 'grey' : 'white',
                  },
                ]}
                onPress={this.onStopRecord}
                disabled={this.state.disablestop}>
                <Image
                  source={require('../../assets/images/check.png')}
                  style={{
                    resizeMode: 'contain',
                    aspectRatio: 1,
                    width: 30,
                    height: 30,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.playaudio}>
            <TouchableOpacity
              style={[
                styles.playbtn,
                {
                  backgroundColor: this.state.disableplay
                    ? 'grey'
                    : colorsobject.themecolor,
                },
              ]}
              onPress={() => {
                this.onStartPlay();
              }}
              disabled={this.state.disableplay}>
              <Image
                source={require('../../assets/images/play.png')}
                style={{
                  resizeMode: 'contain',
                  aspectRatio: 1,
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
            <View>
              <View style={styles.viewPlayer}>
                <TouchableOpacity style={styles.viewBarWrapper}>
                  <View style={styles.viewBar}>
                    <View style={[styles.viewBarPlay, {width: playWidth}]} />
                  </View>
                </TouchableOpacity>
                <View>
                  <Waveform
                    wave={this.state.wave}
                    wavestyle={{backgroundColor: 'white'}}
                  />
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={this.state.disableupload}
            style={[
              styles.button,
              {marginVertical: 10},
              {backgroundColor: this.state.disableupload ? 'grey' : 'white'},
            ]}
            onPress={this.onUpload}>
            {loading ? (
              <ActivityIndicator size="small" color={colorsobject.black} />
            ) : (
              <Text style={styles.buttonText}>Upload Audio</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  onUpload = () => {
    const {uploadedData} = this.state;
    const {setJsonAudioFile, jsonAudioFile, uploadNewAudio, setUploadNewAudio} =
      this.props;
    console.log('Uploaded Data:', uploadedData);

    if (uploadedData) {
      // If you want to access individual properties:
      const waveInCsv = uploadedData?.wave.join(',');
      console.log('Wave Array:', uploadedData?.wave);
      console.log('Wave CSV:', waveInCsv);
      console.log('Record Seconds:', uploadedData?.recordSecs);
      console.log('File Path:', uploadedData?.path);

      setJsonAudioFile({
        recordSecs: uploadedData.recordSecs,
        path: uploadedData.path,
        wave: waveInCsv,
      });
      // const jsonFile = {
      //   recordSecs: uploadedData?.recordSecs,
      //   path: uploadedData?.path,
      //   wave: waveInCsv,
      // };
    } else {
      console.log('Please record audio first');
      //Alert.alert('Please record audio first');
    }
  };

  onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const storageWriteStatus = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
        const storageReadStatus = await request(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        const recordAudioStatus = await request(
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        );

        console.log('Storage Write Permission:', storageWriteStatus);
        console.log('Storage Read Permission:', storageReadStatus);
        console.log('Record Audio Permission:', recordAudioStatus);

        if (
          storageWriteStatus === RESULTS.GRANTED &&
          storageReadStatus === RESULTS.GRANTED &&
          recordAudioStatus === RESULTS.GRANTED
        ) {
          console.log('All required permissions granted');
        } else {
          //Alert.alert(`Not All required permissions granted`);
          console.log('Not all required permissions granted');
        }
      } catch (error) {
        //Alert.alert(`${error}`);
        console.error('Error requesting permissions:', error);
      }
    }
    this.setState({
      disableplay: true,
      disablepause: false,
      disablestop: false,
      disableplaypause: true,
      disableupload: true,
    });
    const audioSet = {name: 'shivang'};

    this.setState({wave: []});

    console.log('audioSet', audioSet);
    const meteringEnabled = true;
    const uri = 'hii';

    console.log(`uri: ${uri}`);
  };

  onRetakeRecord = async () => {
    this.onStopRecord();
    this.onStartRecord();
  };
}

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
  button: {
    backgroundColor: colorsobject.white,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: colorsobject.black,
  },

  container2: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewRecorder: {
    width: '100%',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  viewPlayer: {
    marginTop: verticalScale(17),
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: verticalScale(17),
    marginHorizontal: scale(28),
    width: moderateScale(242.89),
  },
  viewBar: {
    backgroundColor: colorsobject.darkgrey,
    height: verticalScale(4),
    alignSelf: 'stretch',
    width: moderateScale(242.89),
  },
  viewBarPlay: {
    backgroundColor: 'red',
    height: verticalScale(4),
    width: scale(0),
  },

  recordbtn: {
    borderColor: 'white',
    borderWidth: scale(3),
    backgroundColor: 'red',
    height: verticalScale(45),
    width: verticalScale(45),
    borderRadius: scale(23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  savebtn: {
    borderColor: 'white',
    borderWidth: scale(1),
    backgroundColor: 'white',
    height: verticalScale(45),
    width: verticalScale(45),
    borderRadius: scale(23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  playbtn: {
    borderColor: 'grey',
    borderWidth: scale(1),
    backgroundColor: colorsobject.pink,
    height: verticalScale(40),
    width: verticalScale(40),
    borderRadius: scale(23),
    justifyContent: 'center',
    alignItems: 'center',
  },

  txt: {
    color: 'black',
    fontSize: scale(14),
    marginHorizontal: scale(8),
    marginVertical: verticalScale(4),
  },

  txtRecordCounter: {
    marginTop: verticalScale(5),
    color: 'red',
    fontSize: scale(15),
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: scale(3),
  },
  playaudio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: moderateScale(6),
  },
  uploadbtn: {
    width: moderateScale(200),
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(27),
    borderRadius: scale(6),
    marginTop: verticalScale(40),
  },
  uploadtxt: {
    color: 'white',
    padding: moderateScale(6),
    fontSize: scale(13),
    textAlign: 'center',
  },
});
