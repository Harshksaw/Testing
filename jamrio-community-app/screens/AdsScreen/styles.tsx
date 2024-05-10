import {StyleSheet} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { colorsobject } from '../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  adsScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorsobject.darkgrey,
  },

  backgroundVideo: {
    height: '90%',
    // backgroundColor: '#10ff10',
    width: responsiveWidth(90),
  },

  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
});

export default styles;
