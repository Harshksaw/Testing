import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {RFValue} from 'react-native-responsive-fontsize';
import {colorsobject} from '../../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsobject.black,
  },

  profileContainer: {
    flex: 1,
    padding: 0,
    gap: 10,
    // backgroundColor: 'green',
  },

  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colorsobject.black,
    padding: 10,
    borderRadius: 50,
  },

  button: {
    backgroundColor: colorsobject.white,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: colorsobject.black,
  },

  profileDetailsContainer: {
    // backgroundColor: 'yellow',
    padding: 0,
    gap: 10,
    marginTop: 30,
  },

  profileDetailsText: {
    color: colorsobject.white,
  },

  profileDetailsTextBig: {
    color: colorsobject.white,
    fontSize: 20,
  },
  profilecompletion: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pctext: {
    zIndex: 10,
    fontSize: RFValue(30),
    color: colorsobject.white,
    alighSelf: 'center',
  },
  profileHintText: {
    color: colorsobject.grey4,
    fontSize: 14,
    marginTop: 20,
  },

  textInput: {
    marginTop: 5,
    color: colorsobject.white,
    fontWeight: '500',
    padding: 2,
    fontSize: RFValue(14),
    flexDirection: 'row',
    marginLeft: 5,
    width: '90%',
  },
  inputText: {
    marginTop: 5,
    color: colorsobject.white,
    padding: 2,
    fontSize: RFValue(14),
    flexDirection: 'row',
    marginLeft: 5,
  },

  inputContainer: {},

  namebtn: {
    fontWeight: '800',
    fontSize: RFValue(25),
    flexDirection: 'row',
    position: 'relative',
    borderRadius: 7,
    backgroundColor: colorsobject.grey7,
    alignItems: 'center',

    // width:'100%',
  },
  editbtn: {
    flexDirection: 'row',
    position: 'absolute',
    right: 7,
  },
  linesep: {
    borderWidth: 0.3,
    marginTop: 8,
    borderRadius: 30,
    borderColor: colorsobject.mediumgrey,
  },
  headingname: {
    color: colorsobject.white,
    fontSize: RFValue(18),
    fontWeight: '400',
    paddingVertical: 10,
  },

  submitButton: {
    backgroundColor: colorsobject.themecolor,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  submitButtonText: {
    color: colorsobject.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  genreLabel: {
    color: colorsobject.white,
    marginTop: 10,
    marginHorizontal: 5,
    paddingBottom: 0,
    marginBottom: 0,
    fontSize: RFValue(20),
    fontWeight: '400',
  },
  genrectn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnscontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    marginTop: 0,
    paddingTop: 3,

    gap: 5,
  },
  genreContainer: {
    borderRadius: 6,
    paddingHorizontal: responsiveWidth(1.7),
    height: responsiveHeight(4.4),
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: colorsobject.genresbackground,
    justifyContent: 'center',
  },

  genreText: {
    color: colorsobject.themecolor,
    fontWeight: '500',
    padding: responsiveWidth(1.5),
    fontSize: responsiveFontSize(2),
  },
  deleteButton: {
    color: colorsobject.mediumgrey,
    flexDirection: 'row',
    padding: 4,
  },
  plusButton: {
    color: colorsobject.mediumgrey,
    flexDirection: 'row',
    marginTop: 0,
    paddingTop: 0,
  },
  cancelimg: {
    height: 20,
    width: 20,
  },
  plusimg: {
    height: 45,
    width: 45,
    paddingTop: 0,
    marginTop: 0,
  },
  detailsbtn: {
    paddingVertical: 10,
  },
  S_container: {
    backgroundColor: colorsobject.darkgrey5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: '100%',
    marginBottom: 15,
  },
  S_Input: {
    backgroundColor: colorsobject.black,
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    color: colorsobject.white,
    elevation: 7,
    borderWidth: 0.6,
    borderColor: colorsobject.themecolor,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 15,
    color: colorsobject.white,
    marginRight: 10,
  },
  About: {
    flexDirection: 'row',
    color: colorsobject.white,
    paddingTop: 20,
    fontSize: 17,
  },
  abt_block: {
    flexDirection: 'row',
  },
  About_Input: {
    backgroundColor: colorsobject.black,
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    color: colorsobject.white,
    elevation: 7,
    borderWidth: 0.6,
    borderColor: colorsobject.pink,
    marginTop: 20,
    minHeight: 100,
    minWidth: 310,
  },
  abt_editbtn: {
    marginBottom: 20,
    paddingBottom: 50,
    flexDirection: 'row',
    right: 25,
    bottom: 20,
    color: colorsobject.themecolor,
  },
  handlename: {
    color: colorsobject.white,
  },
  linkInput: {},
  entireimageconatiner: {
    height: responsiveHeight(30),
    marginVertical: responsiveHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageconatiner: {
    height: '100%',
    aspectRatio: 1,
    elevation: 7,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageconatiner_two: {
    backgroundColor: colorsobject.mediumgrey,
    // padding: 10,
    borderRadius: 20,
    height: 100,
    width: 110,
    elevation: 7,
    borderWidth: 0.6,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  sideimageconatiner: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },

  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
    alignSelf: 'center',
  },
  audioContainer: {
    backgroundColor: colorsobject.darkcharcoal,
    height: responsiveWidth(12),
    width: responsiveWidth(88),
    borderRadius: 10,
    marginTop: 10,
  },
  iconcontainer: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    backgroundColor: colorsobject.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(8),
    marginHorizontal: responsiveWidth(2),
  },
  socialsIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
  },
});

export default styles;
