import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { colorsobject } from '../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: RFValue(30),
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
  },

  forgotBtn: {
    width: '100%',
    height: 50,
    backgroundColor: colorsobject.themecolor,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  forgotBtnText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: colorsobject.white,
  },
})

export default styles