import {StyleSheet} from 'react-native';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colorsobject.darkgrey2,
    // backgroundColor: '#1E1',
    padding: 10,
    position: 'absolute',
    bottom: -10,
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignSelf: 'center',
    overflow: 'hidden',
  },

  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'relative',
    height: 40,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },

  iconContainerActive: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    marginTop: -20,
    backgroundColor: colorsobject.darkgrey,
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: colorsobject.white,
  },
  iconactive: {
    width: 20,
    height: 20,
    tintColor: colorsobject.themecolor,
  },
});

export default styles;
