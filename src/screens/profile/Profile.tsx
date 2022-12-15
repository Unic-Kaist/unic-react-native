import { Auth, Hub } from 'aws-amplify'
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import {
  RecoilState,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil'

import { AppHeader } from '@/components/AppHeader'
import { CTAButton } from '@/components/button'
import MyProfile from './MyProfile'
import Screen from '@/components/Screen'
import { Spacing } from '@/components/Spacing'
import getSize from '@/utils/getSize'
import { navigate } from '@/navigators/utils'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { userState } from '@/store/user/userState'
import { withOAuth } from 'aws-amplify-react-native'

const Profile = props => {
  const { googleSignIn } = props
  const [user, setUser] = useRecoilState(userState)
  const { Layout, Images, Common } = useTheme()
  const { t } = useTranslation()
  const { heightPercentage, widthPercentage } = getSize()

  const onSignIn = () => {
    navigate('SignIn', null)
  }

  const onSignUp = () => {
    navigate('SignUp', null)
  }

  function isEmptyObj(obj: { constructor?: any }) {
    if (
      obj !== undefined &&
      obj !== null &&
      obj.constructor === Object &&
      Object.keys(obj).length === 0
    ) {
      return true
    }

    return false
  }

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData =>
            setUser({
              accessToken: userData?.signInUserSession.accessToken.jwtToken,
              userName: userData?.username,
            }),
          )
          break
        case 'signOut':
          break
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data)
          break
      }
    })
  }, [])

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'))
  }

  return (
    <Screen>
      {isEmptyObj(user) ? (
        <>
          <AppHeader
            back={false}
            // left={<Images.logo width={35} height={35} />}
            right={<Images.dots width={24} height={24} />}
          />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={[
                Common.container.base,
                Layout.fill,
                Layout.justifyContentCenter,
              ]}
            >
              <Text style={styles.titleText}>Let’s get you in</Text>
              <Spacing height={40} />
              {/* <CTAButton
                onPress={onSignIn}
                label="Continue with Twitter"
                mode="outlined"
                textColor="#212121"
                buttonColor="#FFFFFF"
                style={styles.snsButton}
                labelStyle={styles.snsText}
                contentStyle={styles.snsContainerButton}
                icon={<Images.twitterLogo width={24} height={24} />}
              />
              <Spacing height={16} /> */}
              <CTAButton
                onPress={googleSignIn}
                label="Continue with Google"
                mode="outlined"
                textColor="#212121"
                buttonColor="#FFFFFF"
                style={styles.snsButton}
                labelStyle={styles.snsText}
                contentStyle={styles.snsContainerButton}
                icon={<Images.googleLogo width={24} height={24} />}
              />
              <Spacing height={16} />
              <CTAButton
                onPress={() =>
                  Auth.federatedSignIn({ provider: 'SignInWithApple' })
                }
                label="Continue with Apple"
                mode="outlined"
                textColor="#212121"
                buttonColor="#FFFFFF"
                style={styles.snsButton}
                labelStyle={styles.snsText}
                contentStyle={styles.snsContainerButton}
                icon={<Images.appleLogo width={24} height={24} />}
              />
              <Spacing height={60} />
              <CTAButton
                onPress={onSignIn}
                label="Sign in with password"
                mode="contained"
                textColor="#FFFFFF"
                buttonColor="#00DF8F"
                style={styles.signInButton}
                labelStyle={styles.signInText}
                contentStyle={styles.signInContainerButton}
              />
            </View>
            <View
              style={[Layout.alignItemsCenter, { justifyContent: 'flex-end' }]}
            >
              <View style={[Layout.row, Layout.alignItemsCenter]}>
                <Text style={styles.bottomText}>Don’t have an account?</Text>
                <Spacing width={8} />
                <Pressable hitSlop={30} onPress={onSignUp}>
                  <Text style={styles.bottomButtonText}>Sign up</Text>
                </Pressable>
              </View>
            </View>
            <Spacing height={35} />
          </ScrollView>
        </>
      ) : (
        <MyProfile />
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 25,
  },
  snsContainerButton: {
    height: 64,
  },
  snsButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  snsText: {
    fontFamily: 'Urbanist',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 28,
  },
  signInContainerButton: {
    height: 55,
  },
  signInButton: {
    borderRadius: 8,
  },
  signInText: {
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
  },
  bottomText: {
    fontFamily: 'Urbanist',
    fontWeight: '400',
    fontSize: 14,
    color: '#9E9E9E',
  },
  bottomButtonText: {
    fontFamily: 'Urbanist',
    fontWeight: '600',
    fontSize: 14,
    color: '#24DC9A',
  },
})

export default withOAuth(Profile)
