import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {colorsobject} from '../assets/ProjectColors/Colorsobject';

const Header = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainHeaderContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowContainer}>
          <Image
            source={require('../assets/images/previous.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title || ''}</Text>

        {/* {title === 'Notifications' && (
          <>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.deleteContainer}>
              <Image
                source={require('../assets/images/delete.png')}
                style={styles.delete}
              />
            </TouchableOpacity>
          </>
        )} */}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainHeaderContainer: {
    width: '100%',
    marginVertical: responsiveWidth(3),
    position: 'relative',
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(5),
  },

  headerContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  headerTitle: {
    fontSize: responsiveFontSize(3),
    color: colorsobject.white,
    flex: 1,
  },

  arrowContainer: {
    left: 0,
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    justifyContent: 'center',
    flex: 0.5,
  },
  deleteContainer: {
    position: 'absolute',
    right: 0,
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrow: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    tintColor: colorsobject.themecolor,
  },
  deleteContainer: {
    position: 'absolute',
    right: 0,
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    height: responsiveWidth(7),
    width: responsiveWidth(7),
  },
});
