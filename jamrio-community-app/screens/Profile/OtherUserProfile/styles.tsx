import {StyleSheet} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colorsobject} from '../../../assets/ProjectColors/Colorsobject';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsobject.black,
    paddingHorizontal: responsiveWidth(3),
  },

  profileContainer: {
    flex: 1,
    paddingHorizontal: 5,

    // backgroundColor: 'green',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    width: '100%',
  },

  playIconMainContainer: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    position: 'absolute',
    // center of the card
    top: '50%',
    left: '50%',
    transform: [{translateX: -35}, {translateY: -70}],
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 50,
  },

  playIconContainer: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    backgroundColor: colorsobject.darkgrey4,
    // borderWidth: 2,
    // borderColor: colorsobject.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  profileImageContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: responsiveHeight(4),
  },

  profileImage: {
    height: responsiveHeight(17),
    aspectRatio: 1,
    borderRadius: responsiveHeight(15),
  },

  backIcon: {
    backgroundColor: colorsobject.darkgrey5,
    position: 'absolute',
    top: responsiveWidth(4),
    left: responsiveWidth(4),
    borderRadius: responsiveWidth(10),
    zIndex: 10,
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileDetailsContainer: {
    // backgroundColor: 'yellow',
    paddingHorizontal: responsiveWidth(2),
  },

  addBtn: {
    position: 'absolute',
    top: responsiveWidth(92.5),
    right: responsiveWidth(5),
    borderRadius: responsiveWidth(10),
    zIndex: 10,
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorsobject.pink,
  },

  addBtnImg: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
  },

  profileDetailsText: {
    color: colorsobject.white,
  },

  profileDetailsTextBig: {
    color: colorsobject.usernamecolor,
    fontSize: RFValue(15),
    marginTop: responsiveHeight(1),
  },

  profileDetailsName: {
    color: colorsobject.white,
    marginTop: 10,
    marginHorizontal: 5,
    fontSize: RFValue(20),
    fontWeight: '500',
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  locationIcon: {
    width: 20,
    height: 20,
  },

  username: {
    color: colorsobject.usernamecolor,
    fontSize: RFValue(15),
  },

  genresContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },

  genresScrollContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 300,
    gap: 10,
    marginTop: 10,
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
  genrebtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  linearGradient: {
    flexDirection: 'row',
    backgroundColor: colorsobject.themecolor,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
    paddingHorizontal: 7,
  },

  acceptbtn: {
    flexDirection: 'row',
    width: 93,
    height: 40,
    backgroundColor: colorsobject.themecolor,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
    marginHorizontal: 7,
  },

  acceptbtntext: {
    color: colorsobject.white,
  },

  shoutoutMainContainer: {
    gap: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },

  shoutoutTitle: {
    color: colorsobject.white,
    marginTop: 10,
    marginHorizontal: 5,
    paddingBottom: 0,
    marginBottom: 0,
    fontSize: RFValue(20),
    fontWeight: '500',
  },
  linesep: {
    borderWidth: 0.3,
    marginVertical: 4,
    borderRadius: 30,
    borderColor: colorsobject.grey,
  },

  shoutoutContainer: {
    backgroundColor: colorsobject.black,
    padding: 10,
    borderRadius: 20,
    width: '100%',
    alignSelf: 'center',
    height: responsiveHeight(15),
    elevation: 7,
    borderWidth: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shoutoutText: {
    color: colorsobject.white,
    width: '100%',
    marginBottom: 15,
    opacity: 0.5,
    fontWeight: '500',
    fontSize: RFValue(15),
  },
  shoutoutTextabsolute: {
    color: colorsobject.white,
    width: '80%',
    marginBottom: 15,
    height: responsiveHeight(4.5),
    position: 'absolute',
    fontSize: RFValue(14),
    fontWeight: '700',
    left: responsiveWidth(16),
  },

  quotes1: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 15,
    left: 20,
  },

  quotes2: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 15,
    right: 20,
  },

  aboutContainer: {
    shadowColor: colorsobject.white,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    // elevation: 7, // For Android
    backgroundColor: colorsobject.black,
    padding: 10,
    borderRadius: 20,
    borderWidth: 0.6,
    borderColor: colorsobject.pink,
  },

  aboutText: {
    color: colorsobject.white,
  },

  socialsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    padding: 4,
  },
  iconcontainer: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    backgroundColor: colorsobject.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(8),
  },

  socialsIcon: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    backgroundColor: colorsobject.white,
  },

  signOutBtn: {
    backgroundColor: colorsobject.red,
    padding: 10,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },

  signOutText: {
    color: colorsobject.white,
    fontSize: 16,
  },
  arrow: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    tintColor: colorsobject.themecolor,
  },
  Inbox: {
    height: responsiveHeight(6),
    width: responsiveWidth(50),
    backgroundColor: colorsobject.themecolor,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 8,
  },

  TextInbox: {
    color: colorsobject.white,
    fontWeight: '700',
  },
  fullscreen: {
    flex: 1,
    backgroundColor: colorsobject.black,
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
