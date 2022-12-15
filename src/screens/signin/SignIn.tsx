import { Auth, Hub } from 'aws-amplify'
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { cognitoSignIn, cognitoSignOut } from '@/services/auth/AuthService'
import { navigate, navigateAndSimpleReset } from '@/navigators/utils'

import { AppHeader } from '@/components/AppHeader'
import { CTAButton } from '@/components/button'
import CommonTextInput from '@/components/textInput/CommonTextInput'
import Screen from '@/components/Screen'
import { Spacing } from '@/components/Spacing'
import getSize from '@/utils/getSize'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { modalState } from '@/store/modal'
import { queryUserById } from '@/remotes/user'
import useModal from '@/hooks/useModal'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { userState } from '@/store/user/userState'
import { withOAuth } from 'aws-amplify-react-native'

const SignIn = props => {
  const { googleSignIn } = props
  const [user, setUser] = useRecoilState(userState)
  const { t } = useTranslation()
  const { Images, Common, Layout } = useTheme()
  const { heightPercentage, widthPercentage } = getSize()

  const [emailInputText, setEmailInputText] = useState('')
  const emailInputRef: any = useRef()
  const [emailInputType, setEmailInputType] = useState('placeholder')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')

  const [pwInputText, setPwInputText] = useState('')
  const pwInputRef: any = useRef()
  const [pwInputType, setPwInputType] = useState('placeholder')
  const [pwErrorMsg, setPwErrorMsg] = useState('')

  const [isValidationsHidden, setIsValidationsHidden] = useState(true)

  const { showModal } = useModal()

  const { mutate, isLoading } = useMutation(
    ['email_sign_in'],
    async () => {
      const cognitoResponse = await cognitoSignIn(emailInputText, pwInputText)

      if (cognitoResponse?.code) {
        throw Error(cognitoResponse)
      }

      const accessToken =
        cognitoResponse?.signInUserSession.accessToken.jwtToken
      const refreshToken = cognitoResponse?.signInUserSession.refreshToken.token
      const userId = cognitoResponse?.username

      const tempUser = await queryUserById(userId)

      setUser({
        ...tempUser,
        accessToken,
        refreshToken,
      })

      return cognitoResponse
    },
    {
      onSuccess: () => {
        navigateAndSimpleReset('Main')
      },
      onError: (error: any) => {
        const message = error.message.split(':').at(-1)
        console.log('failed cognitoSignIn: ', message)
      },
    },
  )

  const handleClickCommonModal = () => {
    showModal({
      modalType: 'ConfirmModal',
      modalProps: {
        title: 'test',
        message: 'test',
        handleClose: () => {
          console.log('handleClose')
        },
        handleConfirm: () => {
          console.log('handleConfirm')
        },
      },
    })
  }

  const onSignIn = async () => {
    console.log('onSignIn')
    try {
      const response = await cognitoSignIn(emailInputText, pwInputText)

      if (
        response === 'UserNotConfirmedException' ||
        response === 'UserNotFoundException'
      ) {
        handleClickCommonModal()
      } else {
        mutate()
      }
    } catch (e) {
      console.log('clickSignIn error', e)
      handleClickCommonModal()
    }
  }

  const onFaceSignIn = () => {
    console.log('onFaceSignIn')
    cognitoSignOut()
  }

  const onTwitterSignIn = () => {
    console.log('onTwitterSignIn')
  }

  const goToSignIn = () => {
    console.log('goToSignIn')
    navigate('CreatePassword', null)
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

  const forgotPassword = () => {
    Auth.forgotPassword(emailInputText)
      .then(data => navigate('ForgetPassword', { email: emailInputText }))
      .catch(err => console.log(err))
  }

  return (
    <Screen>
      <AppHeader back={true} />
      <ScrollView
        style={[Common.container.base]}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Spacing height={60} />
        <View>
          <Text style={styles.titleText}>
            Login to your
            {'\n'}Account
          </Text>
        </View>
        <Spacing height={60} />
        <CommonTextInput
          icon={<Images.loginEmailIcon width={16} height={16} />}
          placeholder={'Email'}
          width={'100%'}
          height={heightPercentage(50)}
          inputType={emailInputType}
          errorMessage={emailErrorMsg}
          onChageInputType={setEmailInputType}
          inputText={emailInputText}
          setText={setEmailInputText}
          setMaxLength={100}
          setCapitalize={'none'}
          inputRef={emailInputRef}
        />
        <Spacing height={20} />
        <CommonTextInput
          icon={<Images.loginLocIcon width={17} height={17} />}
          placeholder={'Password'}
          width={'100%'}
          height={heightPercentage(50)}
          inputType={pwInputType}
          errorMessage={pwErrorMsg}
          onChageInputType={setPwInputType}
          inputText={pwInputText}
          setText={setPwInputText}
          setMaxLength={100}
          setCapitalize={'none'}
          setSecureText={true}
          inputRef={pwInputRef}
        />
        <Spacing height={20} />
        <CTAButton
          onPress={onSignIn}
          label="Sign in"
          mode="contained"
          textColor="#FFFFFF"
          buttonColor="#00DF8F"
          style={styles.signInButton}
          labelStyle={styles.signInText}
          contentStyle={styles.signInContainerButton}
        />
        <Spacing height={heightPercentage(20)} />
        <TouchableOpacity style={[Layout.rowCenter]} onPress={forgotPassword}>
          <Text style={styles.bottomButtonText}>Forgot the password?</Text>
        </TouchableOpacity>
        <Spacing height={heightPercentage(60)} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
          <View>
            <Text style={{ width: 140, textAlign: 'center', fontSize: 18 }}>
              or continue with
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
        </View>
        <Spacing height={heightPercentage(20)} />
        <View style={[Layout.row, Layout.justifyContentBetween]}>
          <TouchableOpacity
            style={[
              Layout.alignItemsCenter,
              Layout.justifyContentCenter,
              styles.snsButton,
            ]}
            onPress={onFaceSignIn}
          >
            <Images.twitterLogo width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Layout.alignItemsCenter,
              Layout.justifyContentCenter,
              styles.snsButton,
            ]}
            onPress={googleSignIn}
          >
            <Images.googleLogo width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Layout.alignItemsCenter,
              Layout.justifyContentCenter,
              styles.snsButton,
            ]}
            onPress={() =>
              Auth.federatedSignIn({ provider: 'SignInWithApple' })
            }
          >
            <Images.appleLogo width={24} height={24} />
          </TouchableOpacity>
        </View>
        <Spacing height={40} />
        <View style={[Layout.alignItemsCenter, { justifyContent: 'flex-end' }]}>
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <Text style={styles.bottomText}>Don’t have an account?</Text>
            <Spacing width={8} />
            <Pressable hitSlop={30} onPress={goToSignIn}>
              <Text style={styles.bottomButtonText}>Sign up</Text>
            </Pressable>
          </View>
        </View>
        <Spacing height={35} />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 40,
  },
  signInContainerButton: {
    height: 55,
  },
  signInButton: {
    borderRadius: 10,
  },
  signInText: {
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 18,
  },
  snsButton: {
    width: 88,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
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

export default withOAuth(SignIn)
