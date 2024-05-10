import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  modalBGContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContainer: {
    backgroundColor: colorsobject.white,
    borderRadius: 20,
    height: responsiveHeight(75),
    width: responsiveWidth(90),
    zIndex: 200,
    left: '50%',
    top: '50%',
    transform: [
      {translateX: -responsiveWidth(45)},
      {translateY: -responsiveHeight(40)},
    ],
  },
  createModalContainer: {
    backgroundColor: colorsobject.white,
    borderRadius: 20,
    height: responsiveHeight(35),
    width: responsiveWidth(90),
    zIndex: 200,
    left: '50%',
    top: '50%',
    transform: [
      {translateX: -responsiveWidth(45)},
      {translateY: -responsiveHeight(20)},
    ],
  },

  modalContent: {
    paddingHorizontal: 20,
  },

  chatInput: {
    borderBottomWidth: 1,
    borderBottomColor: colorsobject.darkcharcoal,
    fontSize: 16,
    fontWeight: '600',
    color: colorsobject.darkcharcoal,
  },

  saveBtn: {
    backgroundColor: colorsobject.black,
    padding: 10,
    borderRadius: 50,
    margin: 20,
    marginBottom: 30,
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{translateX: -responsiveWidth(40)}],
    width: responsiveWidth(70),
  },

  saveBtnDisabled: {
    opacity: 0.3,
    backgroundColor: colorsobject.black,
    padding: 10,
    borderRadius: 50,
    margin: 20,
    marginBottom: 30,
  },

  modalView: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    height: responsiveHeight(90),
  },

  modalInnerView: {
    backgroundColor: colorsobject.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    height: responsiveHeight(40),
    width: responsiveWidth(90),
  },

  modalText: {
    padding: 20,
    color: colorsobject.black,
    fontSize: 16,
    fontWeight: '500',
  },

  modalBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20,
  },

  modalBtn: {
    backgroundColor: colorsobject.themecolor,
    padding: 10,
    borderRadius: 50,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalBtnText: {
    color: colorsobject.white,
    fontSize: 16,
  },
});

export default styles;
