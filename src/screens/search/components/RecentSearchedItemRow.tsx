import { Spacing } from '@/components/Spacing'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'

interface Props {
  text: string
  onPress: () => void
  onDelete: () => void
}

export function RecentSearchedItemRow({ text, onPress, onDelete }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.container}>
        <SearchTypeIcon />
        <Spacing width={16} />
        <Text style={styles.text}>{text}</Text>
        <Spacing flex={1} />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ padding: 10 }}
          onPress={onDelete}
        >
          <Image
            style={styles.xIcon}
            source={require('@/assets/images/ic_recent_searched_x.png')}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

function SearchTypeIcon() {
  return (
    <View style={styles.searchTypeIconContainer}>
      <Image
        style={styles.searchTypeIconImage}
        source={require('@/assets/images/ic_search_black.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  searchTypeIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(215, 215, 215, 1)',
    borderRadius: 64,
    width: 64,
    height: 64,
  },
  searchTypeIconImage: {
    width: 17,
    height: 17,
  },
  text: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 18,
    lineHeight: 21.6,
    color: '#000',
  },
  xIcon: {
    width: 10,
    height: 10,
  },
})
