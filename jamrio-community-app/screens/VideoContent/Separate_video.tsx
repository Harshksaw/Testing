import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import {useRoute} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Separate_video = () => {
  const route = useRoute();
  const index = route.params?.index;
  let videodata = route.params?.videodata;
  const screenHeight = responsiveHeight(100);
  const flatListRef = useRef(null);
  const videoRef = useRef(null);
  const [buffering, setBuffering] = useState<any>(false);

  useEffect(() => {
    // Scroll to index 5 when the component mounts
    flatListRef.current.scrollToIndex({index: index, animated: true});
  }, [index]);

  useEffect(() => {
    // Start playing the video when it's loaded
    console.log('VIDEO DATA', videodata);
    console.log('INDEX', index);
  }, [videodata, index]);

  // if (Array.isArray(videodata) && videodata.length > 1) {
  //   videodata = videodata.slice(1); // Remove the first element
  // }

  const getItemLayout = (data, index) => ({
    length: screenHeight,
    offset: screenHeight * index,
    index,
  });

  const renderItem = ({item}: any) => {
    return (
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
          ref={videoRef}
          source={{
            uri: `https://jamrio-video.blr1.digitaloceanspaces.com/${item?.filekey}`,
          }}
          // ref={ref => {
          //   this.player = ref;
          // }} // Store reference
          controls={true}
          // onBuffer={
          //   b => {
          //     setBuffering(true);
          //     console.log('buffering', b);
          //   }
          //   // Callback when remote video is buffering
          // } // Callback when remote video is buffering
          //onError={e => console.log('error', e)} // Callback when video cannot be loaded
          style={{height: '100%', width: '100%'}}
          // useTextureView={false}
          // fullscreenAutorotate={true}
          repeat={true}
          // paused={true}
          // onLoadStart={() => console.log('load start')}
          // onLoad={() => console.log('load')}
          // onProgress={() => console.log('progress')}
          // onEnd={() => console.log('end')}
          // onAudioBecomingNoisy={() => console.log('audio noisy')}
          // onAudioFocusChanged={() => console.log('audio focus changed')}
          // ignoreSilentSwitch="ignore"
          // // disableFocus="true"
          // playInBackground={true}
          // playWhenInactive={true}
          // pictureInPicture={true}
          // posterResizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={videodata}
        renderItem={renderItem}
        keyExtractor={item => item?.index?.toString()}
        getItemLayout={getItemLayout} // Provide getItemLayout for scrollToIndex
        snapToAlignment="start"
        snapToInterval={screenHeight}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      />
    </View>
  );
};

export default Separate_video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
});
