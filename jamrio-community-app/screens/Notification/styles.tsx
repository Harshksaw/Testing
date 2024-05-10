import { StyleSheet, useWindowDimensions } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { RFValue } from 'react-native-responsive-fontsize';
import { colorsobject } from '../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
    container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colorsobject.darkgrey,
    },

    headingnoti: {
    fontSize: RFValue(12),
    color: colorsobject.white,
    textAlign: 'center',
    fontWeight: "300",
    },

    arrow:{
    marginRight: 10,
    },

    headingtext: {
    alignItems: 'center',
    marginTop: 5,
    flexDirection: 'row',
    fontSize: RFValue(30),
    color: colorsobject.white,
    textAlign: 'left',
    fontWeight: "700",
    paddingBottom: 10,
    },

    sentcontainer:{
      //flexDirection: 'row',
    },

    details:{
      //flexDirection: 'row',
      marginTop:10,
      marginBottom: 20,
      //alignItems: 'flex-start',
      //position: 'relative',
      // width: useWindowDimensions().width - 10,
      width: '50%',
    },

    details1:{
      flexDirection:'column',
      //alignItems: 'flex-end',
      width:'55%',
    },

    details2:{
      top: 5,
      //position: 'absolute',
      //right: 1,
    },

    nametext:{
      flexDirection:'column',
      fontSize: RFValue(20),
      color: colorsobject.white,
      textAlign: 'left',
      fontWeight: "600",
      marginLeft: 10,
      marginBottom:0,
      gap: 5,
    },

    msgtext:{
      flexDirection:'column',
      paddingLeft:0,
      fontSize: RFValue(13),
      color: colorsobject.white,
      textAlign: 'left',
      fontWeight: "500",
      marginLeft: 10,
      marginBottom:5,
    },

    timetext:{
      fontSize: RFValue(10),
      color: colorsobject.grey,
      marginBottom: 10,
      marginLeft: 10,

    },

    entire:{
      flexDirection: 'row',
      backgroundColor:colorsobject.black2,
      borderRadius:20,
      paddingHorizontal:10,
      paddingTop:5,
      minHeight: responsiveWidth(25),
      alignItems: 'center',
    },

    icon: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },

    btnscontainer:{
    marginTop:15,
    flexDirection: 'row',
    },

    middleContainer: {
      flex: .2,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: RFValue(-50),
      // backgroundColor: "rgba(16,16,16,0.9)",
    },

    linearGradient:{
      flexDirection: 'row',
      backgroundColor: colorsobject.themecolor,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
      //paddingHorizontal: 20,
    },

    acceptbtn:{
    flexDirection: 'row',
    width: 40,
    height: 40,
    backgroundColor: colorsobject.themecolor,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom: 15,
    //paddingHorizontal: 20,
    marginRight: 10,
    },

    acceptbtntext:{
      color:colorsobject.white,
    },

    ignorebtntext:{
      color:colorsobject.white,
    },

    ignorebtn:{
    flexDirection: 'row',
    width: 40,
    height: 40,
    backgroundColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    //paddingHorizontal: 20,
    },

  chatbtn:{
    flexDirection: 'row',
    width: 40,
    height: 40,
    backgroundColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    },

    block:{
      flexDirection: 'row'
    },

    linesep:{
      borderWidth: 0.3,
      marginTop: 8,
      marginBottom: 8,
      borderRadius : 30,
      borderColor: colorsobject.darkgrey,
    },

    headingname:{
      color:colorsobject.mediumgrey,
      fontSize:RFValue(16),
      fontWeight: '600',
      marginLeft:10,
    },

    profileDetailsText: {
      color: colorsobject.white,
    },

    textInput: {
      marginTop:5,
      color: colorsobject.white,
      fontWeight: '600',
      fontSize: RFValue(25),
      flexDirection:'row',
      marginLeft:10,
    },

    namebtn:{
      fontWeight: '800',
      fontSize: RFValue(25),
      flexDirection:'row',
    },
    
    editbtn:{
      marginTop:5,
      flexDirection:'row',
      color:colorsobject.magenta,
    }
  
  })
  
export default styles;