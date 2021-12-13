import React, {FC, useLayoutEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';

const Home: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // 安全区 paddingTop: insets.top
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
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
