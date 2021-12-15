import React, {FC, useEffect, useLayoutEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import RssModels from '../../request/models/rssModels';

const rssModels = new RssModels();

const htmlparser2 = require('htmlparser2');

const ReadRss: FC = props => {
  const navigation = useNavigation();

  const appSettings = useAppSettings();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      try {
        const resp1 = await rssModels.fetchGet(
          'https://www.ruanyifeng.com/blog/atom.xml',
        );
        console.log(htmlparser2.parseFeed(resp1));
        const resp2 = await rssModels.fetchGet('https://coolshell.cn/feed');
        console.log(htmlparser2.parseFeed(resp2));
      } catch (e) {
        console.log('err', e);
      }
    })();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: appSettings.insets?.top,
          backgroundColor: appSettings.colors.background,
        },
      ]}>
      <StatusBar
        barStyle="default"
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      <Text>Setting Screen</Text>
    </View>
  );
};

export default ReadRss;
