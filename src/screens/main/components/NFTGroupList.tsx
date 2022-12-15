import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Spacing } from '@/components/Spacing'
import { NFTCard } from './NFTCard'
import { ScrollView } from 'react-native'
import { FeedNFT } from '@/types/FeedNFT'

interface Props {
  title: string
  onViewMore: () => void
  onSelect: (item: FeedNFT) => void
  data: FeedNFT[]
}

export function NFTGroupList({ title, onViewMore, onSelect, data }: Props) {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Spacing flex={1} />
        <TouchableOpacity activeOpacity={0.8} onPress={onViewMore}>
          <View style={styles.viewMoreContainer}>
            <Text style={styles.viewMoreText}>view more</Text>
            <Spacing width={4} />
            <Image
              style={styles.viewMoreIcon}
              source={require('@/assets/images/ic_viewmore_chevron.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        style={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      >
        <Spacing width={16} />
        {data.map(item => (
          <View
            style={{ display: 'flex', flexDirection: 'row' }}
            key={item.hashId}
          >
            <NFTCard data={item} onPress={() => onSelect(item)} />
            <Spacing width={8} />
          </View>
        ))}
        <Spacing width={8} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 2,
    paddingHorizontal: 17,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 36.5,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Urbanist-Bold',
  },
  viewMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    fontFamily: 'Urbanist-Medium',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19.2,
  },
  viewMoreIcon: {
    width: 11,
    height: 11,
    resizeMode: 'contain',
  },
  listContainer: {
    paddingVertical: 8,
  },
})
