import React, { useEffect } from 'react'

import { Header } from './components/Header'
import { NFTGroupList } from './components/NFTGroupList'
import Screen from '@/components/Screen'
import { ScrollView } from 'react-native'
import { Spacing } from '@/components/Spacing'
import { navigate } from '@/navigators/utils'
import { useNewsFeed } from './hooks/useNewsFeed'
import { useTheme } from '@/hooks'

export function MainScreen() {
  const { Layout } = useTheme()
  const forYou = useNewsFeed('forYou')
  const hot = useNewsFeed('hot')
  const recently = useNewsFeed('recently')

  const handleHotClick = () =>
    navigate('NFTGroup', {
      category: 'hot',
      title: 'Hot right now',
    })

  const handleRecentlyClick = () =>
    navigate('NFTGroup', {
      category: 'recently',
      title: 'Recently minted',
    })

  const handleForYouClick = () =>
    navigate('NFTGroup', { category: 'forYou', title: 'For you' })

  return (
    <Screen>
      <ScrollView style={Layout.fill}>
        <Header />
        <NFTGroupList
          title="For you"
          onViewMore={handleForYouClick}
          onSelect={handleForYouClick}
          data={forYou.data ?? []}
        />
        <Spacing height={12} />
        <NFTGroupList
          title="Hot right now"
          onViewMore={handleHotClick}
          onSelect={handleHotClick}
          data={hot.data ?? []}
        />
        <Spacing height={12} />
        <NFTGroupList
          title="Recently minted"
          onViewMore={handleRecentlyClick}
          onSelect={handleRecentlyClick}
          data={recently.data ?? []}
        />
        <ScrollView />
      </ScrollView>
    </Screen>
  )
}
