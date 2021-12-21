import React, {useEffect, useState} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';

interface IProps {
  children: React.ReactElement;
  visible: boolean;
}
const AppModal = (props: IProps) => {
  const appSettings = useAppSettings();

  const [modalVisible, setModalVisible] = useState(props.visible);

  useEffect(() => {
    setModalVisible(props.visible);
  }, [props.visible]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{}}>
              Hello WorldHello WorldHello WorldHello WorldHello WorldHello World! Hello WorldHello
              WorldHello WorldHello WorldHello WorldHello World! Hello WorldHello WorldHello
              WorldHello WorldHello WorldHello World!
            </Text>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: appSettings.colors.primary}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>确认</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      {/*<Pressable*/}
      {/*  onPress={event => props.onPress(event)}*/}
      {/*  android_ripple={{color: appSettings.colors.primary}}*/}
      {/*  style={({pressed}) => ({*/}
      {/*    backgroundColor: pressed ? 'rgba(255,255,255, .2)' : appSettings.colors.card,*/}
      {/*    transform: pressed ? [{scale: 0.98}] : [{scale: 1}],*/}
      {/*    ...(props.style as object),*/}
      {/*  })}>*/}
      {/*  {props.children}*/}
      {/*</Pressable>*/}
    </>
  );
};

export default AppModal;
