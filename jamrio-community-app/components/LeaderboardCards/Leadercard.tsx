import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import Toast from '../Toast';

const Leadercard = ({rank, profileImage, name, points}) => {
  const [showToast, setShowToast] = useState(false);

  const showToastHandler = () => {
    setShowToast(true);
  };

  const hideToastHandler = () => {
    setShowToast(false);
  };
  return (
    <View>
      <Toast
        message="This is a toast message"
        visible={showToast}
        error={true}
        onClose={hideToastHandler}
      />
      <TouchableOpacity
        style={styles.rank4container}
        onPress={showToastHandler}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.rank}>{rank}</Text>
          {profileImage ? (
            <Image source={{uri: profileImage}} style={styles.otherrankimage} />
          ) : (
            <Image
              source={require('../../assets/images/user.jpeg')}
              style={styles.otherrankimage}
            />
          )}
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.points}>{points}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Leadercard;

const styles = StyleSheet.create({
  rank4container: {
    width: '100%',
    height: responsiveHeight(10),
    backgroundColor: colorsobject.darkgrey7,
    borderRadius: responsiveWidth(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4.5),
    marginVertical: responsiveHeight(1),
  },
  rank: {
    color: colorsobject.pink,
    fontSize: responsiveHeight(2.7),
  },
  points: {
    color: colorsobject.white,
    fontSize: responsiveHeight(2.7),
  },
  otherrankimage: {
    height: responsiveWidth(13),
    width: responsiveWidth(13),
    borderRadius: responsiveWidth(9),
    marginHorizontal: responsiveWidth(2.5),
  },
  name: {
    color: colorsobject.white,
    marginHorizontal: responsiveWidth(1),
    fontSize: responsiveHeight(2),
  },
});
