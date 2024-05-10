import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import styles from './styles';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import premiumBtn from '../../assets/images/premiumBtn.png';
import AppLovinMAX from 'react-native-applovin-max';
import { colorsobject } from '../../assets/ProjectColors/Colorsobject';

const BuyPremiumModal = ({setPremiumModal, premiumModal}) => {
  const REWARDED_AD_UNIT_ID = Platform.select({
    android: 'c504523c2388c71e',
    // ios: 'YOUR_IOS_REWARDED_AD_UNIT_ID',
  });

  const navigation = useNavigation();

  const onAdsClick = async () => {
    const isRewardedAdReady = await AppLovinMAX.isRewardedAdReady(
      REWARDED_AD_UNIT_ID,
    );
    if (isRewardedAdReady) {
      setPremiumModal(false);
      AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
    }
  };

  return (
    <View style={styles.mainModalContainer}>
      <Modal animationType="slide" transparent={true} visible={premiumModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setPremiumModal(false)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
            }}>
            <AntIcons name="close" size={25} color={colorsobject.orange} />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <Text style={styles.modalContentTitle}>Out Of Swipes?</Text>
            <Text style={styles.modalContentSubTitle}>
              Buy our Premium for Unlimited Swipes & more
            </Text>
            {/* <TouchableOpacity onPress={() => {
                setPremiumModal(false);
                navigation.navigate('BuyPremium')
              }} activeOpacity={0.8}
              disabled={true}
              >
              <Image source={premiumBtn} style={styles.premiumBtn} />
            </TouchableOpacity> */}
            <Text style={styles.modalContentComingSoonTitle}>Coming Soon</Text>
            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>
            <TouchableOpacity
              style={styles.modalAdsButton}
              activeOpacity={0.8}
              onPress={() => {
                onAdsClick();
              }}>
              <Text style={styles.modalAdsButtonText}>Watch an Ad</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BuyPremiumModal;
