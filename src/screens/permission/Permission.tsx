import { NativeModules, Platform, ScrollView, View } from 'react-native'
import { PERMISSIONS, requestMultiple } from 'react-native-permissions'
import React, { useEffect } from 'react'

import { Logo } from '@/components/Logo'
import { navigateAndSimpleReset } from '@/navigators/utils'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'

const Permission = () => {
  const { t } = useTranslation()
  const { Gutters, Layout } = useTheme()
  const { NativeMobileSDKBridge } = NativeModules
  useEffect(() => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]).then(statuses => {
      console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA])
      console.log(
        'READ_EXTERNAL_STORAGE',
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
      )
      console.log(
        'WRITE_EXTERNAL_STORAGE',
        statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
      )
      console.log(
        'ACCESS_FINE_LOCATION',
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
      )
      if (
        statuses[PERMISSIONS.ANDROID.CAMERA] === 'granted' &&
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'granted' &&
        statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'granted'
      ) {
        if (Platform.OS === 'android') {
          navigateAndSimpleReset('Scanner')
        }
      }
    })
  }, [])

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    ></ScrollView>
  )
}

export default Permission
