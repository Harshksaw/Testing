import {StyleSheet} from 'react-native';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    flexDirection: 'column',
    backgroundColor: colorsobject.inboxbackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: colorsobject.white,
  },
  headerOptions: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  linesep: {
    borderWidth: 0.3,
    marginTop: 5,
    borderRadius: 30,
    borderColor: colorsobject.mediumgrey,
    width: '90%',
    alignSelf: 'center',
  },
});

export default styles;
