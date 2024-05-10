import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colorsobject } from '../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colorsobject.darkgrey,
  },

  // Top Container
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Middle Container
  middleContainer: {
    flex: .2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFValue(-50),
    // backgroundColor: "rgba(16,16,16,0.9)",
  },

  googleBtn: {
    width: '80%',
    height: 50,
    backgroundColor: colorsobject.white,
    borderRadius: 25,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  phoneBtn: {
    width: '80%',
    height: 50,
    backgroundColor: colorsobject.black,
    borderWidth: 1,
    borderColor: colorsobject.white,
    borderRadius: 25,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  guestBtn: {
    width: '80%',
    height: 50,
    backgroundColor: colorsobject.themecolor,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  buttonLogo: {
    width: 30,
    height: 30,
  },

  googleText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: colorsobject.black,
  },

  phoneText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: colorsobject.white,
  },

  guestText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: colorsobject.white,
  },

  // Bottom Container
  bottomContainer: {
    flex: .2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorsobject.darkgrey,
    paddingHorizontal: RFValue(40),
  },

  loginText: {
    fontSize: RFValue(12),
    color: colorsobject.white,
    textAlign: 'center',
    fontWeight: "300",
  },
})

export default styles
