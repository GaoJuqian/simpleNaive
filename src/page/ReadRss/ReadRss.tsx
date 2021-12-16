import React, {FC, useLayoutEffect} from 'react';
import {ActivityIndicator, StatusBar, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ReadRssList from '@components/ReadRssComponents/ReadRssList/ReadRssList';

const Tab = createMaterialTopTabNavigator();

const mockrss = [
  {
    name: '阮一峰阮一峰阮一峰',
    url: 'https://www.ruanyifeng.com/blog/atom.xml',
  },
  {name: 'ASDFGHJKL', url: 'https://coolshell.cn/feed'},
  {name: 'gaojuqian', url: 'https://www.gaojuqian.com/index.php/feed/12312'},
  {name: 'Movie-s', url: 'https://www.1895m.com/feed/'},
];

const ReadRss: FC = props => {
  const navigation = useNavigation();

  const appSettings = useAppSettings();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: appSettings.insets?.top,
          backgroundColor: appSettings.colors.background,
        },
      ]}>
      <StatusBar barStyle="default" translucent={true} backgroundColor="rgba(0,0,0,0)" />
      <Tab.Navigator
        screenOptions={({route}) => ({
          // 活动
          tabBarActiveTintColor: appSettings.colors.primary,
          // 非活动
          tabBarInactiveTintColor: appSettings.colors.text,
          tabBarStyle: {
            backgroundColor: appSettings.colors.background,
            elevation: 1,
          },
          // 单个选项卡项的样式对象。
          tabBarItemStyle: {
            backgroundColor: appSettings.colors.background,
            flex: 1,
          },
          // 标签标签的样式对象。
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
          // 指示是否使制表符栏可滚动。
          tabBarScrollEnabled: mockrss.length > 3 ? true : false,
          tabBarIndicator: props => <TouchableOpacity {...props} />,
          // 按压选项卡的不透明度（仅限iOS和Android < 5.0）。
          tabBarPressOpacity: 0.5,
          // 材料涟漪的颜色（仅限Android >= 5.0）。
          tabBarPressColor: appSettings.colors.primary,
          // 指示是否启用轻扫手势。
          swipeEnabled: true,
          lazy: true,
          lazyPlaceholder: () => (
            <View style={{flex: 1, backgroundColor: appSettings.colors.background}}>
              <ActivityIndicator style={{flex: 1}} size="large" color={appSettings.colors.primary} />
            </View>
          ),
        })}>
        {mockrss.map((rssListItem, rssListIdx) => (
          <Tab.Screen
            name={rssListItem.name}
            component={ReadRssList}
            key={rssListIdx}
            initialParams={{url: rssListItem.url}}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default ReadRss;
