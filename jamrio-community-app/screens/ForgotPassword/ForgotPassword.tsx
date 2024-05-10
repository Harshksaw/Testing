import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.signupText}>Forgot Password</Text>
      <View style={styles.signupFormContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.signupFormText}>Email address</Text>
          <TextInput
            style={styles.signupFormInput}
            placeholder="Email Address"
            placeholderTextColor={colorsobject.grey7}
          />
        </View>
        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
