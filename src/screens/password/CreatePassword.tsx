import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useRef, useState } from 'react'

import { AppHeader } from '@/components/AppHeader'
import { CTAButton } from '@/components/button'
import CommonTextInput from '@/components/textInput/CommonTextInput'
import Screen from '@/components/Screen'
import { Spacing } from '@/components/Spacing'
import { cognitoSignIn } from '@/services/auth/AuthService'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { navigate } from '@/navigators/utils'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'

function getKeyboardVerticalOffset(): number {
  const more = Platform.OS === 'ios' ? 23 : -13
  return getStatusBarHeight() + more
}

const CreatePassword = () => {
  const { t } = useTranslation()
  const { Images, Common, Layout } = useTheme()

  const [emailInputText, setEmailInputText] = useState('')
  const emailInputRef: any = useRef()
  const [emailInputType, setEmailInputType] = useState('placeholder')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')

  const [pwInputText, setPwInputText] = useState('')
  const pwInputRef: any = useRef()
  const [pwInputType, setPwInputType] = useState('placeholder')
  const [pwErrorMsg, setPwErrorMsg] = useState('')

  const [isShowNoti, setIsShowNoti] = useState(true)

  const [isValidationsHidden, setIsValidationsHidden] = useState(true)
  const [pwCharValid, setPwCharValid] = useState(false)
  const [pwLetterValid, setPwLetterValid] = useState(false)
  const [pwSpecialValid, setPwSpecialValid] = useState(false)
  const [pwNumberValid, setPwNumberValid] = useState(false)

  const onSignIn = () => {
    console.log('onSignIn')
    cognitoSignIn(emailInputText, pwInputText)
  }

  const onFaceSignIn = () => {
    console.log('onFaceSignIn')
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn')
  }

  const onTwitterSignIn = () => {
    console.log('onTwitterSignIn')
  }

  const goToSignIn = () => {
    console.log('goToSignIn')
    navigate('SignIn', null)
  }

  return (
    <Screen>
      <ScrollView
        style={[Common.container.base]}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <AppHeader back={true} />
        <Spacing height={60} />
        <View>
          <Text style={styles.titleText}>
            Login to your
            {'\n'}Account
          </Text>
        </View>
        <Spacing height={60} />
        <CommonTextInput
          icon={<Images.loginLocIcon width={16} height={16} />}
          placeholder={'Email'}
          width={'100%'}
          height={60}
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
          height={60}
          inputType={pwInputType}
          errorMessage={pwErrorMsg}
          onChageInputType={setPwInputType}
          inputText={pwInputText}
          setText={setPwInputText}
          setMaxLength={100}
          setCapitalize={'none'}
          inputRef={pwInputRef}
        />
        <Spacing height={20} />
        <CTAButton
          onPress={onSignIn}
          label="Sign up"
          mode="contained"
          textColor="#FFFFFF"
          buttonColor="#00DF8F"
          style={[
            Layout.alignItemsCenter,
            Layout.justifyContentCenter,
            styles.signInButton,
          ]}
          labelStyle={styles.signInText}
        />
        <Spacing height={20} />
        <View style={[Layout.rowCenter]}>
          <Text style={styles.bottomButtonText}>Forgot the password?</Text>
        </View>
        <Spacing height={30} />
        <View style={[Layout.row, Layout.justifyContentBetween]}>
          <TouchableOpacity
            style={[
              Layout.alignItemsCenter,
              Layout.justifyContentCenter,
              styles.snsButton,
            ]}
            onPress={onFaceSignIn}
          >
            <Images.facebooLogo width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Layout.alignItemsCenter,
              Layout.justifyContentCenter,
              styles.snsButton,
            ]}
            onPress={onGoogleSignIn}
          >
            <Images.googleLogo width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Layout.alignItemsCenter,
              Layout.justifyContentCenter,
              styles.snsButton,
            ]}
            onPress={onTwitterSignIn}
          >
            <Images.twitterLogo width={24} height={24} />
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
  signInButton: {
    height: 55,
  },
  signInText: {
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 20,
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

export default CreatePassword
