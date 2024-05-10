import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { colorsobject } from '../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  mainModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'flex-end',
    height: responsiveHeight(100),
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },

  modalContainer: {
    backgroundColor: colorsobject.black,
    width: '100%',
    height: responsiveHeight(60),
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    borderTopWidth: 2,
    borderColor: colorsobject.orange,
  },

  modalContent: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  modalContentTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colorsobject.orange
  },

  modalContentSubTitle: {
    fontSize: 20,
    marginTop: 10,
    color: colorsobject.grey3,
    textAlign: 'center',
    width: '80%',
  },

  modalContentComingSoonTitle: {
    fontSize: 20,
    marginTop: 10,
    color: colorsobject.orange,
    textAlign: 'center',
    width: '80%',
  },

  modalContentSubTitleAds: {
    fontSize: 20,
    marginTop: 10,
    color: colorsobject.grey3,
    textAlign: 'center',
    width: '80%',
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  orLine: {
    height: 2,
    width: '40%',
    backgroundColor: colorsobject.grey4,
  },

  orText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: colorsobject.lightgrey,
  },

  premiumBtn: {
    width: responsiveWidth(90),
    resizeMode: 'contain',
    height: 50,
    marginTop: 20,
  },

  modalAdsButton: {
    borderWidth: 1,
    borderColor: colorsobject.orange,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: 'center',
  },

  modalAdsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colorsobject.orange,
  },
});

export default styles;
