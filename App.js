import React from 'react';
import Router from './src/routes/router';
import themes from './src/style/themes'
import { ToastProvider } from 'react-native-toast-notifications'
import { MusicProvider } from './src/contexts/music';
import { ConnectionProvider } from './src/contexts/connection';
import { SearchProvider } from './src/contexts/search';

export default function App() {
  return (
    <ToastProvider
      placement='bottom'
      style={{ bottom: '5%' }}
      duration={3500}
      animationDuration={200}
      animationType='zoom-in'
      dangerColor={themes.dark.toastColor.danger}
      warningColor={themes.dark.toastColor.warning}
      successColor={themes.dark.toastColor.success}
      normalColor={themes.dark.toastColor.normal}
    >
      <MusicProvider>
        <ConnectionProvider>
          <SearchProvider>
            <Router />
          </SearchProvider>
        </ConnectionProvider>
      </MusicProvider>
    </ToastProvider>
  )
}
