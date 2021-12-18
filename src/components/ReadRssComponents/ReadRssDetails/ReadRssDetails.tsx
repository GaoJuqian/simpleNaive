import React, {useLayoutEffect, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import styles from './styles';
import {useAppSettings} from '@components/SettingsProvider/SettingsProvider';
import {WebView} from 'react-native-webview';
import RssModels from 'src/request/models/rssModels';

const rssModels = new RssModels();

interface IProps {
  children?: React.ReactNode;
  route: {
    params: {
      url: string;
    };
  };
}
const ReadRssList = (props: IProps) => {
  const appSettings = useAppSettings();
  const [source, setSource] = useState<any>(undefined);
  const {width} = useWindowDimensions();

  useLayoutEffect(() => {
    (async () => {
      const link = props.route.params.url;
      setSource(link);
      // const resp = await rssModels.fetchGet(link);
      // console.log(resp);
      // if (resp) {
      //   setSource({
      //     html: resp,
      //   });
      // }
    })();
  }, [props.route.params.url]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: appSettings.colors.background,
        },
      ]}>
      <WebView source={{uri: source}} />
      {/*{source && <RenderHtml contentWidth={width} source={source} />}*/}
    </View>
  );
};

export default ReadRssList;
