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
import { RootStackScreenProps, navigate } from '@/navigators/utils'

import { AppHeader } from '@/components/AppHeader'
import { Auth } from 'aws-amplify'
import { CTAButton } from '@/components/button'
import CommonTextInput from '@/components/textInput/CommonTextInput'
import Screen from '@/components/Screen'
import { Spacing } from '@/components/Spacing'
import getSize from '@/utils/getSize'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'

const ChangePassword = ({
  route: { params },
}: RootStackScreenProps<'ChangePassword'>) => {
  const { email } = params
  const { t } = useTranslation()
  const { Images, Common, Layout } = useTheme()
  const { heightPercentage, widthPercentage } = getSize()

  const [codeInputText, setCodeInputText] = useState('')
  const codeInputRef: any = useRef()
  const [codeInputType, setCodeInputType] = useState('placeholder')
  const [codeErrorMsg, setCodeErrorMsg] = useState('')

  const [pwInputText, setPwInputText] = useState('')
  const pwInputRef: any = useRef()
  const [pwInputType, setPwInputType] = useState('placeholder')
  const [pwErrorMsg, setPwErrorMsg] = useState('')

  const resetPassword = () => {
    Auth.forgotPasswordSubmit(email, codeInputText, pwInputText)
      .then(data => {
        console.log(data)
        navigate('SignIn', null)
      })
      .catch(err => console.log(err))
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
            Change your
            {'\n'}Password
          </Text>
        </View>
        <Spacing height={60} />
        <CommonTextInput
          icon={<Images.loginLocIcon width={16} height={16} />}
          placeholder={'Code'}
          width={'100%'}
          height={60}
          inputType={codeInputType}
          errorMessage={codeErrorMsg}
          onChageInputType={setCodeInputType}
          inputText={codeInputText}
          setText={setCodeInputText}
          setMaxLength={100}
          setCapitalize={'none'}
          inputRef={codeInputRef}
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
          onPress={resetPassword}
          label="Change"
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

export default ChangePassword
