import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import {Image} from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {verticalScale} from 'react-native-size-matters';
import {colorsobject} from '../assets/ProjectColors/Colorsobject';

const Toast = ({message, visible, onClose, error}) => {
  const errorstate = error;
  useEffect(() => {
    if (visible) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [visible, onClose]);

  return (
    <View style={styles.mainModalContainer}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={() => onClose()}>
        <View style={styles.container}>
          <View style={styles.toast}>
            <Image
              source={
                error
                  ? require('../assets/images/close.png')
                  : require('../assets/images/check.png')
              }
              style={[styles.icon, {tintColor: error ? 'red' : 'green'}]}
            />
            <Text
              style={{
                color: error ? 'red' : 'green',
                fontSize: responsiveWidth(3),
                fontWeight: 'bold',
              }}>
              {message}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Toast;
const styles = StyleSheet.create({
  mainModalContainer: {
    height: responsiveHeight(10),
    width: responsiveWidth(90),
    position: 'absolute',
    top: responsiveHeight(10),
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    marginTop: verticalScale(10),
    alignItems: 'center',
  },
  toast: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    color: colorsobject.black,
  },
  icon: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    marginRight: responsiveWidth(3),
  },
});
