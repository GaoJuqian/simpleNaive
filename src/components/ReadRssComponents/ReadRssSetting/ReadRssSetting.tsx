import React, {useEffect, useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import AppHeader from '@components/commom/AppHeader/AppHeader';
import {STORAGE_KEYS, storageGetData, storageSetData} from 'src/utils/storage';
import AppList from '@components/commom/AppList/AppList';
import AppCardPressAble from '@components/commom/AppCardPressAble/AppCardPressAble';
import AppModal from '@components/commom/AppModal/AppModal';
import Feather from 'react-native-vector-icons/Feather';

const ReadRssSetting = () => {
  const appSettings = useAppSettings();
  // const route = useRoute();
  const [rssFeedsList, setRssFeedsList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: '',
    url: '',
  });

  useEffect(() => {
    getRssList();
  }, []);

  const getRssList = async () => {
    const list = await storageGetData(`${STORAGE_KEYS.RSS_LIST}`);
    setRssFeedsList(list);
  };

  const setRssList = async () => {
    if (inputValue.name.length > 0 && inputValue.url.length > 0) {
      const data = [...rssFeedsList, inputValue];
      await storageSetData(`${STORAGE_KEYS.RSS_LIST}`, data);
    } else {
      Alert.alert('请输入完整');
    }
  };

  useEffect(() => {
    console.log(rssFeedsList);
  }, [rssFeedsList]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: appSettings.colors.background,
        },
      ]}>
      <AppHeader
        title={'Rss配置'}
        renderRight={<Feather name={'plus'} size={30} color={appSettings.colors.text} />}
        onRightPress={() => setModalVisible(true)}
      />

      <View
        style={{
          padding: 10,
          flex: 1,
        }}>
        <AppList
          appListData={rssFeedsList}
          keyExtractor={(item, idx) => String(idx)}
          renderItem={({item}) => (
            <AppCardPressAble
              style={{
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 6,
              }}
              onPress={() => null}>
              <>
                <Text style={[styles.rssListItem, {color: appSettings.colors.text}]}>
                  标签: {item.name}
                </Text>
                <Text style={[styles.rssListItem, {color: appSettings.colors.text}]}>
                  URL: {item.url}
                </Text>
              </>
            </AppCardPressAble>
          )}
        />
      </View>

      <AppModal
        okFun={() => setRssList()}
        closeFun={() => setModalVisible(false)}
        visible={modalVisible}>
        <View style={{width: 300}}>
          <View style={{width: 300}}>
            <View style={styles.inputRow}>
              <Text style={{color: appSettings.colors.text}}>名称:</Text>
              <TextInput
                style={[styles.inputStyle, {backgroundColor: appSettings.colors.text}]}
                onChangeText={name => setInputValue({...inputValue, name})}
                value={inputValue.name}
                placeholder={'输入订阅Tab的名称'}
                clearButtonMode={'while-editing'}
                autoCorrect={false}
                keyboardAppearance={appSettings.theme === 'light' ? 'light' : 'dark'}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <Text style={{color: appSettings.colors.text}}>URL:</Text>
            <TextInput
              style={[styles.inputStyle, {backgroundColor: appSettings.colors.text}]}
              onChangeText={url => setInputValue({...inputValue, url})}
              value={inputValue.url}
              placeholder={'输入订阅url链接'}
              clearButtonMode={'while-editing'}
              autoCorrect={false}
              keyboardAppearance={appSettings.theme === 'light' ? 'light' : 'dark'}
            />
          </View>
        </View>
      </AppModal>
    </View>
  );
};

export default ReadRssSetting;
