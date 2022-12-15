import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

import React from 'react'
import { Spacing } from '@/components/Spacing'
import { navigate } from '@/navigators/utils'

export function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/ic_nufutu.png')}
        style={styles.logo}
      />
      <Spacing flex={1} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate('Search', null)}
      >
        <Image
          source={require('@/assets/images/ic_search.png')}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 56,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  searchIcon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },
})
