import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: RFValue(30),
    justifyContent: 'flex-end',
    backgroundColor: colorsobject.darkgrey,
  },

  signupText: {
    color: colorsobject.white,
    fontSize: RFValue(30),
    fontWeight: 'bold',
  },

  signupFormContainer: {
    flexDirection: 'column',
    gap: RFValue(15),
    marginTop: RFValue(20),
  },

  signupFormInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colorsobject.darkgrey6,
    backgroundColor: colorsobject.darkgrey3,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: RFValue(10),
    color: colorsobject.white,
  },

  dateIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: RFValue(35),
    right: 10,
    zIndex: 10,
  },

  signupBtn: {
    width: '100%',
    height: 50,
    backgroundColor: colorsobject.themecolor,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  signupFormText: {
    color: colorsobject.white,
  },

  signupBtnText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: colorsobject.white,
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: colorsobject.skyblue,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: colorsobject.themecolor,
  },
});

export default styles;
