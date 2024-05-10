import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import ViewProfile from './ViewProfile/ViewProfile';
import EditProfile from './EditProfile/EditProfile';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const Profile = ({navigation}) => {
  const [active, setActive] = useState<string>('View');

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.arrowContainer, {width: '10%'}]}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/100/FFFFFF/left.png',
            }}
            style={styles.arrow}
          />
        </TouchableOpacity> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
          }}>
          {/* View Profile */}
          {active === 'View' ? (
            <TouchableOpacity activeOpacity={0.8} style={{width: '50%'}}>
              <Text style={styles.profileHeaderTextActive}>View Profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{width: '50%'}}
              onPress={() => {
                setActive('View');
              }}>
              <Text style={styles.profileHeaderText}>View Profile</Text>
            </TouchableOpacity>
          )}

          {/* Edit Profile */}
          {active === 'Edit' ? (
            <TouchableOpacity activeOpacity={0.8} style={{width: '50%'}}>
              <Text style={styles.profileHeaderTextActive}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{width: '50%'}}
              onPress={() => {
                setActive('Edit');
              }}>
              <Text style={styles.profileHeaderText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.profileBody}>
        {active === 'View' ? (
          <ViewProfile navigation={navigation} />
        ) : (
          <EditProfile />
        )}
      </View>
    </View>
  );
};

export default Profile;
