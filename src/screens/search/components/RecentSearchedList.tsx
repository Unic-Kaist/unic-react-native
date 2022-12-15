import { useTheme } from '@/hooks'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { RecentSearchedItemRow } from './RecentSearchedItemRow'

interface Props {
  data: string[]
  onDelete: (item: string) => void
  onSelect: (item: string) => void
}

export function RecentSearchedList({ data, onDelete, onSelect }: Props) {
  const { Layout } = useTheme()

  if (!data.length) {
    return <React.Fragment />
  }

  return (
    <ScrollView style={Layout.fill}>
      <View style={styles.container}>
        <Text style={styles.title}>Recent Search</Text>
      </View>
      {data.map(item => (
        <RecentSearchedItemRow
          key={item}
          text={item}
          onPress={() => onSelect(item)}
          onDelete={() => onDelete(item)}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
  },
  title: {
    fontFamily: 'Urbanist-Bold',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21.6,
    color: '#000',
  },
})
