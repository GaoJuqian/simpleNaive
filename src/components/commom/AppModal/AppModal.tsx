import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';

interface IProps {
  children: React.ReactElement;
  visible: boolean;
  closeFun: () => void;
  okFun: () => void;
}
const AppModal = (props: IProps) => {
  const appSettings = useAppSettings();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          props.closeFun();
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: appSettings.colors.card}]}>
            <View>{props.children}</View>
            <View style={styles.ButtonBox}>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: appSettings.colors.primary}}
                onPress={() => {
                  props.okFun();
                }}>
                <Text style={styles.textStyle}>确认</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: appSettings.colors.card}}
                onPress={() => {
                  props.closeFun();
                }}>
                <Text style={styles.textStyle}>取消</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AppModal;
