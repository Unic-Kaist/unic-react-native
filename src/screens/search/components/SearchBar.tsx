import { Spacing } from '@/components/Spacing'
import React, { useRef, useState } from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

interface Props {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}
export function SearchBar({ value, onChange, onSubmit }: Props) {
  const ref = useRef<TextInput>(null)
  const [isFocused, setFocused] = useState(false)

  return (
    <TouchableWithoutFeedback onPress={() => ref.current?.focus()}>
      <View
        style={[styles.container, isFocused ? styles.activedContainer : {}]}
      >
        <Image
          style={styles.icon}
          source={
            isFocused
              ? require('@/assets/images/ic_search_green.png')
              : require('@/assets/images/ic_search_gray.png')
          }
        />
        <Spacing width={10} />
        <TextInput
          ref={ref}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder="Artists, events, brand or tags"
          onSubmitEditing={onSubmit}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    height: 50,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  activedContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 223, 143, 1)',
    borderWidth: 1,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  input: {
    fontFamily: 'Urbanist-Medium',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19.2,
    color: '#000',
  },
})
