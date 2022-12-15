import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import React from 'react'
import { navigateGoBack } from '@/navigators/utils'

export function CancelButton() {
  return (
    <TouchableOpacity onPress={() => navigateGoBack()}>
      <Text style={styles.text}>cancel</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Urbanist-Medium',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19.2,
    color: 'rgba(132, 132, 132, 1)',
  },
})
