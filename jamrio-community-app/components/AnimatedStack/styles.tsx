import { StyleSheet } from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { colorsobject } from '../../assets/ProjectColors/Colorsobject';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsobject.darkgrey,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    
  },

  cardContainer: {
    flex: 1,
    width: '100%',
    // maxWidth: 260,
    // backgroundColor: colorsobject.white,
    position: "relative"
  },

  noUsersText: {
    color: colorsobject.white,
    fontSize: 20,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -60 }, { translateY: -50 }],
  },

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
    resizeMode: 'contain',
  },

  modalImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },

  modalBody: {
    height: '100%',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },

  gradientBGImg: {
    width: 300,
    height: 300,
    position: 'absolute',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -2,
  },

  musicIconContainer: {
    width: 50,
    height: 50,
    position: 'absolute',
    // overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: colorsobject.lightpink,
    borderWidth: 2,
    borderColor: colorsobject.white,
    borderRadius: 50,
    top: 90,
  },

  musicIcon: {
    width: 60,
    height: 60,
  },

  modalImage: {
    width: 130,
    height: 130,
    borderRadius: 20,
    margin: 10,
    padding: 5,
    backgroundColor: colorsobject.white,
    elevation: 5,
    shadowColor: colorsobject.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .5,
    shadowRadius: 5,
  },

  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },

  userImg1: {
    transform: [{ rotate: '-20deg' }],
    marginRight: -20,
  },

  userImg2: {
    transform: [{ rotate: '20deg' }],
    zIndex: -1,
  },

  modalText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: colorsobject.white,
  },

  modalTextBig: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 5,
    color: colorsobject.white,
    fontWeight: 'bold',
  },

  sendMessageButton: {
    // width: '100%',
    height: 50,
    // backgroundColor: '#FF6584',
    backgroundColor: colorsobject.pink,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 20,
    paddingHorizontal: 30,
  },

  sendMessageButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: colorsobject.white,
  },

  nextCardContainer: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    width: responsiveWidth(95),
    height: responsiveWidth(95),
    justifyContent: 'center',
    alignItems: 'center',
    top: responsiveWidth(40),
    left: 0,
  },

  like: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    position: 'absolute',
    top: 10,
    zIndex: 1,
  },
})

export default styles;