import React, {FC, useLayoutEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';

const Home: FC = () => {
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
          paddingBottom: appSettings.insets?.bottom,
          backgroundColor: appSettings.colors.background,
        },
      ]}>
      <StatusBar
        barStyle="default"
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      <Text>Home Screen1</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Home;
