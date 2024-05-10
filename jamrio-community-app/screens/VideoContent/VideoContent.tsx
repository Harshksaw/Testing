import {
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import styles from './styles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Video from 'react-native-video';
import {useRoute} from '@react-navigation/native';

const VideoContent = () => {
  const route = useRoute();
  let videodata = route.params?.videodata;
  // const [items, setItems] = useState<any>([
  //   'Car',
  //   'Bike',
  //   'Boat',
  //   'Plane',
  //   'Rocket',
  // ]);
  const [buffering, setBuffering] = useState<any>(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll to index 5 when the component mounts
    flatListRef.current.scrollToIndex({index: 1, animated: true});
  }, []);

  if (Array.isArray(videodata) && videodata.length > 1) {
    videodata = videodata.slice(1); // Remove the first element
  }

  // const videosData = [
  //   {
  //     description:
  //       "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
  //     sources: [
  //       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //     ],
  //     subtitle: 'By Blender Foundation',
  //     thumb: 'images/BigBuckBunny.jpg',
  //     title: 'Big Buck Bunny',
  //   },
  //   {
  //     description: 'The first Blender Open Movie from 2006',
  //     sources: [
  //       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  //     ],
  //     subtitle: 'By Blender Foundation',
  //     thumb: 'images/ElephantsDream.jpg',
  //     title: 'Elephant Dream',
  //   },
  //   {
  //     description:
  //       'HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.',
  //     sources: [
  //       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  //     ],
  //     subtitle: 'By Google',
  //     thumb: 'images/ForBiggerBlazes.jpg',
  //     title: 'For Bigger Blazes',
  //   },
  //   {
  //     description:
  //       "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
  //     sources: [
  //       'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  //     ],
  //     subtitle: 'By Google',
  //     thumb: 'images/ForBiggerEscapes.jpg',
  //     title: 'For Bigger Escape',
  //   },
  //   {
  //     description:
  //       'Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.',
  //     sources: [
  //       'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest.mpd',
  //     ],
  //     subtitle: 'By Google',
  //     thumb: 'images/ForBiggerFun.jpg',
  //     title: 'For Bigger Fun',
  //   },
  // ];

  // const [videoSwiped, setVideoSwiped] = useState<any>(0);

  const screenHeight = responsiveHeight(100);

  const RenderVideo = ({item}: any) => (
    <View
      style={{
        backgroundColor: '#111',
        height: screenHeight,
        width: responsiveWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 5,
      }}
      key={item?.index}>
      <Video
        source={{
          uri: item?.uri,
        }} // Can be a URL or a local file.
        ref={ref => {
          this.player = ref;
        }} // Store reference
        onBuffer={
          b => {
            setBuffering(true);
            console.log('buffering', b);
          }
          // Callback when remote video is buffering
        } // Callback when remote video is buffering
        onError={e => console.log('error', e)} // Callback when video cannot be loaded
        style={styles.backgroundVideo}
        // useTextureView={false}
        // fullscreenAutorotate={true}
        // repeat={true}
        paused={false}
        onLoadStart={() => console.log('load start')}
        onLoad={() => console.log('load')}
        onProgress={() => console.log('progress')}
        onEnd={() => console.log('end')}
        onAudioBecomingNoisy={() => console.log('audio noisy')}
        onAudioFocusChanged={() => console.log('audio focus changed')}
        ignoreSilentSwitch="ignore"
        disableFocus="true"
        playInBackground={true}
        playWhenInactive={true}
        pictureInPicture={true}
        posterResizeMode="cover"
        // poster="https://baconmockup.com/300/200/"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* {
        buffering && <ActivityIndicator size="large" color="#fff" />
      } */}
      <FlatList
        ref={flatListRef}
        data={videodata}
        renderItem={({item}) => <RenderVideo item={item} />}
        keyExtractor={item => item?.index?.toString()}
        snapToAlignment="start"
        snapToInterval={screenHeight}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      />
    </View>
  );
};

export default VideoContent;
