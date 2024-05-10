import {
  Alert,
  Modal,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';

const CreateChatModel = ({open, setOpen, CreateRoom}) => {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setModalVisible(open);
  }, [open]);
  const [chatName, setChatName] = useState('');
  return (
    <View style={styles.modalBGContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   //Alert.alert("Modal has been closed.");
        //   setModalVisible(false);
        // }}
        style={{flex: 1}}>
        <View style={styles.createModalContainer}>
          <Icon
            name="close"
            size={20}
            color={colorsobject.black}
            style={{alignSelf: 'flex-end', margin: 10}}
            onPress={() => {
              setModalVisible(false);
              setOpen(false);
            }}
          />
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Enter Chat Name"
              placeholderTextColor={colorsobject.grey5}
              style={styles.chatInput}
              value={chatName}
              onChangeText={text => setChatName(text)}
            />
          </View>
          <TouchableOpacity
            style={
              chatName?.length <= 0 ? styles.saveBtnDisabled : styles.saveBtn
            }
            activeOpacity={0.8}
            disabled={chatName?.length <= 0}
            onPress={() => {
              CreateRoom(chatName);
              setModalVisible(false);
              setOpen(false);
            }}>
            <Text
              style={{
                color: colorsobject.white,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '700',
              }}>
              Create Chat
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CreateChatModel;
