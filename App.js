import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import Store from './src/store';
import AppProvider from './src/hooks';
import Routes from './src/routes';
import theme from './src/theme';

export default function App() {
  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <AppProvider>
          <Routes />
          <StatusBar style="auto" />
        </AppProvider>
      </PaperProvider>
    </Provider>
  );
}