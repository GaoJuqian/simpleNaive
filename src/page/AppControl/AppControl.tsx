import React, {FC, useLayoutEffect} from 'react';
import {Pressable, StatusBar, Text, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';

const AppControl: FC = props => {
  const navigation = useNavigation();
  const appSettings = useAppSettings();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  console.log(props);
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
      <Pressable onPress={() => null}>
        <Text>I'm pressable!</Text>
      </Pressable>
    </View>
  );
};

export default AppControl;
