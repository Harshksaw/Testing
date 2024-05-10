import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colorsobject} from '../../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  modalInnerView: {
    backgroundColor: colorsobject.white,
    width: responsiveWidth(40),
    height: responsiveHeight(15),
    borderRadius: 10,
    marginTop: 50,
  },

  options: {
    width: '100%',
    height: '50%',
    borderBottomWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveHeight(0.4),
  },
  modaltext: {
    color: colorsobject.black,
    fontWeight: '500',
    fontSize: responsiveFontSize(2),
  },
});

export default styles;
