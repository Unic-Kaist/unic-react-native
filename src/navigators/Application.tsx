import {
  ChangePasswordScreen,
  CreatePasswordScreen,
  ForgetPasswordScreen,
} from '@/screens/password'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { MyProfileScreen, ProfileScreen } from '@/screens/profile'
import React, { useEffect } from 'react'
import { RootStackParamList, navigateAndSimpleReset } from '@/navigators/utils'
import { StatusBar, TouchableOpacity, View } from 'react-native'

import { ConfirmEmailScreen } from '@/screens/confirmEmail'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import {
  NativeModules,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect } from 'react'
import { navigateAndSimpleReset, navigationRef } from './utils'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'
import MainNavigator from './Main'
import { NftGroupScreen } from '@/screens/nft-group'
import { PermissionScreen } from '@/screens/permission'
import { RootStackParamList } from './RootStackParamList'
import { ScannerDetailScreen } from '@/screens/scannerDetail'
import { ScannerScreen } from '@/screens/scanner'
import { SearchScreen } from '@/screens/search/SearchScreen'
import { SettingsScreen } from '@/screens/settings'
import { SignInScreen } from '@/screens/signin'
import { SignUpScreen } from '@/screens/signup'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationRef } from './utils'
import { useTheme } from '@/hooks'

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    scopes: ['openid', 'email', 'profile'],
    webClientId:
      '265811387125-7ct4p1o9u5agr0ps012lt42ur1ckclui.apps.googleusercontent.com',
    offlineAccess: true,
    iosClientId:
      '265811387125-k50qb7dih18apuhhkd2ck4m8m6uiigq6.apps.googleusercontent.com',
  })
}

const Stack = createStackNavigator<RootStackParamList>()

const ApplicationNavigator = () => {
  const { Layout, Colors, Images } = useTheme()
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.white,
    },
  }

  useEffect(() => {
    navigateAndSimpleReset('Profile')
  })

  useEffect(() => {
    googleSigninConfigure()
  }, [])

  return (
    <GestureHandlerRootView style={[Layout.fill]}>
      <View
        style={[
          Layout.fill,
          {
            backgroundColor: Colors.white,
          },
        ]}
      >
        <NavigationContainer theme={MyTheme} ref={navigationRef}>
          <Host>
            <StatusBar barStyle={'dark-content'} />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {Platform.OS === 'android' && (
                <Stack.Screen name="Permission" component={PermissionScreen} />
              )}
              <Stack.Screen name="Scanner" component={ScannerScreen} />
              {/* <Stack.Screen
                name="Main"
                component={MainNavigator}
                options={{
                  animationEnabled: false,
                }}
              /> */}
              <Stack.Screen
                name="ScannerDetail"
                component={ScannerDetailScreen}
              />
              <Stack.Screen name="NFTGroup" component={NftGroupScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="MyProfile" component={MyProfileScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen
                name="ForgetPassword"
                component={ForgetPasswordScreen}
              />
              <Stack.Screen
                name="CreatePassword"
                component={CreatePasswordScreen}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
              />
              <Stack.Screen
                name="ConfirmEmail"
                component={ConfirmEmailScreen}
              />
            </Stack.Navigator>
          </Host>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  )
}

export default ApplicationNavigator
