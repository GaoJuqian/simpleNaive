import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Pressable} from 'react-native';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const router = [
  {
    name: 'Home',
    options: {
      title: '首页',
    },
    component: require('src/page/Home/Home').default,
  },
  {
    name: 'ReadRss',
    options: {
      title: 'RSS',
      headerShown: false,
    },
    component: require('src/page/ReadRss/ReadRss').default,
  },
  {
    name: 'AppControl',
    options: {
      title: '控制台',
    },
    component: require('src/page/AppControl/AppControl').default,
  },
];
const BaseLayout = () => {
  const appSettings = useAppSettings();

  return (
    <>
      {/*<Stack.Navigator screenOptions={headerBaseOpt} initialRouteName="Home">*/}
      {/*  {router.map((routerItem, routerIdx) => (*/}
      {/*    <Stack.Screen*/}
      {/*      name={routerItem.name}*/}
      {/*      component={routerItem.component}*/}
      {/*      options={routerItem.options}*/}
      {/*      key={routerIdx}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</Stack.Navigator>*/}
      <Tab.Navigator
        initialRouteName="Home"
        // tabBar={() => null}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const iconName = 'compass';
            if (route.name === 'Home') {
              return <Fontisto name={focused ? 'laughing' : 'slightly-smile'} size={size} color={color} />;
            }
            if (route.name === 'AppControl') {
              return <Ionicons name={focused ? 'ios-cube' : 'ios-cube-outline'} size={size} color={color} />;
            }
            if (route.name === 'ReadRss') {
              return <MaterialCommunityIcons name={focused ? 'rss-box' : 'rss'} size={size} color={color} />;
            }
            return <Fontisto name={iconName} size={size} color={color} />;
          },
          tabBarButton: props => {
            return (
              <Pressable
                {...props}
                style={({pressed}) => ({
                  transform: pressed ? [{scale: 0.9}] : [{scale: 1}],
                  backgroundColor: appSettings.colors.background,
                  flex: 1,
                })}
              />
            );
          },
          tabBarActiveTintColor: appSettings.colors.primary,
          tabBarInactiveTintColor: appSettings.colors.text,
          tabBarStyle: {backgroundColor: appSettings.colors.background},
        })}>
        {router.map((routerItem, routerIdx) => (
          <Tab.Screen
            name={routerItem.name}
            component={routerItem.component}
            options={routerItem.options}
            key={routerIdx}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default BaseLayout;
