import { Spacing } from '@/components/Spacing'
import { FeedNFT } from '@/types/FeedNFT'
import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
  data: FeedNFT
  onPress: () => void
  size?: ViewStyle['width']
}

export function NFTCard({ data, onPress, size }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={[styles.container, size ? { width: size, height: size } : {}]}
      >
        <Image style={styles.image} source={{ uri: data.imageUrl }} />
        <View style={styles.categoryIconBox}>
          <Image
            style={styles.categoryIconImage}
            source={require('@/assets/images/ic_nft_category_1.png')}
          />
        </View>
        <LinearGradient
          style={styles.footerBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']}
        />
        <View style={styles.footerContainer}>
          <Text style={styles.name}>{data.title}</Text>
          <Spacing height={3} />
          <View style={styles.creatorContainer}>
            <Text style={styles.creatorText}>{data.creator}</Text>
            <Spacing width={4} />
            <Image
              style={styles.bookmarkIcon}
              source={require('@/assets/images/ic_nft_bookmark.png')}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
  image: {
    width: '100%',
    height: '100%',
  },
  categoryIconBox: {
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  categoryIconImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8,
  },
  name: {
    fontFamily: 'Urbanist-ExtraBold',
    fontSize: 20,
    lineHeight: 28,
    color: 'rgba(255, 255, 255, 1)',
  },
  creatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 14,
    lineHeight: 16.8,
    color: 'rgba(255, 255, 255, 1)',
  },
  footerBackground: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 98,
  },
  bookmarkIcon: {
    width: 12,
    height: 12,
  },
})
