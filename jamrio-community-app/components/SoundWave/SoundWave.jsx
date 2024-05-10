import React, {Component} from 'react';
import ReactNative, {StyleSheet, View, Canvas} from 'react-native';

const SoundWave = ({soundWaveData}) => {
  const lines = soundWaveData.map((sample, index) => {
    return <View key={index} style={styles.line} width={sample} height={1} />;
  });

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>{lines}</Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 100,
  },
  line: {
    backgroundColor: 'red',
  },
  canvas: {
    width: 200,
    height: 100,
  },
});

export default SoundWave;
