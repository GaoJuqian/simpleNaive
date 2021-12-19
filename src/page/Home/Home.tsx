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
        barStyle={appSettings.theme === 'light' ? 'dark-content' : 'light-content'}
        translucent={true}
        backgroundColor="rgba(0,0,0,0)"
      />
      <Text style={{color: appSettings.colors.text}}>
        Home Screen1 Home Screen1Home Screen1 Home Screen1 Home Screen1Home Screen1 Home Screen1 Home Screen1 v Home
        Screen1 Home Screen1 Home Screen1 Home Screen1 Home Screen1 Home Screen1
      </Text>
    </View>
  );
};

export default Home;
