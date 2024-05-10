import {StyleSheet} from 'react-native';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'column',
    backgroundColor: colorsobject.darkgrey,
  },

  title: {
    color: colorsobject.white,
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    color: colorsobject.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },

  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'space-between',
  },

  genre: {
    width: '48%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    borderColor: colorsobject.darkgrey8,
    borderWidth: 1,
    backgroundColor: colorsobject.darkgrey3,
  },

  genreSelected: {
    backgroundColor: colorsobject.themecolor,
  },

  btnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  btn: {
    width: '100%',
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: colorsobject.themecolor,
    flexDirection: 'row',
    gap: 10,
  },

  noBtnText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
  },

  arrowContainer: {},
  arrow: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    tintColor: colorsobject.themecolor,
  },
});

export default styles;
