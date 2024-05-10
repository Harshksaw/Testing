import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import FeatherIcons from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const BuyPremiumScreen = ({navigation}) => {
  return (
    <View style={styles.buyPremiumScreen}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buyPremiumBackBtn}
        onPress={() => navigation.goBack()}>
        <EntypoIcons
          name="chevron-small-left"
          size={30}
          color={colorsobject.white}
        />
        <Text style={styles.buyPremiumBackText}>Back</Text>
      </TouchableOpacity>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 20, marginBottom: 30}}>
          <Text style={styles.premiumTitle}>Premium Plan</Text>
          <Text style={styles.premiumSubTitle}>
            Upgrade to Premium and Enjoy Exclusive Features
          </Text>
        </View>
        <LinearGradient
          colors={[colorsobject.maroon, colorsobject.darkblue]}
          style={styles.buyPremiumGradient}>
          <View style={styles.buyPremiumFeatureContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.buyPremiumFeatureText}>Unlimited Swipes</Text>
              <FeatherIcons name="check" size={25} color={colorsobject.white} />
            </View>
            <Text style={styles.buyPremiumFeatureDescText}>
              Discover and connect with artists without any limits.
            </Text>
          </View>

          <View style={styles.buyPremiumFeatureContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.buyPremiumFeatureText}>
                Unlimited Message Requests
              </Text>
              <FeatherIcons name="check" size={25} color={colorsobject.white} />
            </View>
            <Text style={styles.buyPremiumFeatureDescText}>
              Reach out to more audience with ease.
            </Text>
          </View>

          <View style={styles.buyPremiumFeatureContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.buyPremiumFeatureText}>
                Unlimited Rewinds
              </Text>
              <FeatherIcons name="check" size={25} color={colorsobject.white} />
            </View>
            <Text style={styles.buyPremiumFeatureDescText}>
              Go back to the profiles you've passed on.
            </Text>
          </View>

          <View style={styles.buyPremiumFeatureContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.buyPremiumFeatureText}>No Ads</Text>
              <FeatherIcons name="check" size={25} color={colorsobject.white} />
            </View>
            <Text style={styles.buyPremiumFeatureDescText}>
              Enjoy an uninterrupted browsing experience.
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.buyPremiumBtn}>
            <Text style={styles.buyPremiumBtnText}>Get 7 days free Trial</Text>
          </TouchableOpacity>

          <Text style={styles.buyPremiumTC}>
            By proceeding, you agree to our Terms and Privacy Policy.
          </Text>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default BuyPremiumScreen;
