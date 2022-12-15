import { withProps } from '@/hocs/withProps'
import * as React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native'

interface ScreenProps extends React.ComponentProps<typeof SafeAreaView> {
  backgroundColor?: string | false
  statusBarStyle?: 'default' | 'light-content' | 'dark-content'
  keyboard?: boolean
}

export const Screen: React.FC<ScreenProps> = props => {
  const Wrapper =
    props.keyboard !== false && Platform.OS === 'ios'
      ? IosKeyboardAvoidingView
      : React.Fragment

  return (
    <Wrapper>
      <SafeAreaView
        {...props}
        onStartShouldSetResponder={() => {
          Keyboard.dismiss()
          return false
        }}
        style={[{ flex: 1 }, props.style]}
      />
    </Wrapper>
  )
}

export default Screen

const IosKeyboardAvoidingView = withProps(KeyboardAvoidingView, {
  behavior: 'padding',
  style: { flex: 1 },
})
