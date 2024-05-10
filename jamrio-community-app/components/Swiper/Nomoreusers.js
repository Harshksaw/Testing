import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

const Nomoreusers = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colorsobject.secondarycolor, colorsobject.themecolor]}
        style={styles.infocontainer}>
        <Text style={styles.title}>That's everyone!</Text>
        <Text style={styles.textstyle}>
          You've seen all the people already.
        </Text>
        <Text style={styles.textstyle}>Please check again later.</Text>
      </LinearGradient>
    </View>
  );
};

export default Nomoreusers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infocontainer: {
    height: '90%',
    width: '94%',
    marginBottom: responsiveHeight(6),
    borderRadius: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: colorsobject.white,
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
    marginBottom: responsiveHeight(5),
  },
  textstyle: {
    color: colorsobject.white,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
  },
});
