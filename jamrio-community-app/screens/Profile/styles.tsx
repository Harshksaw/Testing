import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsobject.black,
    padding: 10,
  },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    width: '100%',
  },

  profileHeaderText: {
    color: colorsobject.white,
    width: '100%',

    fontSize: RFValue(16),
    textAlign: 'center',

    paddingBottom: responsiveHeight(1.6),
    fontWeight: '500',
  },

  profileHeaderTextActive: {
    color: colorsobject.white,
    borderBottomColor: colorsobject.white,
    borderBottomWidth: 1,
    width: '100%',
    fontSize: RFValue(16),
    textAlign: 'center',
    fontWeight: '500',
    paddingBottom: responsiveHeight(1.6),
  },

  profileBody: {
    flex: 1,
    marginTop: 10,
    marginBottom: 50,
  },
  arrowContainer: {},
  arrow: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    tintColor: colorsobject.themecolor,
  },
});

export default styles;
