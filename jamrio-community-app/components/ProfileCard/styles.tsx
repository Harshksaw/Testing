import {StyleSheet} from 'react-native';

import {Dimensions} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {RFValue} from 'react-native-responsive-fontsize';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  profileContainer: {
    // flex: 1,
    // padding: 10,
    // gap: 10,
    // backgroundColor: 'green',
    // position: "absolute",
    // width: '100%',

    position: 'absolute',
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 100,
    // maxWidth: 260,
    // height: 600,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: 'cover',
  },

  profileTop: {
    height: '100%',
    width: responsiveWidth(95),
    borderRadius: 20,
    // elevation: 7,
    // shadowColor: '#FFB6F2',
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.5,
    // shadowRadius: 30,
  },

  profileImage: {
    flex: 1,
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'relative',
  },

  backArrow: {
    position: 'absolute',
    top: 20,
    left: 20,
  },

  cardInner: {
    height: '30%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  name: {
    color: colorsobject.white,
    fontSize: 30,
    fontWeight: 'bold',
  },

  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  locationText: {
    color: colorsobject.white,
    fontSize: 14,
    marginLeft: 5,
  },

  playBtn: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: colorsobject.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnGradient: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  playIcon: {
    height: 25,
    width: 18,
  },

  audioformImgContainer: {
    height: 60,
    width: '75%',
  },

  audioformImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    opacity: 0.3,
  },

  audioformImgOverlay: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    position: 'absolute',
  },

  // View profile styles ------------------------
  // modalContainer: {
  //   flex: 1,
  //   backgroundColor: '#1ff',
  //   position: 'relative',
  //   borderRadius: 30,
  // },

  modal: {
    flex: 1,
    backgroundColor: colorsobject.darkgrey,
    borderRadius: 30,
  },

  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 10,
    backgroundColor: colorsobject.black,
    padding: 5,
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileModalContainer: {
    flex: 1,
    gap: 10,
    borderRadius: 30,
    backgroundColor: colorsobject.darkgrey,
  },

  profileImageModalContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },

  profileModalImage: {
    width: '100%',
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  profileDetailsModalContainer: {
    // backgroundColor: 'yellow',
    gap: 10,
    padding: 10,
  },

  profileDetailsText: {
    color: colorsobject.white,
  },

  profileDetailsTextBig: {
    color: colorsobject.white,
    fontSize: 20,
  },

  profileDetailsName: {
    color: colorsobject.white,
    fontSize: 30,
    fontWeight: 'bold',
  },

  locationModalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  locationIcon: {
    width: 20,
    height: 20,
  },

  username: {
    color: colorsobject.grey4,
    fontSize: 16,
  },

  genresModalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },

  genreModalContainer: {
    padding: 10,
    borderRadius: 50,
    width: '30%',
    alignItems: 'center',
  },

  genreText: {
    color: colorsobject.white,
    fontWeight: 'bold',
  },

  shoutoutMainModalContainer: {
    gap: 10,
    marginTop: 20,
    padding: 10,
  },

  shoutoutTitle: {
    color: colorsobject.white,
    fontSize: 14,
  },

  shoutoutModalContainer: {
    backgroundColor: colorsobject.black,
    padding: 10,
    borderRadius: 20,
    elevation: 7,
    borderWidth: 0.6,
    borderColor: colorsobject.pink,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },

  shoutoutText: {
    color: colorsobject.white,
    width: '80%',
    marginVertical: 30,
  },

  quotes1: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    left: 10,
  },

  quotes2: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 0,
    right: 10,
  },

  aboutModalContainer: {
    backgroundColor: colorsobject.black,
    padding: 10,
    borderRadius: 20,
    elevation: 7,
    borderWidth: 0.6,
    borderColor: colorsobject.pink,
  },

  aboutText: {
    color: colorsobject.white,
  },

  socialsModalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },

  socialsIcon: {
    width: 40,
    height: 40,
  },
  genrectn: {
    flexDirection: 'row',
  },
  btnscontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    marginTop: 0,
    paddingTop: 3,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    // width: 95,
    minWidth: 100,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 10,
    paddingHorizontal: 15,
    marginHorizontal: 2,
  },
  buttonLabel: {
    color: colorsobject.white,
    fontSize: 16,
    marginHorizontal: 2,
  },
  timedtext: {
    width: 200,
    height: 40,
    borderRadius: 25,
    // marginBottom: 10,
    paddingHorizontal: 15,
    marginHorizontal: 2,
    paddingTop: 5,
    //marginBottom: 70,
  },
  quotes: {
    width: 35,
    height: 35,
    fontSize: 24,
    borderRadius: 20,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    marginBottom: 0,
    padding: 4,
    backgroundColor: colorsobject.themecolor,
    //paddingBottom:25,
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
    //borderColor: colorsobject.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default styles;
