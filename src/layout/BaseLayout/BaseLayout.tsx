import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
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
    name: 'Setting',
    options: {
      title: '设置',
    },
    component: require('src/page/Setting/Setting').default,
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
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = 'compass';
            if (route.name === 'Home') {
              iconName = focused ? 'laughing' : 'slightly-smile';
            } else if (route.name === 'Setting') {
              iconName = focused ? 'spinner-cog' : 'player-settings';
            }
            return <Fontisto name={iconName} size={size} color={color} />;
          },
          tabBarButton: props => {
            return (
              <Pressable
                {...props}
                style={({pressed}) => ({
                  transform: pressed ? [{scale: 0.9}] : [{scale: 1}],
                  flex: 1,
                })}
              />
            );
          },
          tabBarActiveTintColor: appSettings.colors.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarActiveBackgroundColor: appSettings.colors.background,
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