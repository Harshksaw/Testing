import { StyleSheet } from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { colorsobject } from '../../assets/ProjectColors/Colorsobject';
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    width: responsiveWidth(100),
    justifyContent: 'center',
    backgroundColor: colorsobject.darkgrey,
  },
})

export default styles;