import {
  Image,
  ImageSourcePropType,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { AppHeader } from '@/components/AppHeader'
import React from 'react'
import Screen from '@/components/Screen'
import { Spacing } from '@/components/Spacing'
import { useTheme } from '@/hooks'

export function SettingsScreen() {
  const { Layout } = useTheme()

  return (
    <Screen>
      <View style={Layout.fill}>
        <AppHeader title="Setting" back={false} />
      </View>
    </Screen>
  )
}

interface Props {
  icon: ImageSourcePropType
  title: string
  onPress: () => void
}

function MenuRow({ icon, title, onPress }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.leftIcon} source={icon} />
        <Spacing width={18} />
        <Text style={styles.title}>{title}</Text>
        <Spacing flex={1} />
        <Image
          style={styles.rightIcon}
          source={require('@/assets/images/ic_chevron_right_dark.png')}
        />
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  leftIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontFamily: 'Urbanist-Bold',
    fontWeight: '600',
    fonTsize: 18,
    lineHeight: 25.2,
    color: '#000',
  },
  rightIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
})
