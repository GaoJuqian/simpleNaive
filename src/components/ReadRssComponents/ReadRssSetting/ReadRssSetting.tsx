import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import AppHeader from '@components/commom/AppHeader/AppHeader';
import {STORAGE_KEYS, storageGetData, storageSetData} from 'src/utils/storage';

const noListImg = require('src/assets/commom/noList.png');

const ReadRssSetting = () => {
  const appSettings = useAppSettings();
  // const route = useRoute();
  const [rssFeedsList, setRssFeedsList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    (async () => {
      const list = await storageGetData(`${STORAGE_KEYS.RSS_LIST}`);
      setRssFeedsList(list);
    })();
  }, []);

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
        <FlatList
          onRefresh={async () => {
            setIsRefreshing(true);
            // await getRssFunction();
            setIsRefreshing(false);
          }}
          // 在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的符号。
          refreshing={isRefreshing}
          data={rssFeedsList}
          renderItem={({item}: any) => (
            <Pressable
              onPress={() => null}
              android_ripple={{color: appSettings.colors.primary}}
              style={({pressed}) => ({
                backgroundColor: pressed ? 'rgba(255,255,255, .2)' : appSettings.colors.card,
                transform: pressed ? [{scale: 0.98}] : [{scale: 1}],
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 6,
              })}>
              <Text style={[{color: appSettings.colors.text}]}>{item.name}</Text>
              <Text style={[{color: appSettings.colors.text}]}>{item.url}</Text>
            </Pressable>
          )}
          keyExtractor={(item, idx) => String(idx)}
          // 指定除data外的属性 渲染用
          extraData={{}}
          // 列表为空时渲染该组件。
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50%',
              }}>
              <Image source={noListImg} />
              <Text style={{color: appSettings.colors.text, marginTop: 10}}>暂无数据</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ReadRssSetting;
