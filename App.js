import React, { useEffect, useState } from 'react';
import Router from './src/routes/router';
import { ToastProvider } from 'react-native-toast-notifications'
import { Keyboard } from 'react-native';
import themes from './src/style/themes'

export default function App() {
  const [positionToast, setPositionToast] = useState(85);

  const keyboardShow = Keyboard.addListener(
    'keyboardDidShow',
    () => setPositionToast(0)
  )

  const keyboardHide = Keyboard.addListener(
    'keyboardDidHide',
    () => setPositionToast(85)
  )

  useEffect(() => {
    return clean = () => {
      keyboardShow.remove();
      keyboardHide.remove();
    }
  })

  return (
    <ToastProvider
      placement='bottom'
      style={{ bottom: positionToast }}
      duration={2500}
      animationDuration={200}
      animationType='zoom-in'
      dangerColor={themes.dark.toastColor.danger}
      warningColor={themes.dark.toastColor.warning}
      successColor={themes.dark.toastColor.success}
      normalColor={themes.dark.toastColor.normal}
    >
      <Router />
    </ToastProvider>
  )
}
