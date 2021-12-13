import React, {FC, useContext, useLayoutEffect, useReducer} from 'react';
import {useColorScheme} from 'react-native';

const settings: AppSettings.ISettings = {
  theme: 'light',
  colors: {
    primary: '#cd7a89',
    text: '#f7e9eb',
    background: '',
  },
};

/***
 * 设置 settings
 * @param state settings
 * @param action type: 设置key, payload: value
 */
function reducer(
  state: AppSettings.ISettings,
  action: {type: keyof AppSettings.ISettings; payload: unknown},
): AppSettings.ISettings {
  switch (action.type) {
    case 'theme':
      return {...state, theme: action.payload as typeof action.type};
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

  // 获取系统主题
  const systemTheme = useColorScheme();
  useLayoutEffect(() => {
    settingsDispatch({type: 'theme', payload: systemTheme});
  }, [systemTheme]);

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
