import React, {FC, useContext, useLayoutEffect, useReducer} from 'react';
import {useColorScheme} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const settings: AppSettings.ISettings = {
  theme: 'light',
  colors: {
    primary: '#f2cac9', // #e899b0
    text: 'rgba(247,233,235, 1)',
    background: '#3d3b4f', // 玄色#622a1d // 玄青#3d3b4f
  },
  insets: null,
};

/***
 * 设置 settings
 * @param state settings
 * @param action type: 设置key, payload: value
 */
type actionType = keyof AppSettings.ISettings;
function reducer(
  state: AppSettings.ISettings,
  action: {
    type: actionType;
    payload: AppSettings.ISettings[actionType];
  },
): AppSettings.ISettings {
  switch (action.type) {
    case 'theme':
      if (action.payload === 'light') {
        return {
          ...state,
          theme: String(action.payload),
          // colors: {
          //   primary: 'rgba( 205,122,137, 1)',
          //   text: '#243f66',
          //   background: 'rgba(247,233,235, 1)',
          // },
        };
      } else {
        return {
          ...state,
          theme: String(action.payload),
          colors: {
            primary: 'rgba(247,233,235, 1)',
            text: '#243f66',
            background: '#3d3b4f',
          },
        };
      }
    case 'insets':
      return {
        ...state,
        insets: action.payload as AppSettings.ISettings['insets'],
      };
    default:
      throw new Error();
  }
}

// AppSettings Provide
const AppSettings = React.createContext<AppSettings.ISettings>(settings);

const SettingsProvider: FC = ({children}) => {
  const [settingsState, settingsDispatch] = useReducer<typeof reducer>(
    reducer,
    settings,
  );

  //****************************************************************************

  // 获取系统主题
  const systemTheme = useColorScheme();
  useLayoutEffect(() => {
    console.log(systemTheme);
    settingsDispatch({type: 'theme', payload: systemTheme as string});
  }, [systemTheme]);

  // 安全区 paddingTop: insets.top
  const insets = useSafeAreaInsets();
  useLayoutEffect(() => {
    settingsDispatch({type: 'insets', payload: insets});
  }, [insets]);

  //****************************************************************************

  return (
    <AppSettings.Provider value={settingsState}>
      {children}
    </AppSettings.Provider>
  );
};

export default SettingsProvider;

/**
 * 使用app配置
 */
export function useAppSettings() {
  const appSettings = useContext(AppSettings);
  if (appSettings == null) {
    throw new Error(
      'No safe area insets value available. Make sure you are rendering `<SettingsProvider>` at the top of your app.',
    );
  }
  return appSettings;
}
