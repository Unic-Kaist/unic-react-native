import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React, { useEffect } from 'react'

import { FeedNFT } from '@/types/FeedNFT'
import LinearGradient from 'react-native-linear-gradient'
import { Spacing } from '@/components/Spacing'
import { useTheme } from '@/hooks'

export function Owned() {
  const { Layout, Images, Common } = useTheme()

  useEffect(() => {
    // console.log('OwnedOwnedv')
  }, [])

  return (
    <View
      style={[
        Layout.fill,
        { backgroundColor: 'green', height: 500, width: 500 },
      ]}
    >
      <Text>Owned</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    width: 178,
    height: 178,
  },
})
