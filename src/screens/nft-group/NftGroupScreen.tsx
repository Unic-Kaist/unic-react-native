import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import { AppHeader } from '@/components/AppHeader'
import { NFTCard } from '../main/components/NFTCard'
import React from 'react'
import { RootStackScreenProps } from '@/navigators/utils'
import Screen from '@/components/Screen'
import { Spacing } from '@/components/Spacing'
import { chunk } from 'lodash'
import layout from '@/constants/Layout'
import { useNewsFeed } from '../main/hooks/useNewsFeed'
import { useTheme } from '@/hooks'

export function NftGroupScreen({
  route: { params },
}: RootStackScreenProps<'NFTGroup'>) {
  const { Layout } = useTheme()
  const isCategoryGroup = 'category' in params
  const category = isCategoryGroup ? params.category : params.name
  const feed = useNewsFeed(category)
  const title = params.title ?? category

  return (
    <Screen>
      <View style={Layout.fill}>
        <AppHeader
          title={title}
          right={isCategoryGroup && <AddButton onPress={console.log} />}
        />
        <ScrollView style={Layout.fill}>
          <Spacing height={12} />
          {chunk(feed.data, 2).map(([item1, item2]) => (
            <View style={styles.row} key={item1.hashId + item2?.hashId}>
              <NFTCard
                data={item1}
                onPress={console.log}
                size={(layout.window.width - 40) / 2}
              />
              <Spacing width={8} />
              {item2 && (
                <NFTCard
                  data={item2}
                  onPress={console.log}
                  size={(layout.window.width - 40) / 2}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </Screen>
  )
}

function AddButton({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Image
        source={require('@/assets/images/ic_add_box.png')}
        style={styles.addIcon}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  addIcon: {
    width: 20,
    height: 20,
    margin: 5,
  },
})
