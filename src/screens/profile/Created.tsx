import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { FeedNFT } from '@/types/FeedNFT'
import LinearGradient from 'react-native-linear-gradient'
import React from 'react'
import { Spacing } from '@/components/Spacing'
import { useTheme } from '@/hooks'

interface Props {}

export function Created() {
  const { Layout, Images, Common } = useTheme()
  return <View style={[Layout.fill, { backgroundColor: 'red' }]}></View>
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
