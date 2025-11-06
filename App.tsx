import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from '@route';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { ToastProvider } from '@components';
import { StatusBar } from 'react-native';
import '@locales/i18n';

const config = {
  screens: {
    PLAYVIDEO: 'video/:_id',
  },
};

const linking = {
  prefixes: ['https://sharetube-063s.onrender.com', 'sharetube://'],
  config,
};

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar hidden={true} />
      <NavigationContainer linking={linking}>
        <StackNavigator />
        <ToastProvider />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
