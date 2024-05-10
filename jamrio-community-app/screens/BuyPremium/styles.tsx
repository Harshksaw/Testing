import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { colorsobject } from '../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  buyPremiumScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorsobject.darkgrey,
  },

  buyPremiumBackBtn:{
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },

  buyPremiumBackText:{
    color: colorsobject.white,
    fontSize: 20,
  },

  buyPremiumGradient:{
    width: responsiveWidth(100),
    // minHeight: responsiveHeight(50),
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 20,
  },

  premiumTitle:{
    color: colorsobject.white,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 100,
  },

  premiumSubTitle:{
    color: colorsobject.grey5,
    fontSize: 16,
    textAlign: 'left',
    marginTop: 10,
    fontWeight: 'bold',
  },

  buyPremiumFeatureContainer:{
    borderBottomWidth: 1,
    borderBottomColor: colorsobject.white,
    paddingBottom: 10,
    gap: 5,
  },

  buyPremiumFeatureText:{
    color: colorsobject.white,
    fontSize: 22,
    fontWeight: '600',
  },

  buyPremiumFeatureDescText:{
    color: colorsobject.grey4,
    fontSize: 16,
  },

  buyPremiumBtn:{
    backgroundColor: colorsobject.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },

  buyPremiumBtnText:{
    color: colorsobject.maroon,
    fontSize: 16,
    fontWeight: 'bold',
    width: responsiveWidth(80),
    textAlign: 'center',
  },

  buyPremiumTC:{
    color: colorsobject.grey4,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default styles;
