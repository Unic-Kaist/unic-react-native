import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { CancelButton } from './components/CancelButton'
import { RecentSearchedList } from './components/RecentSearchedList'
import Screen from '@/components/Screen'
import { SearchBar } from './components/SearchBar'
import { Spacing } from '@/components/Spacing'
import { navigate } from '@/navigators/utils'
import { useSearchHistory } from './hooks/useSearchHistory'
import { useTheme } from '@/hooks'
import { withSuspense } from '@/hocs/withSuspense'

export const SearchScreen = withSuspense(function SearchScreen() {
  const { Layout } = useTheme()
  const [value, onChange] = useState('')
  const searchHistory = useSearchHistory()

  const handleSearch = useCallback(
    (text: string) => {
      searchHistory.add(text)
      navigate('NFTGroup', { name: text })
    },
    [searchHistory],
  )

  return (
    <Screen>
      <View style={Layout.fill}>
        <Spacing height={20} />
        <View style={styles.headerContainer}>
          <View style={Layout.fill}>
            <SearchBar
              value={value}
              onChange={onChange}
              onSubmit={() => handleSearch(value)}
            />
          </View>
          <Spacing width={17} />
          <CancelButton />
        </View>
        <Spacing height={20} />
        <RecentSearchedList
          data={searchHistory.data}
          onDelete={searchHistory.remove}
          onSelect={handleSearch}
        />
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
  },
})
