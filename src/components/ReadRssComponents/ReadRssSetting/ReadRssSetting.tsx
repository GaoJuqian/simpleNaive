import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import AppHeader from '@components/commom/AppHeader/AppHeader';
import {STORAGE_KEYS, storageGetData, storageSetData} from 'src/utils/storage';
import AppList from '@components/commom/AppList/AppList';
import AppCardPressAble from '@components/commom/AppCardPressAble/AppCardPressAble';
import AppModal from '@components/commom/AppModal/AppModal';

const ReadRssSetting = () => {
  const appSettings = useAppSettings();
  // const route = useRoute();
  const [rssFeedsList, setRssFeedsList] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);

  useLayoutEffect(() => {
    (async () => {
      await storageSetData(`${STORAGE_KEYS.RSS_LIST}`, [
        {
          name: '阮一峰阮一峰阮一峰',
          url: 'https://www.ruanyifeng.com/blog/atom.xml',
        },
        {name: 'ASDFGHJKL', url: 'https://coolshell.cn/feed'},
        {name: 'gaojuqian', url: 'https://www.gaojuqian.com/index.php/feed/'},
        {name: 'Movie-s', url: 'https://www.1895m.com/feed/'},
      ]);
    })();
  }, []);

  useLayoutEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const list = await storageGetData(`${STORAGE_KEYS.RSS_LIST}`);
    setRssFeedsList(list);
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
      <AppHeader title={'Rss配置'} />

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
                <Text style={[{color: appSettings.colors.text}]}>{item.name}</Text>
                <Text style={[{color: appSettings.colors.text}]}>{item.url}</Text>
              </>
            </AppCardPressAble>
          )}
        />
      </View>

      <AppModal visible={modalVisible} />
    </View>
  );
};

export default ReadRssSetting;
