import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'

import { Spacing } from './Spacing'
import { navigateGoBack } from '@/navigators/utils'
import { useTheme } from '@/hooks'

interface Props {
  back?: boolean | 'x'
  onPressBack?: Function
  title?: ReactNode
  right?: ReactNode[] | ReactNode
  left?: ReactNode
}
export function AppHeader({ back, title, right, left }: Props) {
  const { Images } = useTheme()
  return (
    <View style={styles.container}>
      {back !== false && (
        <TouchableOpacity onPress={() => navigateGoBack()}>
          <Images.arrowLeft width={25} height={25} />
        </TouchableOpacity>
      )}
      {left && left}
      {typeof title === 'string' ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        title
      )}
      <Spacing flex={1} />
      {right && right}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 23,
    height: 56,
  },
  title: {
    textAlign: 'center',
    position: 'absolute',
    marginHorizontal: 14,
    paddingTop: 24,
    paddingBottom: 14,
    width: '100%',
    zIndex: -1,
    left: 0,
    fontSize: 20,
    color: '#000',
    fontFamily: 'Urbanist-Bold',
  },
  backIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
})
