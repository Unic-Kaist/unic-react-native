import { RootStackScreenProps, navigate } from '@/navigators/utils'
import { ScrollView, StyleSheet, Text } from 'react-native'

import { AppHeader } from '@/components/AppHeader'
import { CTAButton } from '@/components/button'
import React from 'react'
import Screen from '@/components/Screen'
import { Spacing } from '@/components/Spacing'
import getSize from '@/utils/getSize'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'

const ConfirmEmail = ({
  route: { params },
}: RootStackScreenProps<'ConfirmEmail'>) => {
  const { t } = useTranslation()
  const { Images, Common, Layout } = useTheme()
  const { heightPercentage, widthPercentage } = getSize()

  const onDone = () => {
    navigate('SignIn', null)
  }
  return (
    <Screen>
      <AppHeader back={true} />
      <ScrollView
        style={[Common.container.base]}
        contentContainerStyle={styles.scorollView}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titleText}>Please confirm your email</Text>
        <Spacing height={heightPercentage(20)} />
        <Text style={styles.descriptionText}>
          {`Confirmation email has been sent to ${params?.email}`}
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

export default ConfirmEmail
