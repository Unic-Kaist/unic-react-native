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
import { cognitoSignIn, cognitoSignUp } from '@/services/auth/AuthService'
import { navigate, navigateAndSimpleReset } from '@/navigators/utils'
import { useMutation, useQuery } from 'react-query'

import { AppHeader } from '@/components/AppHeader'
import { CTAButton } from '@/components/button'
import CommonTextInput from '@/components/textInput/CommonTextInput'
import Screen from '@/components/Screen'
import { Spacing } from '@/components/Spacing'
import getSize from '@/utils/getSize'
import { modalState } from '@/store/modal'
import { saveUser } from '@/remotes/user'
import { useRecoilState } from 'recoil'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { userState } from '@/store/user/userState'
import { withOAuth } from 'aws-amplify-react-native'

const SignUp = props => {
  const { googleSignIn } = props
  const [user, setUser] = useRecoilState(userState)
  const { t } = useTranslation()
  const { Images, Common, Layout } = useTheme()
  const { heightPercentage, widthPercentage } = getSize()

  const [nameTagInputText, setNameTagInputText] = useState('')
  const nameTagInputRef: any = useRef()
  const [nameTagInputType, setNameTagInputType] = useState('placeholder')
  const [nameTagErrorMsg, setNameTagEmailErrorMsg] = useState('')

  const [emailInputText, setEmailInputText] = useState('')
  const emailInputRef: any = useRef()
  const [emailInputType, setEmailInputType] = useState('placeholder')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')

  const [pwInputText, setPwInputText] = useState('')
  const pwInputRef: any = useRef()
  const [pwInputType, setPwInputType] = useState('placeholder')
  const [pwErrorMsg, setPwErrorMsg] = useState('')

  const [isShowPassword, setIsShowPassword] = useState('hide')

  const [buttonValid, setButtonValid] = useState(false)

  const { mutate, isLoading } = useMutation(
    ['email_sign_up'],
    async () => {
      const { userSub } = await cognitoSignUp(emailInputText, pwInputText)
      const cognitoResponse = await cognitoSignIn(emailInputText, pwInputText)

      if (cognitoResponse?.code) {
        throw Error(cognitoResponse)
      }

      const accessToken =
        cognitoResponse?.signInUserSession.accessToken.jwtToken
      const refreshToken = cognitoResponse?.signInUserSession.refreshToken.token
      const tempUser = {
        userId: userSub,
        userTag: nameTagInputText,
        description: '',
        socialLinks: {},
        accessToken,
        refreshToken,
      }

      const res = await saveUser(tempUser)

      setUser(tempUser)
      return res
    },
    {
      onSuccess: () => {
        navigateAndSimpleReset('Main')
      },
      onError: (error: any) => {
        const message = error.message.split(':').at(-1)
        console.log('failed cognitoSignUp: ', message)
      },
    },
  )

  useEffect(() => {
    if (nameTagInputText && emailInputText && pwInputText) {
      setButtonValid(true)
    } else {
      setButtonValid(false)
    }
  }, [nameTagInputText, emailInputText, pwInputText])

  const onSignup = async () => {
    if (buttonValid) {
      mutate()
      // cognitoSignUp(emailInputText, pwInputText)
      // setSaveUser({ userId: emailInputText, userTag: nameTagInputText })
    }
  }

  const onFaceSignIn = () => {
    console.log('onFaceSignIn')
  }

  const onTwitterSignIn = () => {
    console.log('onTwitterSignIn')
  }

  const goToSignIn = () => {
    console.log('goToSignIn')
    navigate('SignIn', null)
  }

  const setSecureMode = () => {
    if (isShowPassword === 'hide') {
      setIsShowPassword('show')
    } else if (isShowPassword === 'show') {
      setIsShowPassword('hide')
    }
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
      <AppHeader back={true} />
      <ScrollView
        style={[Common.container.base]}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Spacing height={heightPercentage(55)} />
        <View>
          <Text style={styles.titleText}>Create your{'\n'}Account</Text>
        </View>
        <Spacing height={heightPercentage(60)} />
        <CommonTextInput
          icon={<Images.loginPersionIcon width={16} height={20} />}
          placeholder={'Name tag'}
          width={'100%'}
          height={heightPercentage(50)}
          mode="outlined"
          inputType={nameTagInputType}
          errorMessage={nameTagErrorMsg}
          onChageInputType={setNameTagInputType}
          inputText={nameTagInputText}
          setText={setNameTagInputText}
          setMaxLength={100}
          setCapitalize={'none'}
          inputRef={nameTagInputRef}
        />
        <Spacing height={20} />
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
        <Spacing height={heightPercentage(20)} />
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
          inputRef={pwInputRef}
          isShowPassword={isShowPassword}
          isSecureMode
          secureIconPress={() => setSecureMode()}
        />
        <Spacing height={heightPercentage(30)} />
        <CTAButton
          onPress={onSignup}
          label="Create"
          mode="contained"
          textColor="#FFFFFF"
          buttonColor={buttonValid ? '#00DF8F' : '#96ECCD'}
          style={styles.signInButton}
          labelStyle={styles.signInText}
          contentStyle={styles.signInContainerButton}
        />
        <Spacing height={heightPercentage(40)} />
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
            <Text style={styles.bottomText}>Already have an account?</Text>
            <Spacing width={8} />
            <Pressable hitSlop={30} onPress={goToSignIn}>
              <Text style={styles.bottomButtonText}>Sign in</Text>
            </Pressable>
          </View>
        </View>
        <Spacing height={heightPercentage(35)} />
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

export default withOAuth(SignUp)
