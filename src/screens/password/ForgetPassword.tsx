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
import { CTAButton } from '@/components/button'
import CommonTextInput from '@/components/textInput/CommonTextInput'
import Screen from '@/components/Screen'
import { Spacing } from '@/components/Spacing'
import { cognitoSignIn } from '@/services/auth/AuthService'
import getSize from '@/utils/getSize'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'

function getKeyboardVerticalOffset(): number {
  const more = Platform.OS === 'ios' ? 23 : -13
  return getStatusBarHeight() + more
}

const ForgetPassword = ({
  route: { params },
}: RootStackScreenProps<'ForgetPassword'>) => {
  const { email } = params
  const { t } = useTranslation()
  const { Images, Common, Layout } = useTheme()
  const { heightPercentage, widthPercentage } = getSize()

  const onDone = () => {
    navigate('ChangePassword', { email })
  }

  return (
    <Screen>
      <AppHeader back={true} />
      <ScrollView
        style={[Common.container.base]}
        contentContainerStyle={styles.scorollView}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titleText}>Please check your email</Text>
        <Spacing height={heightPercentage(20)} />
        <Text style={styles.descriptionText}>
          {`Password reset email has been sent to ${email}`}
        </Text>
        <Spacing height={heightPercentage(34)} />
        <CTAButton
          onPress={onDone}
          label="Done"
          mode="contained"
          textColor="#FFFFFF"
          buttonColor={'#00DF8F'}
          style={styles.doneButton}
          labelStyle={styles.doneButtonText}
          contentStyle={styles.doneContainerButton}
        />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  scorollView: { flexGrow: 1, justifyContent: 'center' },
  titleText: {
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 38,
    textAlign: 'center',
  },
  descriptionText: {
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#808191',
  },
  doneContainerButton: {
    height: 55,
  },
  doneButton: {
    borderRadius: 10,
  },
  doneButtonText: {
    fontFamily: 'Urbanist',
    fontWeight: '700',
    fontSize: 18,
  },
})

export default ForgetPassword
